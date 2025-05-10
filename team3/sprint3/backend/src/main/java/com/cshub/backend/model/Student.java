package com.cshub.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "students")
public class Student {

    public enum Grade {
        Freshman,
        Sophomore,
        Junior,
        Senior
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Student name must not be blank.")
    private String name;

    @Enumerated(EnumType.STRING)
    private Grade grade;

    @DecimalMin("0.0")
    @DecimalMax("4.0")
    private Double gpa;

    private String major;

    @NotBlank(message = "Email must not be blank.")
    @Email
    private String email;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    public Double getGPA() {
        return gpa;
    }

    public void setGPA(Double gpa) {
        this.gpa = gpa;
    }

    public String getMajor() {
        return major;
    }

    public void setMajor(String major) {
        this.major = major;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}