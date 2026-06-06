# IntelliHR AI Deployment Guide

## Overview

This guide explains how to deploy IntelliHR AI in a production environment.

Architecture:

* Frontend → Vercel
* Backend → Render
* Database → MySQL
* AI Services → Ollama

---

# Prerequisites

Required Software:

* Python 3.11+
* Node.js 20+
* MySQL 8+
* Git
* Ollama

---

# Local Development Setup

## Clone Repository

```bash
git clone https://github.com/anikett0307/IntelliHR-AI.git
cd IntelliHR-AI
```

---

## Backend Setup

Navigate to backend:

```bash
cd backend
```

Create Virtual Environment:

```bash
python -m venv venv
```

Activate Environment:

Windows:

```bash
venv\Scripts\activate
```

Install Dependencies:

```bash
pip install -r requirements.txt
```

Run Backend:

```bash
uvicorn app.main:app --reload
```

Backend URL:

```text
http://localhost:8000
```

Swagger Documentation:

```text
http://localhost:8000/docs
```

---

## Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install Dependencies:

```bash
npm install
```

Start Frontend:

```bash
npm run dev
```

Frontend URL:

```text
http://localhost:5173
```

---

# MySQL Configuration

Create Database:

```sql
CREATE DATABASE intellihr_ai;
```

Update Database Configuration:

File:

```text
backend/app/core/config.py
```

Example:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_password
MYSQL_DB=intellihr_ai
```

---

# Ollama Setup

Install Ollama:

Official Website:

```text
https://ollama.com
```

Pull Phi4-Mini Model:

```bash
ollama pull phi4-mini
```

Verify Installation:

```bash
ollama list
```

Start Ollama:

```bash
ollama serve
```

---

# Environment Variables

Create:

```text
backend/.env
```

Example:

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256

MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=password
MYSQL_DB=intellihr_ai
```

---

# Backend Deployment (Render)

## Create Web Service

1. Login to Render
2. Create New Web Service
3. Connect GitHub Repository
4. Select IntelliHR-AI Repository

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Environment Variables:

```env
SECRET_KEY=your_secret_key
ALGORITHM=HS256
MYSQL_HOST=your_database_host
MYSQL_PORT=3306
MYSQL_USER=your_user
MYSQL_PASSWORD=your_password
MYSQL_DB=intellihr_ai
```

---

# Frontend Deployment (Vercel)

## Create Project

1. Login to Vercel
2. Import GitHub Repository
3. Select frontend folder

Build Command:

```bash
npm run build
```

Output Directory:

```text
dist
```

Environment Variable:

```env
VITE_API_URL=https://your-render-url.onrender.com
```

---

# Production Checklist

Authentication:

* JWT Working
* Role-Based Access Control Enabled

Database:

* MySQL Connected
* Tables Created

Frontend:

* API URL Updated
* Production Build Generated

AI Services:

* Ollama Installed
* Phi4-Mini Downloaded

Security:

* Secret Keys Configured
* Environment Variables Protected

---

# Deployment Verification

Verify:

* Login Works
* Dashboard Loads
* Employees Module Works
* Leave Management Works
* Attendance Works
* Payroll Works
* Performance Tracking Works
* Recruitment AI Works
* HR Chatbot Works
* Voice Screening Works
* AI Interview Agent Works
* Hiring Decisions Works

---

# Future Production Enhancements

* Docker Deployment
* CI/CD Pipeline
* Nginx Reverse Proxy
* HTTPS Configuration
* AWS Deployment
* Azure Deployment
* Kubernetes Deployment
* Multi-Tenant Architecture

---

# Project Repository

GitHub Repository:

https://github.com/anikett0307/IntelliHR-AI

Project Name:

IntelliHR AI – AI-Powered HR Management Platform
