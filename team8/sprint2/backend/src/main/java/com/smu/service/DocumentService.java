package com.smu.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.smu.model.Document;
import com.smu.repository.DocumentRepository;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;
    
    @Autowired
    private TextExtractionService textExtractionService;
    
    @Autowired
    private NlpAnalysisService nlpAnalysisService;

    @Async
    public void processDocumentAsync(Long documentId) {
        Document document = documentRepository.findById(documentId)
                .orElseThrow(() -> new RuntimeException("Document not found with id: " + documentId));
        
        try {
            // Update status to processing
            document.setProcessingStatus(Document.ProcessingStatus.PROCESSING);
            documentRepository.save(document);
            
            // Extract text from document
            String extractedText = textExtractionService.extractText(document.getFilePath());
            document.setContentText(extractedText);
            documentRepository.save(document);
            
            // Perform NLP analysis
            nlpAnalysisService.analyzeDocument(document);
            
            // Update status to completed
            document.setProcessingStatus(Document.ProcessingStatus.COMPLETED);
            documentRepository.save(document);
        } catch (Exception e) {
            // Update status to failed
            document.setProcessingStatus(Document.ProcessingStatus.FAILED);
            documentRepository.save(document);
            throw new RuntimeException("Failed to process document: " + e.getMessage(), e);
        }
    }
}
