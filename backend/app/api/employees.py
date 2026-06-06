from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.employee import Employee

from app.schemas.employee import EmployeeCreate

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


@router.get("/health")
def employee_health():

    return {
        "message": "Employee Module Working"
    }


@router.post("/")
def create_employee(
    employee: EmployeeCreate
):

    db: Session = SessionLocal()

    new_employee = Employee(
        employee_code=employee.employee_code,
        full_name=employee.full_name,
        email=employee.email,
        department=employee.department,
        designation=employee.designation,
        phone=employee.phone
    )

    db.add(new_employee)

    db.commit()

    return {
        "message": "Employee created successfully"
    }


@router.get("/")
def get_employees():

    db: Session = SessionLocal()

    employees = (
        db.query(Employee)
        .all()
    )

    return employees
@router.get("/count")
def employee_count():

    db: Session = SessionLocal()

    total = db.query(Employee).count()

    return {
        "total_employees": total
    }
@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int
):
    db = SessionLocal()

    employee = (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )

    if not employee:
        return {
            "message":
            "Employee not found"
        }

    db.delete(employee)
    db.commit()

    return {
        "message":
        "Employee deleted successfully"
    }
@router.put("/{employee_id}")
def update_employee(
    employee_id: int,
    employee_data: EmployeeCreate
):
    db = SessionLocal()

    employee = (
        db.query(Employee)
        .filter(
            Employee.id == employee_id
        )
        .first()
    )

    if not employee:
        return {
            "message":
            "Employee not found"
        }

    employee.employee_code = (
        employee_data.employee_code
    )

    employee.full_name = (
        employee_data.full_name
    )

    employee.email = (
        employee_data.email
    )

    employee.department = (
        employee_data.department
    )

    employee.designation = (
        employee_data.designation
    )

    employee.phone = (
        employee_data.phone
    )

    db.commit()

    return {
        "message":
        "Employee updated successfully"
    }