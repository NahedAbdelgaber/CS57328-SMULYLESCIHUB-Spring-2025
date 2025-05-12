package com.example.labbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.labbackend.dto.LoginRequest;
import com.example.labbackend.dto.UserProfile;
import com.example.labbackend.model.User;
import com.example.labbackend.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String identifier = (req.getUsername() != null && !req.getUsername().isEmpty()) ? req.getUsername() : req.getEmail();
        boolean valid = userService.validateLogin(identifier, req.getPassword());
        return valid ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        boolean created = userService.registerUser(user);
        if (!created) {
            return ResponseEntity.badRequest().body("Username or email already exists");
        }
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
    
    @GetMapping("/profile/{identifier}")
    public ResponseEntity<?> getProfile(@PathVariable String identifier) {
        User user = userService.getUser(identifier);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        UserProfile dto = new UserProfile();
        dto.setName(user.getName());
        dto.setAddress(user.getAddress());
        dto.setDegree(user.getDegree());
        return ResponseEntity.ok(dto);
    }
    
    @PutMapping("/profile/{identifier}")
    public ResponseEntity<?> updateProfile(@PathVariable String identifier,@RequestBody UserProfile profileDto) {
        User updated = new User();
        if (identifier.contains("@")) {
            updated.setEmail(identifier);
        }
        else {
            updated.setUsername(identifier);
        }
        updated.setName(profileDto.getName());
        updated.setAddress(profileDto.getAddress());
        updated.setDegree(profileDto.getDegree());

        boolean ok = userService.updateUser(updated);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }

    @PutMapping("/reset/password/{newPassword}")
    public ResponseEntity<?> resetPassword(@PathVariable("newPassword") String newPassword, @RequestBody LoginRequest req) {
        String identifier = (req.getUsername() != null && !req.getUsername().isEmpty()) ? req.getUsername() : req.getEmail();
        if (!userService.validateUsername(identifier) && !userService.validateEmail(identifier)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User u = new User();
        if (identifier.contains("@")) u.setEmail(identifier);
        else {u.setUsername(identifier);}
        u.setPassword(newPassword);

        boolean ok = userService.updatePassword(u);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset password");
    }

    @PutMapping("/reset/username/{newUsername}")
    public ResponseEntity<?> resetUsername(@PathVariable("newUsername") String newUsername, @RequestBody LoginRequest req) {
        String email = req.getEmail();
        if (!userService.validateEmail(email)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        User u = new User();
        u.setEmail(email);
        u.setUsername(newUsername);

        boolean ok = userService.updateUsername(u);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to reset username");
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAccount(@RequestBody LoginRequest req) {
        String identifier = (req.getUsername() != null && !req.getUsername().isEmpty()) ? req.getUsername() : req.getEmail();

        boolean exists = userService.validateUsername(identifier) || userService.validateEmail(identifier);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        boolean deleted = userService.deleteUser(identifier);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
        return ResponseEntity.ok().build();
    }
}
