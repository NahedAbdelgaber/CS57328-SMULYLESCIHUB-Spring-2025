package org.example.sebackend.repositories;

import org.example.sebackend.models.TechIdea;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TechIdeaRepository extends JpaRepository<TechIdea, Long> {
    // Additional custom queries can be added here if needed
}