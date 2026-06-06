# IntelliHR AI

AI-Powered HR Management Platform built using FastAPI, React, MySQL, Ollama, and Machine Learning.

## Features

### Core HR
- Employee Management
- User Management
- Leave Management
- Attendance Tracking
- Payroll Management
- Performance Tracking

### AI Recruitment
- Resume Upload
- Resume Skill Extraction
- Resume Scoring
- AI Interview Question Generation
- Voice Screening
- AI Interview Agent
- Candidate Evaluation
- Hiring Decision System

### AI Assistant
- HR Chatbot using Ollama

### Job Management
- Create Job Opening
- Update Job Opening
- Delete Job Opening
- Open / Closed Status Tracking

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- Recharts
- React Router
- React Toastify

### Backend
- FastAPI
- SQLAlchemy
- MySQL
- JWT Authentication
- Passlib

### AI/ML
- Ollama
- Phi4-Mini
- Sentence Transformers
- Scikit-Learn

## Project Structure

```text
backend/
frontend/
docs/
```

## Installation

### Backend

```bash
cd backend

pip install -r requirements.txt

uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

## Default Roles

1. Admin
2. HR Recruiter
3. Senior Manager
4. Employee

## Author

Aniket Mahalappa Hadakar