package sprint2.repositories;

import org.springframework.stereotype.Repository;

import sprint2.entities.IndustryChallenge;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface IndustryChallengeRepository extends JpaRepository<IndustryChallenge, Integer> {
}
