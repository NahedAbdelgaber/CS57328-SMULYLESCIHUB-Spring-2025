package com.smu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.smu.dto.MessageResponse;
import com.smu.model.ResearcherProfile;
import com.smu.repository.ResearcherProfileRepository;
import com.smu.security.services.UserDetailsImpl;
import com.smu.service.VisualizationService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/analysis")
public class AnalysisController {

    @Autowired
    private VisualizationService visualizationService;
    
    @Autowired
    private ResearcherProfileRepository researcherProfileRepository;

    @GetMapping("/keywords/{researcherId}")
    public ResponseEntity<?> getKeywordsForResearcher(@PathVariable Long researcherId) {
        try {
            String wordCloudData = visualizationService.generateWordCloudData(researcherId);
            return ResponseEntity.ok(wordCloudData);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving keywords: " + e.getMessage()));
        }
    }
    
    @GetMapping("/topics/{researcherId}")
    public ResponseEntity<?> getTopicsForResearcher(@PathVariable Long researcherId) {
        try {
            String topicPieChartData = visualizationService.generateTopicPieChartData(researcherId);
            return ResponseEntity.ok(topicPieChartData);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving topics: " + e.getMessage()));
        }
    }
    
    @GetMapping("/trends/{researcherId}")
    public ResponseEntity<?> getTrendsForResearcher(@PathVariable Long researcherId) {
        try {
            String trendData = visualizationService.generateTopicTrendData(researcherId);
            return ResponseEntity.ok(trendData);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving trends: " + e.getMessage()));
        }
    }
    
    @GetMapping("/keyword-frequency/{researcherId}")
    public ResponseEntity<?> getKeywordFrequencyForResearcher(
            @PathVariable Long researcherId,
            @RequestParam(defaultValue = "20") int limit) {
        try {
            String barChartData = visualizationService.generateKeywordBarChartData(researcherId, limit);
            return ResponseEntity.ok(barChartData);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving keyword frequency: " + e.getMessage()));
        }
    }
    
    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('RESEARCHER')")
    public ResponseEntity<?> getResearcherDashboard() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        ResearcherProfile researcher = researcherProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Researcher profile not found"));
        
        try {
            // Collect all visualization data for the dashboard
            String wordCloudData = visualizationService.generateWordCloudData(researcher.getId());
            String topicPieChartData = visualizationService.generateTopicPieChartData(researcher.getId());
            String trendData = visualizationService.generateTopicTrendData(researcher.getId());
            String barChartData = visualizationService.generateKeywordBarChartData(researcher.getId(), 20);
            
            // Combine all data into a single response
            return ResponseEntity.ok(
                    "{\"wordCloud\": " + wordCloudData + 
                    ", \"topicPieChart\": " + topicPieChartData + 
                    ", \"topicTrend\": " + trendData + 
                    ", \"keywordBarChart\": " + barChartData + "}"
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving dashboard data: " + e.getMessage()));
        }
    }
    
    @GetMapping("/admin/analytics")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAdminAnalytics() {
        try {
            String adminAnalyticsData = visualizationService.generateAdminAnalytics();
            return ResponseEntity.ok(adminAnalyticsData);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Error retrieving admin analytics: " + e.getMessage()));
        }
    }
}
