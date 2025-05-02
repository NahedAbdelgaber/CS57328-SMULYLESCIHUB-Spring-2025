## To Run:

Make sure the sprint1/backend/src/main/resources/applications.properties file has your mysql password correctly set where it says [YOUR_MYSQL_PASSWORD] on line 3

if the tech_ideas database is not created, please create it with this mysql command:

CREATE DATABASE IF NOT EXISTS tech_ideas_db;

start mysql in terminal in the root directory with:

```bash
cd sprint1 && mysql -u root -p

```

In a second terminal session run:

```bash
cd sprint1 && cd backend && ./gradlew bootRun
```

In a third terminal session run:

```bash
cd sprint1 && cd frontend && npm start
```

Navigate to localhost 300 to see the app

Screenshots of our app are in the sprint1/functionality folder
