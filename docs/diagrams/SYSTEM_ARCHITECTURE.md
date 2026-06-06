# IntelliHR AI System Architecture

## High Level Architecture

```text
+----------------------+
|      End Users       |
+----------+-----------+
           |
           v
+----------------------+
|   React Frontend     |
|  (Vite + React.js)   |
+----------+-----------+
           |
           | REST API Calls
           v
+----------------------+
|    FastAPI Backend   |
+----------+-----------+
           |
  +--------+--------+-------------------+
  |                 |                   |
  v                 v                   v

+---------+   +-------------+   +---------------+
|  MySQL  |   | JWT Auth    |   | AI Services   |
|Database |   | Security    |   | (Ollama LLM)  |
+---------+   +-------------+   +---------------+

                                   |
                 +-----------------+------------------+
                 |                 |                  |
                 v                 v                  v

        +---------------+  +---------------+  +---------------+
        | Resume Parser |  | Interview AI  |  | HR Chatbot    |
        +---------------+  +---------------+  +---------------+
```

---

## Frontend Layer

Technology:

* React.js
* Vite
* Axios
* React Router
* Recharts
* React Toastify

Responsibilities:

* User Interface
* Dashboard Visualization
* Form Handling
* API Communication
* Role-Based Navigation

Modules:

* Dashboard
* Employees
* Leaves
* Attendance
* Payroll
* Performance
* Recruitment
* Job Management
* Hiring Decisions
* HR Chatbot

---

## Backend Layer

Technology:

* FastAPI
* SQLAlchemy
* Python

Responsibilities:

* Business Logic
* Authentication
* Database Operations
* AI Integration
* API Services

---

## Database Layer

Technology:

* MySQL

Core Tables:

* Users
* Roles
* Employees
* Leave Requests
* Attendance
* Payroll
* Performance
* Candidates
* Jobs

---

## AI Layer

Technology:

* Ollama
* Phi4-Mini
* Sentence Transformers
* Scikit-Learn
* PyMuPDF

Services:

### Resume Parser

Extracts information from uploaded resumes.

### Resume Scorer

Calculates candidate suitability score.

### Skill Extractor

Identifies candidate skills automatically.

### Interview Agent

Generates role-based interview questions.

### Voice Screening

Analyzes interview transcripts.

### Hiring Recommendation Engine

Provides final hiring recommendations.

### HR Chatbot

Answers HR-related queries.

---

## Security Architecture

Authentication:

* JWT Token Authentication

Authorization:

* Role Based Access Control (RBAC)

Roles:

* Administrator
* HR Recruiter
* Senior Manager
* Employee

Password Security:

* BCrypt Hashing

---

## System Workflow

1. User logs into IntelliHR AI.
2. Frontend sends API requests to FastAPI.
3. FastAPI validates JWT token.
4. Business logic is executed.
5. Database operations are performed.
6. AI modules process recruitment workflows.
7. Results are returned to frontend.
8. Dashboard updates in real-time.

---

## Scalability Considerations

* Modular API Architecture
* Separate AI Service Layer
* REST-Based Communication
* Expandable Database Design
* Cloud Deployment Ready
