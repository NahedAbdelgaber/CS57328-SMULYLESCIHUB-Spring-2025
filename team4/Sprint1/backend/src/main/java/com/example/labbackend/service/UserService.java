package com.example.labbackend.service;

import com.example.labbackend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private JdbcTemplate jdbc;

    public boolean validateLogin(String username, String password) {
        String sql = "SELECT COUNT(*) FROM users WHERE username = ? AND password = ?";
        Integer count = jdbc.queryForObject(sql, Integer.class, username, password);
        return count != null && count > 0;
    }
    
    public void registerUser(User user) {
        String sql = "INSERT INTO users (username, password, name, address, degree) VALUES (?, ?, ?, ?, ?)";
        jdbc.update(sql, user.getUsername(), user.getPassword(), user.getName(), user.getAddress(), user.getDegree());
    }

    public User getUserByUsername(String username) {
        String sql = "SELECT * FROM users WHERE username = ?";
        List<User> users = jdbc.query(sql, new BeanPropertyRowMapper<>(User.class), username);
        return users.isEmpty() ? null : users.get(0);
    }

    public void updateUser(User updated) {
        String sql = "UPDATE users SET name = ?, address = ?, degree = ? WHERE username = ?";
        jdbc.update(sql, updated.getName(), updated.getAddress(), updated.getDegree(), updated.getUsername());
    }
}
