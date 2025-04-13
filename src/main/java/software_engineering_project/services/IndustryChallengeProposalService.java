package software_engineering_project.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.User;
import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.entities.IndustryChallengeProposal;
import software_engineering_project.repositories.UserRepository;
import software_engineering_project.repositories.IndustryChallengeRepository;
import software_engineering_project.repositories.IndustryChallengeProposalRepository;
import software_engineering_project.request_bodies.ICP_RequestBody;

import java.util.List;

@Service
public class IndustryChallengeProposalService {

    @Autowired
    private IndustryChallengeProposalRepository ICP_Repository;

    @Autowired
    private IndustryChallengeRepository IC_Repository;

    @Autowired
    private UserRepository User_Repository;

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

}