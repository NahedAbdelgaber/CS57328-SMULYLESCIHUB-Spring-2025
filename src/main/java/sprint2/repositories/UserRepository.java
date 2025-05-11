package sprint2.repositories;

import org.springframework.stereotype.Repository;

import sprint2.entities.User;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
