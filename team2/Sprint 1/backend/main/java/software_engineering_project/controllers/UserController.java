package software_engineering_project.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.User;
import software_engineering_project.services.UserService;

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
