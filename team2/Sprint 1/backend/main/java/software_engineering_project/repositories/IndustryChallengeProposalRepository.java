package software_engineering_project.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import software_engineering_project.entities.IndustryChallengeProposal;

@Repository
public interface IndustryChallengeProposalRepository extends JpaRepository<IndustryChallengeProposal, Integer> {
}
