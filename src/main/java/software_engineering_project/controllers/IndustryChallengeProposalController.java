package software_engineering_project.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.IndustryChallengeProposal;
import software_engineering_project.services.IndustryChallengeProposalService;

import java.util.List;

@RestController
@RequestMapping("/api/industry-challenge-proposals")
public class IndustryChallengeProposalController {

    @Autowired
    private IndustryChallengeProposalService ICP_Service;

    @GetMapping
    public List<IndustryChallengeProposal> getIndustryChallenges() {
        return this.ICP_Service.getAllIndustryChallengeProposals();
    }

    @PostMapping("/submit")
    public IndustryChallengeProposal addIndustryChallenge(@RequestBody IndustryChallengeProposal proposal) {
        return this.ICP_Service.saveIndustryChallengeProposal(proposal);
    }
}