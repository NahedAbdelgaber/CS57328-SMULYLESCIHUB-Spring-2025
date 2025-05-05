package com.smu.service;

import com.smu.model.AnalysisResult;
import com.smu.model.Document;
import com.smu.model.Keyword;
import com.smu.model.Topic;
import com.smu.repository.AnalysisResultRepository;
import com.smu.repository.KeywordRepository;
import com.smu.repository.TopicRepository;

import edu.stanford.nlp.ling.CoreAnnotations;
import edu.stanford.nlp.ling.CoreLabel;
import edu.stanford.nlp.pipeline.Annotation;
import edu.stanford.nlp.pipeline.StanfordCoreNLP;
import edu.stanford.nlp.util.CoreMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.util.*;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
public class NlpAnalysisService {

    @Autowired
    private AnalysisResultRepository analysisResultRepository;
    
    @Autowired
    private KeywordRepository keywordRepository;
    
    @Autowired
    private TopicRepository topicRepository;
    
    private final StanfordCoreNLP pipeline;
    private final ObjectMapper objectMapper;
    
    // Common academic stop words to filter out
    private final Set<String> stopWords = new HashSet<>(Arrays.asList(
        "a", "an", "the", "and", "or", "but", "if", "because", "as", "what", "when",
        "where", "how", "who", "which", "this", "that", "these", "those", "then",
        "just", "so", "than", "such", "both", "through", "about", "for", "is", "of",
        "while", "during", "to", "from", "in", "out", "on", "off", "with", "by", "at",
        "be", "been", "being", "have", "has", "had", "do", "does", "did", "but", "can",
        "could", "should", "would", "may", "might", "must", "shall", "will", "i", "you",
        "he", "she", "it", "we", "they", "their", "our", "my", "your", "his", "her", "its",
        "was", "were", "are", "am", "there", "here", "not", "no", "yes", "et", "al"
    ));
    
    // Patterns for filtering out non-relevant terms
    private final Pattern numberPattern = Pattern.compile("^\\d+$");
    private final Pattern shortPattern = Pattern.compile("^.{1,2}$");
    
    public NlpAnalysisService() {
        // Initialize Stanford CoreNLP pipeline
        Properties props = new Properties();
        props.setProperty("annotators", "tokenize, ssplit, pos, lemma, ner");
        pipeline = new StanfordCoreNLP(props);
        objectMapper = new ObjectMapper();
    }
    
    /**
     * Main method to analyze a document and generate all required analytics
     */
    public void analyzeDocument(Document document) {
        String text = document.getContentText();
        if (text == null || text.trim().isEmpty()) {
            throw new IllegalArgumentException("Document has no content to analyze");
        }
        
        // Extract keywords
        Map<String, Integer> keywordFrequencies = extractKeywords(text);
        saveKeywords(document, keywordFrequencies);
        
        // Extract topics (simplified implementation)
        Map<String, Double> topics = extractTopics(text, keywordFrequencies);
        saveTopics(document, topics);
        
        // Extract entities
        Map<String, List<String>> entities = extractEntities(text);
        saveEntities(document, entities);
        
        // No temporal analysis in this simplified version
    }
    
