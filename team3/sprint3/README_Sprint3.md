# Sprint 3

## 🏁 Sprint Goal
Extend the system by enabling students to apply for RA jobs. Implement backend support for RA Applications, including student creation via application form, and job association. Frontend allows users to select a job and apply with name and email.

## ✅ Features Implemented
- Submit RA Applications linked to a job
- Auto-create `Student` if one doesn't exist
- List available jobs for student to apply
- Backend & frontend containerized with Docker

## 👥 Team Members
- Nabeela Khan
- Kiersten Wener
- Hamna Tameez
- Miles Youngblood

---

## 🧪 How to Run/Test Our Code (Docker-based)

### 🔧 Prerequisites
- Docker & Docker Compose installed

### ▶️ Steps to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/NahedAbdelgaber/CS57328-SMULYLESCIHUB-Spring-2025.git
   cd CS57328-SMULYLESCIHUB-Spring-2025
   ```

2. Create a `.env` file in the root directory with:
   ```env
   MYSQL_ROOT_PASSWORD=yourpassword
   MYSQL_DATABASE=cshub
   SPRING_DATASOURCE_URL=jdbc:mysql://db:3306/cshub?allowPublicKeyRetrieval=true&useSSL=false
   SPRING_DATASOURCE_USERNAME=root
   SPRING_DATASOURCE_PASSWORD=yourpassword
   REACT_APP_API_URL=http://localhost:8080
   ```

3. Create a `.env` file in the frontend directory with:
   ```env
   REACT_APP_API_URL=http://localhost:8080
   ```

3. Build and run all services:
   ```bash
   docker-compose up --build
   ```

4. Access:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:8080/api](http://localhost:8080/api)

---

### 🧪 Manual Testing Notes
- To post a job: use the **RA Job form** at `/jobs`
- To apply: go to `/applications/new` and fill out the student form