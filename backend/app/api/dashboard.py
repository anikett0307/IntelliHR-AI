from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.employee import Employee
from app.models.user import User
from app.models.leave_request import LeaveRequest
from app.models.attendance import Attendance
from app.models.payroll import Payroll
from app.models.candidate import Candidate
from app.models.performance import Performance
from sqlalchemy import func



router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def dashboard_stats():

    db: Session = SessionLocal()

    try:
        total_employees = (
            db.query(Employee)
            .count()
        )

        total_users = (
            db.query(User)
            .count()
        )

        total_leaves = (
            db.query(LeaveRequest)
            .count()
        )

        total_attendance = (
            db.query(Attendance)
            .count()
        )

        total_payroll = (
            db.query(Payroll)
            .count()
        )

        total_candidates = (
            db.query(Candidate)
            .count()
        )

        total_performance = (
            db.query(Performance)
            .count()
        )

        average_rating = (
            db.query(
                func.avg(
                    Performance.rating
                )
            )
            .scalar()
        )

        top_performer = (
            db.query(Performance)
            .order_by(
                Performance.rating.desc()
            )
            .first()
        )

        return {
            "total_employees": total_employees,
            "total_users": total_users,
            "total_leaves": total_leaves,
            "total_attendance": total_attendance,
            "total_payroll": total_payroll,
            "total_candidates": total_candidates,

            "total_performance":
                total_performance,

            "average_rating":
                round(
                    average_rating or 0,
                    2
                ),

            "top_performer":
                top_performer.employee_name
                if top_performer
                else "N/A"
        }

    finally:
        db.close()