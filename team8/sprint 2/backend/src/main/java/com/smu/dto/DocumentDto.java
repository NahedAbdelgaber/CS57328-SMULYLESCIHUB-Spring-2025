package com.smu.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocumentDto {
    private Long id;
    private Long researcherId;
    private String title;
    private String documentType;
    private String filePath;
    private String uploadDate;
    private Long fileSize;
    private String processingStatus;
}