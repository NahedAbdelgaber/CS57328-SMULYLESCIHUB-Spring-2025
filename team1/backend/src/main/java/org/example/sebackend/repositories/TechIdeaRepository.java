package org.example.sebackend.repositories;

import org.example.sebackend.models.TechIdea;
import org.example.sebackend.models.TechType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TechIdeaRepository extends JpaRepository<TechIdea, Long> {
    
    @Query("SELECT t FROM TechIdea t WHERE " +
           "(:techType IS NULL OR t.techType = :techType) AND " +
           "(:startDate IS NULL OR t.datePosted >= :startDate) AND " +
           "(:endDate IS NULL OR t.datePosted <= :endDate) AND " +
           "(:minBudget IS NULL OR t.minBudget >= :minBudget) AND " +
           "(:maxBudget IS NULL OR t.maxBudget <= :maxBudget)")
    List<TechIdea> findByFilters(
        @Param("techType") TechType techType,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        @Param("minBudget") Double minBudget,
        @Param("maxBudget") Double maxBudget
    );
}