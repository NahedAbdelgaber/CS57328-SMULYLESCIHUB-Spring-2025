package software_engineering_project.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;


import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.User;
import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.entities.IndustryChallengeProposal;
import software_engineering_project.repositories.UserRepository;
import software_engineering_project.repositories.IndustryChallengeRepository;
import software_engineering_project.repositories.IndustryChallengeProposalRepository;
import software_engineering_project.request_bodies.ICP_RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class IndustryChallengeProposalService {

    @Autowired
    private IndustryChallengeProposalRepository ICP_Repository;

    @Autowired
    private IndustryChallengeRepository IC_Repository;

    @Autowired
    private UserRepository User_Repository;

    @PersistenceContext
    private EntityManager entityManager;


    public IndustryChallengeProposal saveIndustryChallengeProposal(IndustryChallengeProposal proposal) {
        return this.ICP_Repository.save(proposal);
    }

    public List<IndustryChallengeProposal> getAllIndustryChallengeProposals() {
        return this.ICP_Repository.findAll();
    }

    public IndustryChallengeProposal validateAndCreate(ICP_RequestBody proposal_data) {
        IndustryChallengeProposal proposal = new IndustryChallengeProposal();

        User applicant = User_Repository.findById(proposal_data.applicant_id).orElse(null);
        if (applicant == null) {
            System.out.println("Unable to find User with ID: `" + proposal_data.applicant_id + "` for proposal submission");
            return null;
        }
        else proposal.setApplicant(applicant);

        IndustryChallenge challenge = IC_Repository.findById(proposal_data.challenge_id).orElse(null);
        if (challenge == null) {
            System.out.println("Unable to find IndustryChallenge with ID: `" + proposal_data.challenge_id + "` for proposal submission");
            return null;
        }
        else proposal.setChallenge(challenge);

        proposal.setDescription(proposal_data.description);
        proposal.setPrice(proposal_data.price);
        proposal.setStartDate(proposal_data.start_date);
        proposal.setEndDate(proposal_data.end_date);

        proposal = ICP_Repository.save(proposal);
        return proposal;
    }

    @Transactional
    public List<IndustryChallengeProposal> populateSampleProposals() {
        // Disable foreign key checks
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS=0").executeUpdate();
    
        // Clear existing proposals and challenges
        ICP_Repository.deleteAll();
        IC_Repository.deleteAll();
        
        // Re-enable foreign key checks
        entityManager.createNativeQuery("SET FOREIGN_KEY_CHECKS=1").executeUpdate();



        List<IndustryChallenge> sampleChallenges = new ArrayList<>();


    
        // Create two new distinct challenges solely for sample proposals,
        // but mark them as not active so they don't appear under active challenges.
        IndustryChallenge proposalChallenge1 = new IndustryChallenge();
        proposalChallenge1.setTitle("Proposal Challenge One");
        proposalChallenge1.setDescription("This challenge is created solely for sample proposal data - challenge one.");
        proposalChallenge1.setBudget(40000);
        proposalChallenge1.setStartDate(java.sql.Date.valueOf("2025-04-15"));
        proposalChallenge1.setEndDate(java.sql.Date.valueOf("2025-06-15"));
        proposalChallenge1.setRequiredExpertise("Mobile Development");
        proposalChallenge1.setOpenStatus(false);  // Marked as not active
        proposalChallenge1 = IC_Repository.save(proposalChallenge1);
    
        IndustryChallenge proposalChallenge2 = new IndustryChallenge();
        proposalChallenge2.setTitle("Proposal Challenge Two");
        proposalChallenge2.setDescription("This challenge is created solely for sample proposal data - challenge two.");
        proposalChallenge2.setBudget(65000);
        proposalChallenge2.setStartDate(java.sql.Date.valueOf("2025-05-01"));
        proposalChallenge2.setEndDate(java.sql.Date.valueOf("2025-07-01"));
        proposalChallenge2.setRequiredExpertise("Full Stack Development");
        proposalChallenge2.setOpenStatus(false);  // Marked as not active
        proposalChallenge2 = IC_Repository.save(proposalChallenge2);
    
        // Create separate sample applicants for each proposal.
        User sampleUser1 = new User();
        sampleUser1.setName("Sample Applicant 1");
        sampleUser1.setExpertise("Java Development");
        sampleUser1 = User_Repository.save(sampleUser1);
    
        User sampleUser2 = new User();
        sampleUser2.setName("Sample Applicant 2");
        sampleUser2.setExpertise("Spring Boot Expert");
        sampleUser2 = User_Repository.save(sampleUser2);
    
        // Create sample proposals for the newly created (proposal-only) challenges
        List<IndustryChallengeProposal> sampleProposals = new ArrayList<>();
    
        IndustryChallengeProposal proposal1 = new IndustryChallengeProposal();
        proposal1.setApplicant(sampleUser1);
        proposal1.setChallenge(proposalChallenge1);
        proposal1.setDescription("I propose to build a robust mobile app using React Native with enhanced UI/UX.");
        proposal1.setPrice(48000);
        proposal1.setStartDate(java.sql.Date.valueOf("2025-05-05"));
        proposal1.setEndDate(java.sql.Date.valueOf("2025-07-30"));
        sampleProposals.add(proposal1);
    
        IndustryChallengeProposal proposal2 = new IndustryChallengeProposal();
        proposal2.setApplicant(sampleUser2);
        proposal2.setChallenge(proposalChallenge2);
        proposal2.setDescription("I propose to improve the platform's performance by optimizing backend APIs.");
        proposal2.setPrice(72000);
        proposal2.setStartDate(java.sql.Date.valueOf("2025-06-20"));
        proposal2.setEndDate(java.sql.Date.valueOf("2025-09-10"));
        sampleProposals.add(proposal2);
    
        // Save all sample proposals at once.
        ICP_Repository.saveAll(sampleProposals);
    
        return sampleProposals;
    }
    
    
    
    public boolean acceptProposal(Integer id) {
        Optional<IndustryChallengeProposal> optionalProposal = ICP_Repository.findById(id);
        if (optionalProposal.isPresent()) {
            IndustryChallengeProposal proposal = optionalProposal.get();
            // Get the challenge associated with this proposal
            IndustryChallenge challenge = proposal.getChallenge();
            if (challenge != null) {
                // Set the openStatus to true
                challenge.setOpenStatus(true);
                // Save the updated challenge (make sure that IC_Repository is available/injected)
                IC_Repository.save(challenge);
                return true;
            }
        }
        return false;
    }
    


}