package com.smu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.smu.dto.ResearcherProfileDto;
import com.smu.model.ResearcherProfile;
import com.smu.model.User;
import com.smu.repository.ResearcherProfileRepository;
import com.smu.repository.UserRepository;
import com.smu.security.services.UserDetailsImpl;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/researchers")
public class ResearcherController {
    
    @Autowired
    private ResearcherProfileRepository researcherProfileRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<List<ResearcherProfileDto>> getAllResearchers() {
        List<ResearcherProfile> researchers = researcherProfileRepository.findAll();
        
        List<ResearcherProfileDto> researcherDtos = researchers.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(researcherDtos);
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('RESEARCHER') or hasAuthority('ADMIN')")
    public ResponseEntity<ResearcherProfileDto> getResearcherById(@PathVariable Long id) {
        return researcherProfileRepository.findById(id)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/public")
    public ResponseEntity<ResearcherProfileDto> getPublicResearcherProfile(@PathVariable Long id) {
        return researcherProfileRepository.findById(id)
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/me")
    @PreAuthorize("hasAuthority('RESEARCHER')")
    public ResponseEntity<ResearcherProfileDto> getCurrentResearcherProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        return researcherProfileRepository.findByUserId(userDetails.getId())
                .map(this::convertToDto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('RESEARCHER') or hasAuthority('ADMIN')")
    public ResponseEntity<ResearcherProfileDto> updateResearcherProfile(
            @PathVariable Long id, 
            @RequestBody ResearcherProfileDto profileDto) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        return researcherProfileRepository.findById(id)
                .map(profile -> {
                    // Check if the current user is the owner of the profile or an admin
                    if (!profile.getUser().getId().equals(userDetails.getId()) && 
                            authentication.getAuthorities().stream()
                                .noneMatch(a -> a.getAuthority().equals("ADMIN"))) {
                        return ResponseEntity.status(403).<ResearcherProfileDto>build();
                    }
                    
                    profile.setFullName(profileDto.getFullName());
                    profile.setDepartment(profileDto.getDepartment());
                    profile.setPosition(profileDto.getPosition());
                    profile.setBio(profileDto.getBio());
                    profile.setLinkedinUrl(profileDto.getLinkedinUrl());
                    profile.setGoogleScholarUrl(profileDto.getGoogleScholarUrl());
                    
                    ResearcherProfile updatedProfile = researcherProfileRepository.save(profile);
                    return ResponseEntity.ok(convertToDto(updatedProfile));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @PreAuthorize("hasAuthority('RESEARCHER')")
    public ResponseEntity<ResearcherProfileDto> createResearcherProfile(
            @RequestBody ResearcherProfileDto profileDto) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        // Check if profile already exists
        if (researcherProfileRepository.findByUserId(userDetails.getId()).isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        ResearcherProfile profile = new ResearcherProfile();
        profile.setUser(user);
        profile.setFullName(profileDto.getFullName());
        profile.setDepartment(profileDto.getDepartment());
        profile.setPosition(profileDto.getPosition());
        profile.setBio(profileDto.getBio());
        profile.setLinkedinUrl(profileDto.getLinkedinUrl());
        profile.setGoogleScholarUrl(profileDto.getGoogleScholarUrl());
        
        ResearcherProfile savedProfile = researcherProfileRepository.save(profile);
        return ResponseEntity.ok(convertToDto(savedProfile));
    }
    
    private ResearcherProfileDto convertToDto(ResearcherProfile profile) {
        ResearcherProfileDto dto = new ResearcherProfileDto();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setFullName(profile.getFullName());
        dto.setDepartment(profile.getDepartment());
        dto.setPosition(profile.getPosition());
        dto.setBio(profile.getBio());
        dto.setLinkedinUrl(profile.getLinkedinUrl());
        dto.setGoogleScholarUrl(profile.getGoogleScholarUrl());
        return dto;
    }
}