    /**
     * Extract keywords and their frequencies from text
     */
    private Map<String, Integer> extractKeywords(String text) {
        // Create an empty annotation with the text
        Annotation document = new Annotation(text);
        
        // Run all annotators on the text
        pipeline.annotate(document);
        
        // Track word frequencies
        Map<String, Integer> wordFrequencies = new HashMap<>();
        
        // Iterate over all sentences
        List<CoreMap> sentences = document.get(CoreAnnotations.SentencesAnnotation.class);
        for (CoreMap sentence : sentences) {
            // Iterate over all tokens in the sentence
            for (CoreLabel token : sentence.get(CoreAnnotations.TokensAnnotation.class)) {
                // Get lemma (base form) of the word
                String lemma = token.get(CoreAnnotations.LemmaAnnotation.class).toLowerCase();
                // Get part of speech
                String pos = token.get(CoreAnnotations.PartOfSpeechAnnotation.class);
                
                // Only keep nouns, adjectives, and verbs that aren't stop words
                if ((pos.startsWith("NN") || pos.startsWith("JJ") || pos.startsWith("VB")) 
                        && !stopWords.contains(lemma)
                        && !numberPattern.matcher(lemma).matches()
                        && !shortPattern.matcher(lemma).matches()) {
                    
                    wordFrequencies.put(lemma, wordFrequencies.getOrDefault(lemma, 0) + 1);
                }
            }
        }
        
        // Sort by frequency and return top 100 keywords
        return wordFrequencies.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(100)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (e1, e2) -> e1,
                        LinkedHashMap::new
                ));
    }
    
    /**
     * Extract topics from text (simplified implementation)
     * In a real implementation, this would use LDA or BERTopic
     */
    private Map<String, Double> extractTopics(String text, Map<String, Integer> keywords) {
        // This is a simplified topic modeling approach
        // In a real implementation, we would use LDA or BERTopic
        
        // For now, we'll create pseudo-topics by clustering similar keywords
        Map<String, Double> topics = new HashMap<>();
        
        // Create 5 pseudo-topics from top keywords
        List<String> topKeywords = keywords.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .limit(50)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
        
        // Simple clustering based on first letter (just for demonstration)
        Map<Character, List<String>> clusters = new HashMap<>();
        for (String keyword : topKeywords) {
            if (!keyword.isEmpty()) {
                char firstChar = keyword.charAt(0);
                clusters.putIfAbsent(firstChar, new ArrayList<>());
                clusters.get(firstChar).add(keyword);
            }
        }
        
        // Convert clusters to topics
        int topicCount = 0;
        for (Map.Entry<Character, List<String>> cluster : clusters.entrySet()) {
            if (cluster.getValue().size() >= 3) { // Only create topics with at least 3 keywords
                String topicName = "Topic " + (++topicCount);
                topics.put(topicName, (double) cluster.getValue().size() / topKeywords.size());
                
                if (topicCount >= 5) break; // Limit to 5 topics
            }
        }
        
        return topics;
    }
    
    /**
     * Extract named entities from text
     */
    private Map<String, List<String>> extractEntities(String text) {
        Annotation document = new Annotation(text);
        pipeline.annotate(document);
        
        Map<String, List<String>> entities = new HashMap<>();
        entities.put("PERSON", new ArrayList<>());
        entities.put("ORGANIZATION", new ArrayList<>());
        entities.put("LOCATION", new ArrayList<>());
        
        // Iterate over all sentences
        List<CoreMap> sentences = document.get(CoreAnnotations.SentencesAnnotation.class);
        for (CoreMap sentence : sentences) {
            // Iterate over all tokens in the sentence
            for (CoreLabel token : sentence.get(CoreAnnotations.TokensAnnotation.class)) {
                // Get named entity tag
                String ne = token.get(CoreAnnotations.NamedEntityTagAnnotation.class);
                if ("PERSON".equals(ne) || "ORGANIZATION".equals(ne) || "LOCATION".equals(ne)) {
                    String word = token.get(CoreAnnotations.TextAnnotation.class);
                    if (!entities.get(ne).contains(word)) {
                        entities.get(ne).add(word);
                    }
                }
            }
        }
        
        return entities;
    }
    
    /**
     * Save keywords to database
     */
    private void saveKeywords(Document document, Map<String, Integer> keywordFrequencies) {
        // Save keywords to database
        for (Map.Entry<String, Integer> entry : keywordFrequencies.entrySet()) {
            Keyword keyword = new Keyword();
            keyword.setResearcher(document.getResearcher());
            keyword.setKeyword(entry.getKey());
            keyword.setFrequency(entry.getValue());
            keyword.setRelevanceScore((double) entry.getValue() / Collections.max(keywordFrequencies.values()));
            keywordRepository.save(keyword);
        }
        
        // Save analysis result
        AnalysisResult analysisResult = new AnalysisResult();
        analysisResult.setDocument(document);
        analysisResult.setAnalysisType(AnalysisResult.AnalysisType.KEYWORDS);
        
        // Convert to JSON
        ObjectNode resultJson = objectMapper.createObjectNode();
        keywordFrequencies.forEach(resultJson::put);
        
        analysisResult.setResultData(resultJson.toString());
        analysisResultRepository.save(analysisResult);
    }
    
    /**
     * Save topics to database
     */
    private void saveTopics(Document document, Map<String, Double> topics) {
        // Save topics to database
        for (Map.Entry<String, Double> entry : topics.entrySet()) {
            Topic topic = new Topic();
            topic.setResearcher(document.getResearcher());
            topic.setTopicName(entry.getKey());
            topic.setTopicWeight(entry.getValue());
            
            // Create JSON array of keywords for this topic
            ArrayNode keywordsArray = objectMapper.createArrayNode();
            // In a real implementation, we would have keywords per topic
            // For now, just add some placeholder keywords
            keywordsArray.add("keyword1");
            keywordsArray.add("keyword2");
            keywordsArray.add("keyword3");
            
            topic.setKeywords(keywordsArray.toString());
            topicRepository.save(topic);
        }
        
        // Save analysis result
        AnalysisResult analysisResult = new AnalysisResult();
        analysisResult.setDocument(document);
        analysisResult.setAnalysisType(AnalysisResult.AnalysisType.TOPICS);
        
        // Convert to JSON
        ObjectNode resultJson = objectMapper.createObjectNode();
        topics.forEach(resultJson::put);
        
        analysisResult.setResultData(resultJson.toString());
        analysisResultRepository.save(analysisResult);
    }
    
    /**
     * Save entities to database
     */
    private void saveEntities(Document document, Map<String, List<String>> entities) {
        // Save analysis result
        AnalysisResult analysisResult = new AnalysisResult();
        analysisResult.setDocument(document);
        analysisResult.setAnalysisType(AnalysisResult.AnalysisType.ENTITIES);
        
        // Convert to JSON
        ObjectNode resultJson = objectMapper.createObjectNode();
        for (Map.Entry<String, List<String>> entry : entities.entrySet()) {
            ArrayNode entityArray = objectMapper.createArrayNode();
            entry.getValue().forEach(entityArray::add);
            resultJson.set(entry.getKey(), entityArray);
        }
        
        analysisResult.setResultData(resultJson.toString());
        analysisResultRepository.save(analysisResult);
    }
}
