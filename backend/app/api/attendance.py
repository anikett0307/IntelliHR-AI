from fastapi import APIRouter
from sqlalchemy.orm import Session

from datetime import date
from datetime import datetime

from app.database.db import SessionLocal

from app.models.attendance import Attendance

from app.schemas.attendance import AttendanceCreate

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.get("/health")
def attendance_health():

    return {
        "message": "Attendance Module Working"
    }


@router.post("/check-in")
def check_in(
    attendance: AttendanceCreate
):

    db: Session = SessionLocal()

    new_attendance = Attendance(
        employee_id=attendance.employee_id,
        attendance_date=date.today(),
        check_in=datetime.now().time(),
        status="Present"
    )

    db.add(new_attendance)

    db.commit()

    return {
        "message": "Check-in successful"
    }


@router.get("/")
def get_attendance():

    db: Session = SessionLocal()

    attendance = (
        db.query(Attendance)
        .all()
    )

    return attendance

@router.put("/check-out/{employee_id}")
def check_out(
    employee_id: int
):

    db: Session = SessionLocal()

    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.employee_id == employee_id
        )
        .order_by(
            Attendance.id.desc()
        )
        .first()
    )

    if not attendance:
        return {
            "message": "Attendance not found"
        }

    attendance.check_out = datetime.now().time()

    db.commit()

    return {
        "message": "Check-out successful"
    }
@router.get("/count")
def attendance_count():

    db: Session = SessionLocal()

    total = (
        db.query(Attendance)
        .count()
    )

    return {
        "total_attendance_records": total
    }