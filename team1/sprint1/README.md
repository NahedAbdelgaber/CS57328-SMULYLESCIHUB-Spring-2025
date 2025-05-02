## To Run:

start mysql in terminal in the root directory with:

```bash
cd sprint1 && mysql -u root -p

```

Make sure the backend/src/main/resources/applications.properties file has your mysql password correctly set where it says [YOUR_MYSQL_PASSWORD] on line 3

In a second terminal session run:

```bash
cd sprint1 && cd backend && ./gradlew bootRun
```

In a third terminal session run:

```bash
cd sprint1 && cd frontend && npm start
```

Navigate to localhost 300 to see the app
