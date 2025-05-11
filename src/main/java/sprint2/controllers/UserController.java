package sprint2.controllers;

import org.springframework.web.bind.annotation.*;

import sprint2.entities.User;
import sprint2.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService User_Service;

    @GetMapping
    public List<User> getUsers() {
        return this.User_Service.getAllUsers();
    }

    @PostMapping("/create")
    public User createUser(@RequestBody User User) {
        return this.User_Service.saveUser(User);
    }
}
