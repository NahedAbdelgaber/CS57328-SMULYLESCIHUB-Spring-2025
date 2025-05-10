package com.cshub.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cshub.backend.model.RAJob;
import com.cshub.backend.service.RAJobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
public class RAJobController {

    private final RAJobService service;

    public RAJobController(RAJobService service) {
        this.service = service;
    }

    @GetMapping("/{id}")
    public RAJob getJobById(@PathVariable Long id) {
        return service.getRAJobById(id);
    }

    @GetMapping
    public List<RAJob> getJobs() {
        return service.getAllJobs();
    }

    @PostMapping
    public RAJob saveJob(@RequestBody @Valid RAJob job) {
        return service.saveRAJob(job);
    }

    @PutMapping("/{id}")
    public RAJob updateJob(@PathVariable Long id, @RequestBody @Valid RAJob job) {
        return service.updateRAJob(id, job);
    }

    @DeleteMapping("/{id}")
    public void deleteJobById(@PathVariable Long id) {
        service.deleteRAJobById(id);
    }
}
