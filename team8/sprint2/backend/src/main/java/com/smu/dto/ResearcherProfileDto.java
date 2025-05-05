package com.smu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResearcherProfileDto {
    private Long id;
    private Long userId;
    private String fullName;
    private String department;
    private String position;
    private String bio;
    private String linkedinUrl;
    private String googleScholarUrl;
}
