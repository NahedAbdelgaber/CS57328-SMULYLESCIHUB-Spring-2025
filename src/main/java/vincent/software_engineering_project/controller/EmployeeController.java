package vincent.software_engineering_project.controller;

import org.springframework.web.bind.annotation.*;
import vincent.software_engineering_project.service.EmployeeService;
import vincent.software_engineering_project.model.Employee;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService service;

    public EmployeeController(EmployeeService service) {this.service = service;}

    @GetMapping
    public List<Employee> getEmployees() {return service.getAllEmployees();}

    @PostMapping
    public Employee addEmployee(@RequestBody Employee employee) {return service.saveEmployee(employee);}
}
