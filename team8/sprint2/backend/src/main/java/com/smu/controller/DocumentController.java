package com.smu.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.smu.dto.DocumentDto;
import com.smu.dto.MessageResponse;
import com.smu.model.Document;
import com.smu.model.ResearcherProfile;
import com.smu.repository.DocumentRepository;
import com.smu.repository.ResearcherProfileRepository;
import com.smu.security.services.UserDetailsImpl;
import com.smu.service.DocumentService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/documents")
public class DocumentController {

    @Autowired
    private DocumentRepository documentRepository;

    @Autowired
    private ResearcherProfileRepository researcherProfileRepository;
    
    @Autowired
    private DocumentService documentService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping
    @PreAuthorize("hasAuthority('RESEARCHER') or hasAuthority('ADMIN')")
    public ResponseEntity<List<DocumentDto>> getAllDocuments() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResearcherProfile researcher = researcherProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Researcher profile not found"));

        List<Document> documents = documentRepository.findByResearcher(researcher);
        List<DocumentDto> documentDtos = documents.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(documentDtos);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('RESEARCHER') or hasAuthority('ADMIN')")
    public ResponseEntity<DocumentDto> getDocumentById(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return documentRepository.findById(id)
                .map(document -> {
                // Check if the current user is the owner of the document or an admin
                    if (!document.getResearcher().getUser().getId().equals(userDetails.getId()) &&
                            authentication.getAuthorities().stream()
                                    .noneMatch(a -> a.getAuthority().equals("ADMIN"))) {
                        return ResponseEntity.status(403).<DocumentDto>build(); // ✅ FIXED HERE
                    }
                    return ResponseEntity.ok(convertToDto(document));
             })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/upload")
    @PreAuthorize("hasAuthority('RESEARCHER')")
    public ResponseEntity<?> uploadDocument(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("documentType") String documentType) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResearcherProfile researcher = researcherProfileRepository.findByUserId(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Researcher profile not found"));

        try {
            // Create upload directory if it doesn't exist
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String filename = UUID.randomUUID().toString() + fileExtension;
            Path filePath = uploadPath.resolve(filename);

            // Save file to disk
            Files.copy(file.getInputStream(), filePath);

            // Create document entity
            Document document = new Document();
            document.setResearcher(researcher);
            document.setTitle(title);
            document.setDocumentType(Document.DocumentType.valueOf(documentType));
            document.setFilePath(filePath.toString());
            document.setFileSize(file.getSize());
            document.setProcessingStatus(Document.ProcessingStatus.PENDING);

            Document savedDocument = documentRepository.save(document);
            
            // Trigger asynchronous text extraction and analysis
            documentService.processDocumentAsync(savedDocument.getId());

            return ResponseEntity.ok(convertToDto(savedDocument));
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Failed to upload document: " + e.getMessage()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Invalid document type: " + documentType));
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('RESEARCHER') or hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteDocument(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return documentRepository.findById(id)
                .map(document -> {
                    // Check if the current user is the owner of the document or an admin
                    if (!document.getResearcher().getUser().getId().equals(userDetails.getId()) &&
                            !authentication.getAuthorities().stream()
                                    .anyMatch(a -> a.getAuthority().equals("ADMIN"))) {
                        return ResponseEntity.status(403).build();
                    }

                    // Delete file from disk
                    try {
                        Path filePath = Paths.get(document.getFilePath());
                        Files.deleteIfExists(filePath);
                    } catch (IOException e) {
                        // Log error but continue with database deletion
                        System.err.println("Failed to delete file: " + e.getMessage());
                    }

                    // Delete document from database
                    documentRepository.delete(document);
                    return ResponseEntity.ok(new MessageResponse("Document deleted successfully"));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private DocumentDto convertToDto(Document document) {
        DocumentDto dto = new DocumentDto();
        dto.setId(document.getId());
        dto.setResearcherId(document.getResearcher().getId());
        dto.setTitle(document.getTitle());
        dto.setDocumentType(document.getDocumentType().name());
        dto.setFilePath(document.getFilePath());
        dto.setUploadDate(document.getUploadDate().format(DateTimeFormatter.ISO_DATE_TIME));
        dto.setFileSize(document.getFileSize());
        dto.setProcessingStatus(document.getProcessingStatus().name());
        return dto;
    }
}
