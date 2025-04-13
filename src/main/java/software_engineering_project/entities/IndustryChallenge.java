package software_engineering_project.entities;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "industry_challenge")
public class IndustryChallenge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String title;
    private String description;

    private Integer budget;
    private Date start_date;
    private Date end_date;

    private String required_expertise;
    private Boolean open_status;

    public void setId(Integer new_id) {this.id = new_id;}
    public void setTitle(String new_title) {this.title = new_title;}
    public void setDescription(String new_description) {this.description = new_description;}
    public void setBudget(Integer new_budget) {this.budget = new_budget;}
    public void setStartDate(Date new_date) {this.start_date = new_date;}
    public void setEndDate(Date new_date) {this.end_date = new_date;}
    public void setRequiredExpertise(String new_expertise) {this.required_expertise = new_expertise;}
    public void setOpenStatus(Boolean new_status) {this.open_status = new_status;}

    public Integer getId() {return this.id;}
    public String getTitle() {return this.title;}
    public String getDescription() {return this.description;}
    public Integer getBudget() {return this.budget;}
    public Date getStartDate() {return this.start_date;}
    public Date getEndDate() {return this.end_date;}
    public String getRequiredExpertise() {return this.required_expertise;}
    public Boolean getOpenStatus() {return this.open_status;}
}