// getters and setters for the job portal 
package org.example.sebackend.models;

import jakarta.persistence.*;

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

    // Default constructor required by JPA
    public TechIdea() {
    }

    // Constructor with fields
    public TechIdea(String userName, String techDescription) {
        this.userName = userName;
        this.techDescription = techDescription;
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
}