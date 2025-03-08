package vincent.software_engineering_project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "employees")

public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String name;
    private double salary;

    public long getID() {return id;}
    public String getName() {return name;}
    public double getSalary() {return salary;}

    public void setID(Long new_id) {this.id = new_id;}
    public void setName(String new_name) {this.name = new_name;}
    public void setSalary(double new_salary) {this.salary = new_salary;}
}