package org.example.sebackend.repositories;

import org.example.sebackend.models.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {
    // Additional custom queries can be added here if needed
}