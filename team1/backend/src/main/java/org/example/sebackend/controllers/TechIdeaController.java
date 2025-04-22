// Endpoints for the job portal 
package org.example.sebackend.controllers;

import org.example.sebackend.models.TechIdea;
import org.example.sebackend.models.TechType;
import org.example.sebackend.services.TechIdeaService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/tech-ideas")
public class TechIdeaController {
    private static final Logger logger = LoggerFactory.getLogger(TechIdeaController.class);
    private final TechIdeaService techIdeaService;

    public TechIdeaController(TechIdeaService techIdeaService) {
        this.techIdeaService = techIdeaService;
    }

    @GetMapping
    public List<TechIdea> getAllTechIdeas() {
        return techIdeaService.getAllTechIdeas();
    }

    @GetMapping("/filter")
    public List<TechIdea> getFilteredTechIdeas(
            @RequestParam(required = false) TechType techType,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate,
            @RequestParam(required = false) Double minBudget,
            @RequestParam(required = false) Double maxBudget) {
        return techIdeaService.findByFilters(techType, startDate, endDate, minBudget, maxBudget);
    }

    @GetMapping("/tech-types")
    public ResponseEntity<TechType[]> getTechTypes() {
        logger.info("Fetching tech types - endpoint called");
        try {
            TechType[] types = TechType.values();
            logger.info("Retrieved {} tech types: {}", types.length, java.util.Arrays.toString(types));
            return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .body(types);
        } catch (Exception e) {
            logger.error("Error fetching tech types", e);
            throw e;
        }
    }

    @PostMapping
    public ResponseEntity<TechIdea> createTechIdea(@RequestBody TechIdea techIdea) {
        logger.info("Received tech idea submission: {}", techIdea);
        try {
            TechIdea savedIdea = techIdeaService.saveTechIdea(techIdea);
            logger.info("Successfully saved tech idea with id: {}", savedIdea.getId());
            return ResponseEntity.ok(savedIdea);
        } catch (Exception e) {
            logger.error("Error saving tech idea: {}", e.getMessage(), e);
            throw e;
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTechIdea(@PathVariable Long id) {
        techIdeaService.deleteTechIdea(id);
        return ResponseEntity.noContent().build();
    }
}