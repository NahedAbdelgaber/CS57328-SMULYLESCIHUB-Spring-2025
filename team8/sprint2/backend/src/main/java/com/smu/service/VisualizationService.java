package com.smu.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.smu.model.Keyword;
import com.smu.model.ResearcherProfile;
import com.smu.model.Topic;
import com.smu.repository.KeywordRepository;
import com.smu.repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VisualizationService {

    @Autowired
    private KeywordRepository keywordRepository;

    @Autowired
    private TopicRepository topicRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Generate word cloud data for a researcher
     * 
     * @param researcherId The ID of the researcher
     * @return JSON string containing word cloud data
     */
    public String generateWordCloudData(Long researcherId) {
        List<Keyword> keywords = keywordRepository.findByResearcherIdOrderByFrequencyDesc(researcherId);
        
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode wordsArray = rootNode.putArray("words");
        
        // Add keywords to the word cloud data
        for (Keyword keyword : keywords) {
            ObjectNode wordNode = objectMapper.createObjectNode();
            wordNode.put("text", keyword.getKeyword());
            wordNode.put("value", keyword.getFrequency());
            wordsArray.add(wordNode);
        }
        
        try {
            return objectMapper.writeValueAsString(rootNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate word cloud data", e);
        }
    }
    
    /**
     * Generate pie chart data for topic distribution
     * 
     * @param researcherId The ID of the researcher
     * @return JSON string containing pie chart data
     */
    public String generateTopicPieChartData(Long researcherId) {
        List<Topic> topics = topicRepository.findByResearcherIdOrderByTopicWeightDesc(researcherId);
        
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode dataArray = rootNode.putArray("data");
        ArrayNode labelsArray = rootNode.putArray("labels");
        
        // Add topics to the pie chart data
        for (Topic topic : topics) {
            dataArray.add(topic.getTopicWeight());
            labelsArray.add(topic.getTopicName());
        }
        
        try {
            return objectMapper.writeValueAsString(rootNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate topic pie chart data", e);
        }
    }
    
    /**
     * Generate bar chart data for keyword frequency
     * 
     * @param researcherId The ID of the researcher
     * @param limit Maximum number of keywords to include
     * @return JSON string containing bar chart data
     */
    public String generateKeywordBarChartData(Long researcherId, int limit) {
        List<Keyword> keywords = keywordRepository.findByResearcherIdOrderByFrequencyDesc(researcherId);
        
        // Limit the number of keywords
        if (keywords.size() > limit) {
            keywords = keywords.subList(0, limit);
        }
        
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode labelsArray = rootNode.putArray("labels");
        ArrayNode dataArray = rootNode.putArray("data");
        
        // Add keywords to the bar chart data
        for (Keyword keyword : keywords) {
            labelsArray.add(keyword.getKeyword());
            dataArray.add(keyword.getFrequency());
        }
        
        try {
            return objectMapper.writeValueAsString(rootNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate keyword bar chart data", e);
        }
    }
    
    /**
     * Generate line graph data for topic trends over time
     * This is a simplified implementation that generates mock data
     * In a real implementation, this would analyze document timestamps
     * 
     * @param researcherId The ID of the researcher
     * @return JSON string containing line graph data
     */
    public String generateTopicTrendData(Long researcherId) {
        List<Topic> topics = topicRepository.findByResearcherIdOrderByTopicWeightDesc(researcherId);
        
        // Take top 5 topics
        if (topics.size() > 5) {
            topics = topics.subList(0, 5);
        }
        
        ObjectNode rootNode = objectMapper.createObjectNode();
        ArrayNode labelsArray = rootNode.putArray("labels");
        ArrayNode datasetsArray = rootNode.putArray("datasets");
        
        // Generate mock time periods (last 5 years)
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        for (int i = 4; i >= 0; i--) {
            labelsArray.add(String.valueOf(currentYear - i));
        }
        
        // Generate mock data for each topic
        Random random = new Random(researcherId); // Use researcher ID as seed for reproducibility
        for (Topic topic : topics) {
            ObjectNode datasetNode = objectMapper.createObjectNode();
            datasetNode.put("label", topic.getTopicName());
            
            ArrayNode dataArray = datasetNode.putArray("data");
            double baseValue = topic.getTopicWeight() * 100; // Scale to percentage
            
            // Generate 5 data points with some random variation
            for (int i = 0; i < 5; i++) {
                double variation = (random.nextDouble() - 0.5) * 20; // +/- 10%
                double value = Math.max(0, Math.min(100, baseValue + variation));
                dataArray.add(value);
            }
            
            datasetsArray.add(datasetNode);
        }
        
        try {
            return objectMapper.writeValueAsString(rootNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate topic trend data", e);
        }
    }
    
    /**
     * Generate aggregate analytics data for admin dashboard
     * 
     * @return JSON string containing aggregate analytics data
     */
    public String generateAdminAnalytics() {
        // This would typically aggregate data across all researchers
        // For now, we'll generate mock data
        
        ObjectNode rootNode = objectMapper.createObjectNode();
        
        // Mock department distribution
        ObjectNode departmentsNode = rootNode.putObject("departments");
        departmentsNode.put("Computer Science", 35);
        departmentsNode.put("Business", 25);
        departmentsNode.put("Engineering", 20);
        departmentsNode.put("Social Sciences", 15);
        departmentsNode.put("Others", 5);
        
        // Mock top topics across institution
        ArrayNode topTopicsArray = rootNode.putArray("topTopics");
        String[] mockTopics = {"Machine Learning", "Data Analytics", "Artificial Intelligence", 
                              "Business Strategy", "Software Engineering", "Cybersecurity", 
                              "Human-Computer Interaction", "Cloud Computing", "Blockchain", "IoT"};
        
        for (int i = 0; i < mockTopics.length; i++) {
            ObjectNode topicNode = objectMapper.createObjectNode();
            topicNode.put("topic", mockTopics[i]);
            topicNode.put("count", 100 - (i * 8)); // Decreasing counts
            topTopicsArray.add(topicNode);
        }
        
        try {
            return objectMapper.writeValueAsString(rootNode);
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate admin analytics data", e);
        }
    }
}
