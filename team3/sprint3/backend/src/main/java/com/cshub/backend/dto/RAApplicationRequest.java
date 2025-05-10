package com.cshub.backend.dto;

import com.cshub.backend.model.Student.Grade;

public class RAApplicationRequest {
    private String studentName;
    private String studentEmail;
    private Grade grade;
    private Double gpa;
    private String major;
    private Long jobId;

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getStudentEmail() { return studentEmail; }
    public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }

    public Grade getGrade() { return grade; }
    public void setGrade(Grade grade) { this.grade = grade; }

    public Double getGpa() { return gpa; }
    public void setGpa(Double gpa) { this.gpa = gpa; }

    public String getMajor() { return major; }
    public void setMajor(String major) { this.major = major; }

    public Long getJobId() { return jobId; }
    public void setJobId(Long jobId) { this.jobId = jobId; }
}