package software_engineering_project.entities;

import jakarta.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "industry_challenge_proposal")
public class IndustryChallengeProposal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "applicant_id", referencedColumnName = "id")
    private User applicant;

    @OneToOne
    @JoinColumn(name = "challenge_id", referencedColumnName = "id", 
        foreignKey = @ForeignKey(name = "FK10vy0fmuh416fi3fkreaoe014", 
                                   foreignKeyDefinition = "FOREIGN KEY (challenge_id) REFERENCES industry_challenge(id) ON DELETE CASCADE"))
    private IndustryChallenge challenge;
    
    private String description;
    private Integer price;
    private Date start_date;
    private Date end_date;

    public void setId(Integer new_id) {this.id = new_id;}
    public void setDescription(String new_description) {this.description = new_description;}
    public void setPrice(Integer new_price) {this.price = new_price;}
    public void setStartDate(Date new_date) {this.start_date = new_date;}
    public void setEndDate(Date new_date) {this.end_date = new_date;}

    public void setApplicant(User new_applicant) {this.applicant = new_applicant;}
    public void setChallenge(IndustryChallenge new_challenge) {this.challenge = new_challenge;}

    public Integer getId() {return this.id;}
    public String getDescription() {return this.description;}
    public Integer getPrice() {return this.price;}
    public Date getStartDate() {return this.start_date;}
    public Date getEndDate() {return this.end_date;}

    public User getApplicant() {return this.applicant;}
    public IndustryChallenge getChallenge() {return this.challenge;}
}
