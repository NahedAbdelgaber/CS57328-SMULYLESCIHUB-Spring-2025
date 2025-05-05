-- Backup the existing table
CREATE TABLE tech_ideas_backup AS SELECT * FROM tech_ideas;

-- Drop the existing table
DROP TABLE tech_ideas;

-- Create the new table with date_posted column
CREATE TABLE tech_ideas (
  id bigint NOT NULL AUTO_INCREMENT,
  tech_description text NOT NULL,
  user_name varchar(255) NOT NULL,
  max_budget double NOT NULL,
  min_budget double NOT NULL,
  tech_type enum('ARTIFICIAL_INTELLIGENCE','BLOCKCHAIN','CLOUD_COMPUTING','CYBERSECURITY','DATA_SCIENCE','IOT','MOBILE_DEVELOPMENT','OTHER','WEB_DEVELOPMENT') NOT NULL,
  date_posted datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Restore the data with current timestamp for date_posted
INSERT INTO tech_ideas (id, tech_description, user_name, max_budget, min_budget, tech_type, date_posted)
SELECT id, tech_description, user_name, max_budget, min_budget, tech_type, CURRENT_TIMESTAMP(6)
FROM tech_ideas_backup;

-- Drop the backup table
DROP TABLE tech_ideas_backup; 