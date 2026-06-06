from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.leave_request import LeaveRequest

from app.schemas.leave import LeaveCreate

router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)


@router.get("/health")
def leave_health():

    return {
        "message": "Leave Module Working"
    }


@router.post("/")
def apply_leave(
    leave: LeaveCreate
):

    db: Session = SessionLocal()

    new_leave = LeaveRequest(
        employee_id=leave.employee_id,
        leave_type=leave.leave_type,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason
    )

    db.add(new_leave)

    db.commit()

    return {
        "message": "Leave applied successfully"
    }


@router.get("/")
def get_leaves():

    db: Session = SessionLocal()

    leaves = (
        db.query(LeaveRequest)
        .all()
    )

    return leaves
@router.put("/approve/{leave_id}")
def approve_leave(
    leave_id: int
):

    db: Session = SessionLocal()

    leave = (
        db.query(LeaveRequest)
        .filter(
            LeaveRequest.id == leave_id
        )
        .first()
    )

    if not leave:
        return {
            "message": "Leave not found"
        }

    leave.status = "Approved"

    db.commit()

    return {
        "message": "Leave approved successfully"
    }
@router.put("/reject/{leave_id}")
def reject_leave(
    leave_id: int
):

    db: Session = SessionLocal()

    leave = (
        db.query(LeaveRequest)
        .filter(
            LeaveRequest.id == leave_id
        )
        .first()
    )

    if not leave:
        return {
            "message": "Leave not found"
        }

    leave.status = "Rejected"

    db.commit()

    return {
        "message": "Leave rejected successfully"
    }