package software_engineering_project.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import software_engineering_project.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    
}
