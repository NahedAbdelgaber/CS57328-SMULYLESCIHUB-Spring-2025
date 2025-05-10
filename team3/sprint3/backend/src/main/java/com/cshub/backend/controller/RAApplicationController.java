package com.cshub.backend.controller;

import com.cshub.backend.dto.RAApplicationRequest;
import com.cshub.backend.model.RAApplication;
import com.cshub.backend.service.RAApplicationService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class RAApplicationController {

    private final RAApplicationService service;

    public RAApplicationController(RAApplicationService service) {
        this.service = service;
    }

    @GetMapping
    public List<RAApplication> getApplications() {
        return service.getAllRAApplications();
    }

    @PostMapping
    public RAApplication saveApplication(@RequestBody RAApplicationRequest req) {
        return service.saveRAApplication(req.getStudentName(), req.getStudentEmail(), req.getJobId());
    }
}