package sprint2.controllers;

import org.springframework.web.bind.annotation.*;

import sprint2.entities.IndustryChallengeProposal;
import sprint2.services.IndustryChallengeProposalService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/populate")
    public List<IndustryChallengeProposal> populateProposals() {
        return ICP_Service.populateSampleProposals();
    }

    @PostMapping("/accept/{id}")
    public ResponseEntity<?> acceptProposal(@PathVariable Integer id) {
        boolean accepted = ICP_Service.acceptProposal(id);
        if (accepted) {
            return ResponseEntity.ok("Proposal accepted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("An application has already been accepted for this challenge.");
        }
    }

    @PostMapping("/decline/{id}")
    public ResponseEntity<?> declineProposal(@PathVariable Integer id) {
        boolean accepted = ICP_Service.declineProposal(id);
        if (accepted) {
            return ResponseEntity.ok("Proposal declined successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Unable to decline the proposal");
        }
    }
}