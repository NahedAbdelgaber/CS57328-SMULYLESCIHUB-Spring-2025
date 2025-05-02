package software_engineering_project.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software_engineering_project.entities.IndustryChallenge;
import software_engineering_project.repositories.IndustryChallengeRepository;
import software_engineering_project.request_bodies.IC_RequestBody;

import java.sql.Date;  // Ensure the correct Date class is imported
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class IndustryChallengeService {

    // Declare and autowire the repository instance
    @Autowired
    private IndustryChallengeRepository challengeRepository;

    // Retrieve all challenges from the database
    public List<IndustryChallenge> getAllIndustryChallenges() {
        return challengeRepository.findAll();
    }

    // Create a challenge from the request body data
    public IndustryChallenge validateAndCreate(IC_RequestBody challenge_data) {
        IndustryChallenge challenge = new IndustryChallenge();
        // Make sure that IC_RequestBody defines these getter methods
        challenge.setTitle(challenge_data.getTitle());
        challenge.setDescription(challenge_data.getDescription());
        challenge.setBudget(challenge_data.getBudget());
        challenge.setStartDate(challenge_data.getStartDate());
        challenge.setEndDate(challenge_data.getEndDate());
        challenge.setRequiredExpertise(challenge_data.getRequiredExpertise());
        challenge.setOpenStatus(true);  // Defaulting new challenges to open
        return challengeRepository.save(challenge);
    }

    // Endpoint to populate sample challenges
    public List<IndustryChallenge> populateSampleChallenges() {
        // Clear existing challenges for a clean slate (optional)
        List<IndustryChallenge> sampleChallenges = new ArrayList<>();

        // Sample Challenge 1
        IndustryChallenge challenge1 = new IndustryChallenge();
        challenge1.setTitle("Develop a Mobile App");
        challenge1.setDescription("Create a cross-platform mobile app that enhances customer engagement.");
        challenge1.setBudget(50000);
        challenge1.setStartDate(Date.valueOf("2025-05-01"));
        challenge1.setEndDate(Date.valueOf("2025-08-01"));
        challenge1.setRequiredExpertise("Mobile Development");
        challenge1.setOpenStatus(true);
        sampleChallenges.add(challenge1);

        // Sample Challenge 2
        IndustryChallenge challenge2 = new IndustryChallenge();
        challenge2.setTitle("Improve Web Platform");
        challenge2.setDescription("Enhance security and performance of existing web platform.");
        challenge2.setBudget(75000);
        challenge2.setStartDate(Date.valueOf("2025-06-15"));
        challenge2.setEndDate(Date.valueOf("2025-09-15"));
        challenge2.setRequiredExpertise("Full Stack Development");
        challenge2.setOpenStatus(true);
        sampleChallenges.add(challenge2);

        // Save all sample challenges at once
        challengeRepository.saveAll(sampleChallenges);

        return sampleChallenges;
    }
    public boolean markChallengeCompleted(Integer id, Map<String, Object> payload) {
        Optional<IndustryChallenge> optionalChallenge = challengeRepository.findById(id);
        if (optionalChallenge.isPresent()) {
            IndustryChallenge challenge = optionalChallenge.get();
    
            // Extract values from payload
            String feedback = (String) payload.get("feedback");
            Object ratingObj = payload.get("rating");
    
            // Basic validation: ensure feedback is not null and rating is valid
            if (feedback == null || feedback.trim().isEmpty()) {
                return false;  // Or throw an exception indicating missing feedback
            }
            Integer rating = null;
            try {
                rating = Integer.valueOf(ratingObj.toString());
            } catch (Exception e) {
                return false;  // Or handle the conversion error with a custom message
            }
            // Optionally check if rating is within the required range (e.g., 1 to 5)
            if (rating < 1 || rating > 5) {
                return false;
            }
    
            // Mark as completed and save feedback & rating
            challenge.setOpenStatus(false);
            challenge.setFeedback(feedback);
            challenge.setRating(rating);
            challengeRepository.save(challenge);
            return true;
        }
        return false;
    }
    
    
}
