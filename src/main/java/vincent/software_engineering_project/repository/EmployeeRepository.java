package vincent.software_engineering_project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vincent.software_engineering_project.model.Employee;
import java.util.List;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByID(Long id);
    List<Employee> findByName(String name);
    List<Employee> findBySalary(double salary);
}