package com.cshub.backend.service;

import com.cshub.backend.model.*;
import com.cshub.backend.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RAApplicationService {
    private final RAApplicationRepository appRepo;
    private final StudentRepository studentRepo;
    private final RAJobRepository jobRepo;

    public RAApplicationService(RAApplicationRepository appRepo, StudentRepository studentRepo, RAJobRepository jobRepo) {
        this.appRepo = appRepo;
        this.studentRepo = studentRepo;
        this.jobRepo = jobRepo;
    }

    public List<RAApplication> getAllRAApplications() {
        return appRepo.findAll();
    }

    public RAApplication saveRAApplication(String name, String email, Long jobId) {
        Student student = studentRepo.findByEmail(email)
                .orElseGet(() -> {
                    Student s = new Student();
                    s.setEmail(email);
                    s.setName(name);
                    return studentRepo.save(s);
                });

        RAJob job = jobRepo.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));

        RAApplication app = new RAApplication();
        app.setStudent(student);
        app.setJob(job);

        return appRepo.save(app);
    }
}