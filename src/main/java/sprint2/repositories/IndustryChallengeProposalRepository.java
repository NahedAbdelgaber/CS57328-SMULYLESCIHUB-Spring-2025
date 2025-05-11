package sprint2.repositories;

import org.springframework.stereotype.Repository;

import sprint2.entities.IndustryChallengeProposal;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface IndustryChallengeProposalRepository extends JpaRepository<IndustryChallengeProposal, Integer> {
}
