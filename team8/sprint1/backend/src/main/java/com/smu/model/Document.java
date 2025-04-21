package com.smu.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "documents")
public class Document {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "researcher_id", nullable = false)
    private ResearcherProfile researcher;

    @Column(nullable = false)
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DocumentType documentType;

    @Column(nullable = false)
    private String filePath;

    @Column(nullable = false)
    private LocalDateTime uploadDate;

    @Column
    private Long fileSize;

    @Column
    private String filename; // ✅ Added

    @Column(columnDefinition = "TEXT")
    private String content; // ✅ Added for NLP text

    @Column(columnDefinition = "TEXT")
    private String contentText;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProcessingStatus processingStatus;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.uploadDate = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum DocumentType {
        CV, PUBLICATION, ABSTRACT, OTHER
    }

    public enum ProcessingStatus {
        PENDING, PROCESSING, COMPLETED, FAILED
    }
}
