package com.smu.repository;

import com.smu.model.Keyword;
import com.smu.model.ResearcherProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {

    List<Keyword> findByResearcher(ResearcherProfile researcher);

    List<Keyword> findByResearcherId(Long researcherId);

    List<Keyword> findByResearcherOrderByFrequencyDesc(ResearcherProfile researcher);

    List<Keyword> findByResearcherOrderByRelevanceScoreDesc(ResearcherProfile researcher);

    List<Keyword> findByResearcherIdOrderByFrequencyDesc(Long researcherId);
}
