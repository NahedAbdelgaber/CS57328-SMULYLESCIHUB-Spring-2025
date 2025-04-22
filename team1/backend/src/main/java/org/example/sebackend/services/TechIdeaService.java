package org.example.sebackend.services;

import org.example.sebackend.models.TechIdea;
import org.example.sebackend.repositories.TechIdeaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechIdeaService {
    private final TechIdeaRepository techIdeaRepository;

    public TechIdeaService(TechIdeaRepository techIdeaRepository) {
        this.techIdeaRepository = techIdeaRepository;
    }

    public List<TechIdea> getAllTechIdeas() {
        return techIdeaRepository.findAll();
    }

    public TechIdea saveTechIdea(TechIdea techIdea) {
        return techIdeaRepository.save(techIdea);
    }

    public void deleteTechIdea(Long id) {
        techIdeaRepository.deleteById(id);
    }
}