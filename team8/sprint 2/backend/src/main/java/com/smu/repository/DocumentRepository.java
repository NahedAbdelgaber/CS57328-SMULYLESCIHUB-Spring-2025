package com.smu.repository;

import com.smu.model.Document;
import com.smu.model.ResearcherProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByResearcher(ResearcherProfile researcher);
    List<Document> findByResearcherId(Long researcherId);
    List<Document> findByResearcherAndDocumentType(ResearcherProfile researcher, Document.DocumentType documentType);
    List<Document> findByProcessingStatus(Document.ProcessingStatus processingStatus);
}
