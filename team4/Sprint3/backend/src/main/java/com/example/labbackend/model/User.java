package com.example.labbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;
    
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private boolean active = true;

    @Column(name="email_opt_in", nullable = false)
    private boolean emailOptIn = true;

    private String name;
    private String address;
    private String degree;

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getUsername() { 
        return username; 
    }
    public void setUsername(String username) { 
        this.username = username; 
    }
    
    public String getPassword() { 
        return password; 
    }
    public void setPassword(String password) { 
        this.password = password; 
    }
    
    public String getName() { 
        return name; 
    }
    public void setName(String name) { 
        this.name = name; 
    }
    
    public String getAddress() { 
        return address; 
    }
    public void setAddress(String address) { 
        this.address = address; 
    }
    
    public String getDegree() { 
        return degree; 
    }
    public void setDegree(String degree) { 
        this.degree = degree; 
    }

    public boolean isActive() { 
        return active; 
    }
    public void setActive(boolean active) { 
        this.active = active; 
    } 

    public boolean getEmailOptIn() { 
        return emailOptIn; 
    }
    public void setEmailOptIn(boolean emailOptIn) { 
        this.emailOptIn = emailOptIn;
    }
}
