package com.example.universityta.controllers;

import com.example.universityta.entities.Course;
import com.example.universityta.repositories.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseRepository courseRepository;

    // POST endpoint to add a new course
    @PostMapping
    public Course addCourse(@RequestBody Course course) {
        return courseRepository.save(course);
    }

    // GET endpoint to fetch all courses (if needed)
    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
