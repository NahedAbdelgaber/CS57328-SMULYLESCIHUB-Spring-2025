package vincent.software_engineering_project.service;

import org.springframework.stereotype.Service;
import vincent.software_engineering_project.model.Employee;
import vincent.software_engineering_project.repository.EmployeeRepository;
import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {this.repository = repository;}
    public List<Employee> getAllEmployees() {return repository.findAll();}
    public Employee saveEmployee(Employee employee) {return repository.save(employee);}
}