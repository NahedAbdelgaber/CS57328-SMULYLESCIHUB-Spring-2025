package sprint2.services;

import org.springframework.stereotype.Service;

import sprint2.entities.User;
import sprint2.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private  UserRepository User_Repository;

    public List<User> getAllUsers() {return User_Repository.findAll();}

    public User saveUser(User User) {return User_Repository.save(User);}
}