// Endpoints for the job portal 
package org.example.sebackend.controllers;

import org.example.sebackend.models.TechIdea;
import org.example.sebackend.services.TechIdeaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tech-ideas")
@CrossOrigin(origins = "http://localhost:3000")
public class TechIdeaController {
    private final TechIdeaService techIdeaService;

    public TechIdeaController(TechIdeaService techIdeaService) {
        this.techIdeaService = techIdeaService;
    }

    @GetMapping
    public List<TechIdea> getAllTechIdeas() {
        return techIdeaService.getAllTechIdeas();
    }

    @PostMapping
    public TechIdea createTechIdea(@RequestBody TechIdea techIdea) {
        return techIdeaService.saveTechIdea(techIdea);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechIdea(@PathVariable Long id) {
        techIdeaService.deleteTechIdea(id);
        return ResponseEntity.noContent().build();
    }
}