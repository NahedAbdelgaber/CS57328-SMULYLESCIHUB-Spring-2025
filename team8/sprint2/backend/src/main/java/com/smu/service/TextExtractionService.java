package com.smu.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.poi.xwpf.extractor.XWPFWordExtractor;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class TextExtractionService {

    /**
     * Extracts text from various document formats (PDF, DOCX, TXT)
     * 
     * @param filePath Path to the document file
     * @return Extracted text content
     * @throws IOException If file cannot be read or processed
     */
    public String extractText(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        String fileName = path.getFileName().toString().toLowerCase();
        
        if (fileName.endsWith(".pdf")) {
            return extractFromPdf(filePath);
        } else if (fileName.endsWith(".docx")) {
            return extractFromDocx(filePath);
        } else if (fileName.endsWith(".txt")) {
            return extractFromTxt(filePath);
        } else {
            throw new IllegalArgumentException("Unsupported file format: " + fileName);
        }
    }
    
    /**
     * Extracts text from PDF files using Apache PDFBox
     */
    private String extractFromPdf(String filePath) throws IOException {
        try (PDDocument document = PDDocument.load(new File(filePath))) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }
    
    /**
     * Extracts text from DOCX files using Apache POI
     */
    private String extractFromDocx(String filePath) throws IOException {
        try (FileInputStream fis = new FileInputStream(filePath);
             XWPFDocument document = new XWPFDocument(fis);
             XWPFWordExtractor extractor = new XWPFWordExtractor(document)) {
            return extractor.getText();
        }
    }
    
    /**
     * Extracts text from plain text files
     */
    private String extractFromTxt(String filePath) throws IOException {
        return Files.readString(Paths.get(filePath));
    }
}
