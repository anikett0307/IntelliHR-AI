# IntelliHR AI ER Diagram Documentation

## Entity Relationship Overview

The IntelliHR AI platform uses a relational database structure to manage users, employees, HR operations, recruitment workflows, and AI-driven candidate evaluation.

---

# ER Diagram

```text
+------------+
|   Roles    |
+------------+
| id (PK)    |
| name       |
+-----+------+
      |
      | 1
      |
      | N
+-----v------+
|   Users    |
+------------+
| id (PK)    |
| full_name  |
| email      |
| password   |
| role_id FK |
+------------+


+-------------+
| Employees   |
+-------------+
| id (PK)     |
| full_name   |
| email       |
| department  |
| position    |
| salary      |
+------+------+
       |
       |
       +----------------------+
       |                      |
       |                      |
       v                      v

+-------------+      +---------------+
| Attendance  |      | LeaveRequest  |
+-------------+      +---------------+
| id (PK)     |      | id (PK)       |
| employee_id | FK   | employee_idFK |
| check_in    |      | leave_type    |
| check_out   |      | start_date    |
| status      |      | end_date      |
+-------------+      | status        |
                     +---------------+

       |
       |
       +----------------------+
       |                      |
       |                      |
       v                      v

+-------------+      +---------------+
| Payroll     |      | Performance   |
+-------------+      +---------------+
| id (PK)     |      | id (PK)       |
| employee_id | FK   | employee_idFK |
| basicSalary |      | rating        |
| bonus       |      | remarks       |
| deductions  |      | month         |
+-------------+      +---------------+


+-------------+
|    Jobs     |
+-------------+
| id (PK)     |
| title       |
| department  |
| description |
| status      |
+------+------+
       |
       |
       | 1
       |
       | N
+------v------+
| Candidates  |
+-------------+
| id (PK)     |
| full_name   |
| email       |
| resume_path |
| score       |
| interview   |
| decision    |
+-------------+
```

---

# Entity Descriptions

## Roles

Stores application roles.

Attributes:

* id
* name

Examples:

* Admin
* HR Recruiter
* Senior Manager
* Employee

---

## Users

Stores login accounts.

Attributes:

* id
* full_name
* email
* password
* role_id

Relationship:

* Many Users belong to One Role.

---

## Employees

Stores employee information.

Attributes:

* id
* full_name
* email
* department
* position
* salary

Relationships:

* One Employee → Many Attendance Records
* One Employee → Many Leave Requests
* One Employee → Many Payroll Records
* One Employee → Many Performance Reviews

---

## Attendance

Stores attendance activities.

Attributes:

* id
* employee_id
* attendance_date
* check_in
* check_out
* status

---

## LeaveRequest

Stores leave applications.

Attributes:

* id
* employee_id
* leave_type
* start_date
* end_date
* reason
* status

---

## Payroll

Stores salary information.

Attributes:

* id
* employee_id
* basic_salary
* hra
* bonus
* deductions
* net_salary

---

## Performance

Stores employee reviews.

Attributes:

* id
* employee_id
* employee_name
* month
* rating
* remarks

---

## Jobs

Stores job openings.

Attributes:

* id
* title
* department
* description
* status

Status Values:

* Open
* Closed

---

## Candidates

Stores recruitment information.

Attributes:

* id
* full_name
* email
* resume_path
* score
* interview_score
* interview_analysis
* final_decision

Relationships:

* Multiple Candidates can apply to a Job Opening.

---

# Database Design Principles

* Normalized relational design
* Foreign key relationships
* Role-based access structure
* Recruitment-focused schema
* Scalable HR data model
* AI workflow integration

---

# Future Database Enhancements

* Interview Session Table
* Chat History Table
* Notification Table
* Audit Log Table
* Organization Table
* Multi-Tenant Support
