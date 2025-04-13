package software_engineering_project.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.repositories.IndustryChallengeRepository;
import software_engineering_project.request_bodies.IC_RequestBody;

import java.util.List;

@Service
public class IndustryChallengeService {

    @Autowired
    private IndustryChallengeRepository IC_Repository;

    public IndustryChallenge saveIndustryChallenge(IndustryChallenge challenge) {return this.IC_Repository.save(challenge);}

    public List<IndustryChallenge> getAllIndustryChallenges() {return this.IC_Repository.findAll();}

    public IndustryChallenge validateAndCreate(IC_RequestBody challenge_data) {
        IndustryChallenge challenge = new IndustryChallenge();

        challenge.setTitle(challenge_data.title);
        challenge.setDescription(challenge_data.description);
        challenge.setBudget(challenge_data.budget);
        challenge.setStartDate(challenge_data.start_date);
        challenge.setEndDate(challenge_data.end_date);
        challenge.setRequiredExpertise(challenge_data.required_expertise);

        challenge = IC_Repository.save(challenge);
        return challenge;
    }

}