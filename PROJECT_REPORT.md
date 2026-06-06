# IntelliHR AI – AI-Powered HR Management Platform

## Project Overview

IntelliHR AI is an AI-powered Human Resource Management Platform developed to automate and streamline HR operations. The system combines traditional HR workflows with Artificial Intelligence capabilities such as Resume Screening, AI Interview Assistance, Voice Screening, Hiring Recommendations, and HR Chatbot support.

The platform enables organizations to efficiently manage employees, attendance, leave requests, payroll, performance reviews, recruitment processes, and candidate evaluations through a unified web application.

---

# Problem Statement

Traditional HR systems primarily focus on data storage and manual workflows. Recruitment teams spend significant time screening resumes, conducting interviews, evaluating candidates, and making hiring decisions.

There is a need for an intelligent HR platform that can:

* Automate repetitive HR processes
* Improve recruitment efficiency
* Assist interview evaluation
* Reduce manual screening effort
* Provide AI-driven hiring insights
* Centralize HR operations

---

# Objectives

The main objectives of IntelliHR AI are:

* Manage employee information efficiently
* Automate leave and attendance workflows
* Generate payroll records
* Track employee performance
* Screen resumes using AI
* Generate interview questions automatically
* Evaluate candidate responses
* Provide hiring recommendations
* Support HR operations through an AI chatbot
* Improve overall recruitment productivity

---

# System Modules

## 1. Authentication & Authorization

Features:

* User Registration
* User Login
* JWT Authentication
* Role-Based Access Control

Roles:

* Administrator
* HR Recruiter
* Senior Manager
* Employee

---

## 2. Employee Management

Features:

* Add Employees
* Update Employee Records
* Delete Employees
* View Employee Information
* Employee Statistics

---

## 3. Leave Management

Features:

* Apply Leave
* Approve Leave
* Reject Leave
* Leave Tracking
* Leave History

---

## 4. Attendance Management

Features:

* Employee Check-In
* Employee Check-Out
* Attendance Tracking
* Attendance Statistics

---

## 5. Payroll Management

Features:

* Payroll Generation
* Salary Calculation
* Bonus Management
* Deduction Management
* Excel Export

---

## 6. Performance Management

Features:

* Employee Performance Reviews
* Monthly Ratings
* Remarks Tracking
* Performance Analytics

---

## 7. AI Recruitment System

Features:

* Resume Upload
* Resume Parsing
* Skill Extraction
* Resume Scoring
* Candidate Ranking

AI Components:

* Resume Parser
* Skill Extractor
* Resume Scorer

---

## 8. AI Interview Agent

Features:

* Interview Question Generation
* Voice-Based Interview Support
* Sequential Question Flow
* Candidate Transcript Collection
* Automated Evaluation

Workflow:

1. Generate Questions
2. Conduct Interview
3. Collect Responses
4. Build Transcript
5. Evaluate Candidate
6. Generate Recommendation

---

## 9. Voice Screening

Features:

* Speech Recognition
* Candidate Analysis
* Communication Scoring
* Confidence Scoring
* Technical Knowledge Scoring

---

## 10. Hiring Decision Engine

Features:

* Candidate Evaluation
* Final Recommendation
* Approval Workflow
* Rejection Workflow
* Review Workflow

Decision Categories:

* Strong Hire
* Recommended
* Needs Review
* Reject

---

## 11. AI HR Chatbot

Features:

* HR Policy Assistance
* Employee Queries
* HR Guidance
* AI-Based Responses

Powered By:

* Ollama
* Phi4-Mini

---

## System Architecture

Frontend Layer

* React.js
* React Router
* Axios
* Recharts
* React Toastify

Backend Layer

* FastAPI
* SQLAlchemy
* JWT Authentication
* REST APIs

Database Layer

* MySQL

AI Layer

* Ollama
* Phi4-Mini
* Sentence Transformers
* Scikit-Learn
* Resume Analysis Models

---

# Technology Stack

## Frontend

* React.js
* Vite
* Axios
* React Router DOM
* Recharts
* React Toastify
* XLSX

## Backend

* FastAPI
* SQLAlchemy
* Python
* JWT
* Passlib

## Database

* MySQL

## AI/ML

* Ollama
* Phi4-Mini
* Sentence Transformers
* Scikit-Learn
* PyMuPDF

---

# Database Entities

Main Tables:

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

# Security Features

* JWT Authentication
* Password Hashing using BCrypt
* Protected Routes
* Role-Based Access Control
* Secure API Access

---

# Key Achievements

* Developed a complete full-stack HR management platform.
* Implemented AI-powered recruitment workflows.
* Built voice-based interview evaluation functionality.
* Integrated local LLMs using Ollama.
* Designed responsive dashboards and analytics.
* Implemented role-based authorization.
* Automated hiring recommendation processes.

---

# Future Enhancements

* Email Notification System
* Video Interview Analysis
* Employee Mobile Application
* Advanced Analytics Dashboard
* Multi-Company Support
* Cloud Deployment
* Real-Time Collaboration Features
* AI Performance Prediction

---

# Conclusion

IntelliHR AI successfully combines Human Resource Management with Artificial Intelligence to automate recruitment and workforce operations. The platform improves efficiency, reduces manual effort, and assists HR teams in making data-driven hiring decisions through AI-powered analysis and automation.
