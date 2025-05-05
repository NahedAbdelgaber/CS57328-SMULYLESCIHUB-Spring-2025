package com.smu.repository;

import com.smu.model.ResearcherProfile;
import com.smu.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    List<Topic> findByResearcher(ResearcherProfile researcher);
    List<Topic> findByResearcherId(Long researcherId);
    List<Topic> findByResearcherOrderByTopicWeightDesc(ResearcherProfile researcher);
    
    // Added method to resolve the error:
    List<Topic> findByResearcherIdOrderByTopicWeightDesc(Long researcherId);
}
