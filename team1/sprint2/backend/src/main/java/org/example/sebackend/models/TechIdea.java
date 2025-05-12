// getters and setters for the job portal 
package org.example.sebackend.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tech_ideas")
public class TechIdea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String techDescription;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private TechType techType;

    @Column(name = "date_posted", nullable = false)
    private LocalDateTime datePosted;

    @Column(nullable = false)
    private Double minBudget;

    @Column(nullable = false)
    private Double maxBudget;

    // Default constructor required by JPA
    public TechIdea() {
        this.datePosted = LocalDateTime.now();
    }

    // Constructor with fields
    public TechIdea(String userName, String techDescription, TechType techType, Double minBudget, Double maxBudget) {
        this.userName = userName;
        this.techDescription = techDescription;
        this.techType = techType;
        this.datePosted = LocalDateTime.now();
        this.minBudget = minBudget;
        this.maxBudget = maxBudget;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getTechDescription() {
        return techDescription;
    }

    public void setTechDescription(String techDescription) {
        this.techDescription = techDescription;
    }

    public TechType getTechType() {
        return techType;
    }

    public void setTechType(TechType techType) {
        this.techType = techType;
    }

    public LocalDateTime getDatePosted() {
        return datePosted;
    }

    public void setDatePosted(LocalDateTime datePosted) {
        this.datePosted = datePosted;
    }

    public Double getMinBudget() {
        return minBudget;
    }

    public void setMinBudget(Double minBudget) {
        this.minBudget = minBudget;
    }

    public Double getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(Double maxBudget) {
        this.maxBudget = maxBudget;
    }
}