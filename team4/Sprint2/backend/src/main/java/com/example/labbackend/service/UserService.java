package com.example.labbackend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.example.labbackend.model.User;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbc;

    public boolean validateLogin(String identifier, String password) {
        String sql = "SELECT COUNT(*) FROM users WHERE (username = ? OR email = ?) AND password = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, identifier, identifier, password);
        return count != null && count > 0;
    }
    
    public boolean registerUser(User user) {
        String sql = "INSERT INTO users (email, username, password, name, address, degree) VALUES (?, ?, ?, ?, ?, ?)";
        jdbc.update(sql, user.getEmail(), user.getUsername(), user.getPassword(), user.getName(), user.getAddress(), user.getDegree());
        return true;
    }

    public User getUser(String identifier) {
        String sql = "SELECT * FROM users WHERE (username = ? OR email = ?)";
        List<User> users = jdbc.query(sql, new BeanPropertyRowMapper<>(User.class), identifier, identifier);
        return users.isEmpty() ? null : users.get(0);
    }

    public boolean updateUser(User updated) {
        String sql = "UPDATE users SET name = ?, address = ?, degree = ? WHERE username = ? OR email = ?";
        jdbc.update(sql, updated.getName(), updated.getAddress(), updated.getDegree(), updated.getUsername(), updated.getEmail());
        return true;
    }

    public boolean validateUsername(String username) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, username);
        return count != null && count > 0;
    }

    public boolean validateEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE email = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    public boolean updatePassword(User updated) {
        String sql = "UPDATE users SET password = ? WHERE username = ? OR email = ?";
        int rows = jdbc.update(sql, updated.getPassword(), updated.getUsername(), updated.getEmail());
        return rows > 0;
    }

    public boolean updateUsername(User updated) {
        String sql = "UPDATE users SET username = ? WHERE email = ?";
        int rows = jdbc.update(sql, updated.getUsername(), updated.getEmail());
        return rows > 0;
    }

    public boolean deleteUser(String identifier) {
        String sql = "DELETE FROM users WHERE username = ? OR email = ?";
        int rows = jdbc.update(sql, identifier, identifier);
        return rows > 0;
    }
}
