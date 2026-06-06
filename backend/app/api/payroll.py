from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.payroll import Payroll

from app.schemas.payroll import PayrollCreate

router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"]
)


@router.get("/health")
def payroll_health():

    return {
        "message": "Payroll Module Working"
    }


@router.post("/")
def create_payroll(
    payroll: PayrollCreate
):

    db: Session = SessionLocal()

    net_salary = (
        payroll.basic_salary
        + payroll.hra
        + payroll.bonus
        - payroll.deductions
    )

    new_payroll = Payroll(
        employee_id=payroll.employee_id,
        basic_salary=payroll.basic_salary,
        hra=payroll.hra,
        bonus=payroll.bonus,
        deductions=payroll.deductions,
        net_salary=net_salary
    )

    db.add(new_payroll)

    db.commit()

    return {
        "message": "Payroll generated successfully",
        "net_salary": net_salary
    }


@router.get("/")
def get_payroll():

    db: Session = SessionLocal()

    payroll = (
        db.query(Payroll)
        .all()
    )

    return payroll