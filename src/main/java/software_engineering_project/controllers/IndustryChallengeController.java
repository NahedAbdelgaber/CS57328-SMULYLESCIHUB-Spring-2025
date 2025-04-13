package software_engineering_project.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.request_bodies.IC_RequestBody;
import software_engineering_project.services.IndustryChallengeService;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/industry-challenges")
public class IndustryChallengeController {

    @Autowired
    private IndustryChallengeService IC_Service;

    @GetMapping
    public List<IndustryChallenge> getIndustryChallenges() {
        return this.IC_Service.getAllIndustryChallenges();
    }

    @PostMapping("/submit")
    public IndustryChallenge addIndustryChallenge(@RequestBody IC_RequestBody challenge_data) {
        return IC_Service.validateAndCreate(challenge_data);
    }
    
    @PostMapping("/complete/{id}")
    public ResponseEntity<?> completeChallenge(@PathVariable Integer id, @RequestBody Map<String, Object> payload) {
    boolean updated = IC_Service.markChallengeCompleted(id, payload);
    if (updated) {
        return ResponseEntity.ok("Challenge marked as completed.");
    } else {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unable to mark challenge as completed.");
    }
}

    // New endpoint to populate sample challenges
    @PostMapping("/populate")
    public List<IndustryChallenge> populateSampleChallenges() {
        return IC_Service.populateSampleChallenges();
    }
}
