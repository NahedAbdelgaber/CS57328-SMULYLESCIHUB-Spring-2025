package software_engineering_project.services;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import software_engineering_project.entities.User;
import software_engineering_project.repositories.UserRepository;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private  UserRepository User_Repository;

    public List<User> getAllUsers() {return User_Repository.findAll();}

    public User saveUser(User User) {return User_Repository.save(User);}
}