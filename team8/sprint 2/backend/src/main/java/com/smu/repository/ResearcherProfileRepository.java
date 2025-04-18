package com.smu.repository;

import com.smu.model.ResearcherProfile;
import com.smu.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResearcherProfileRepository extends JpaRepository<ResearcherProfile, Long> {
    Optional<ResearcherProfile> findByUser(User user);
    Optional<ResearcherProfile> findByUserId(Long userId);
}
