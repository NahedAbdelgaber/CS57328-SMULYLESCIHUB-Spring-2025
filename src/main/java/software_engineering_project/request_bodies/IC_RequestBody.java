package software_engineering_project.request_bodies;

import java.sql.Date;

public class IC_RequestBody {
    public String title;
    public String description;
    public Integer budget;
    public Date start_date;
    public Date end_date;
    public String required_expertise;

    // Getters
    public String getTitle() {
        return title;
    }
    public String getDescription() {
        return description;
    }
    public Integer getBudget() {
        return budget;
    }
    public Date getStartDate() {
        return start_date;
    }
    public Date getEndDate() {
        return end_date;
    }
    public String getRequiredExpertise() {
        return required_expertise;
    }
}
