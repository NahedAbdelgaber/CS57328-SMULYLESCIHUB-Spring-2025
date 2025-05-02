// getters and setters for the job portal 
package org.example.sebackend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "jobs")
public class Job {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String jobDescription;

    // Default constructor required by JPA
    public Job() {
    }

    // Constructor with fields
    public Job(String companyName, String jobDescription) {
        this.companyName = companyName;
        this.jobDescription = jobDescription;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }
}