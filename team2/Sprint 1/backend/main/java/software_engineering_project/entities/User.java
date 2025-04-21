package software_engineering_project.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String expertise;

    public void setId(Integer new_id) {this.id = new_id;}
    public void setName(String new_name) {this.name = new_name;}
    public void setExpertise(String new_expertise) {this.expertise = new_expertise;}

    public Integer getId() {return this.id;}
    public String getName() {return this.name;}
    public String getExoertise() {return this.expertise;}
}
