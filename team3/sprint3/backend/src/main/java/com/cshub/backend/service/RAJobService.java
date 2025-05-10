package com.cshub.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cshub.backend.model.RAJob;
import com.cshub.backend.repository.RAJobRepository;

@Service
public class RAJobService {

    private final RAJobRepository repository;

    public RAJobService(RAJobRepository repository) {
        this.repository = repository;
    }

    public List<RAJob> getAllJobs() {
        return repository.findAll();
    }

    public RAJob getRAJobById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public RAJob saveRAJob(RAJob job) {
        return repository.save(job);
    }

    public RAJob updateRAJob(Long id, RAJob updatedJob) {
        RAJob existingJob = repository.findById(id).orElseThrow(
            () -> new RuntimeException("Job not found with id: " + id)
        );

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setStatus(updatedJob.getStatus());
        existingJob.setUpdateTime(updatedJob.getUpdateTime());
        existingJob.setDepartment(updatedJob.getDepartment());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setStartDate(updatedJob.getStartDate());
        existingJob.setEndDate(updatedJob.getEndDate());
        existingJob.setTimeCommitment(updatedJob.getTimeCommitment());
        existingJob.setPaid(updatedJob.isPaid());
        existingJob.setStipendAmount(updatedJob.getStipendAmount());
        existingJob.setPreferredMajors(updatedJob.getPreferredMajors());
        existingJob.setSkillsRequired(updatedJob.getSkillsRequired());

        return saveRAJob(existingJob);
    }

    public void deleteRAJobById(Long id) {
        repository.deleteById(id);
    }
}
