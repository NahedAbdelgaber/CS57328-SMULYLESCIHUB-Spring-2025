package com.smu.repository;

import com.smu.model.AnalysisResult;
import com.smu.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnalysisResultRepository extends JpaRepository<AnalysisResult, Long> {
    List<AnalysisResult> findByDocument(Document document);
    List<AnalysisResult> findByDocumentId(Long documentId);
    List<AnalysisResult> findByAnalysisType(AnalysisResult.AnalysisType analysisType);
    List<AnalysisResult> findByDocumentAndAnalysisType(Document document, AnalysisResult.AnalysisType analysisType);
}
