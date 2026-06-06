from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal

from app.models.performance import Performance

from app.schemas.performance import (
    PerformanceCreate
)

router = APIRouter(
    prefix="/performance",
    tags=["Performance"]
)


@router.post("/")
def create_performance(
    performance: PerformanceCreate
):

    db: Session = SessionLocal()

    new_performance = Performance(
        employee_id=
            performance.employee_id,

        employee_name=
            performance.employee_name,

        month=
            performance.month,

        rating=
            performance.rating,

        remarks=
            performance.remarks
    )

    db.add(new_performance)

    db.commit()

    return {
        "message":
        "Performance added successfully"
    }


@router.get("/")
def get_performance():

    db: Session = SessionLocal()

    performance = (
        db.query(Performance)
        .all()
    )

    return performance