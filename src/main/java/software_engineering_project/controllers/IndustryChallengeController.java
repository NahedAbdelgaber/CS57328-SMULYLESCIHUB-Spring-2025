package software_engineering_project.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.request_bodies.IC_RequestBody;
import software_engineering_project.services.IndustryChallengeService;

import java.util.List;

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
}
