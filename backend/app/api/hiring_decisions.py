from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.candidate import Candidate

router = APIRouter(
    prefix="/hiring-decisions",
    tags=["Hiring Decisions"]
)


@router.get("/")
def get_candidates():

    db: Session = SessionLocal()

    return db.query(
        Candidate
    ).all()


@router.put(
    "/approve/{candidate_id}"
)
def approve_candidate(
    candidate_id: int
):

    db: Session = SessionLocal()

    candidate = (
        db.query(Candidate)
        .filter(
            Candidate.id ==
            candidate_id
        )
        .first()
    )

    if not candidate:
        return {
            "message":
            "Candidate not found"
        }

    candidate.final_decision = (
        "Approved"
    )

    db.commit()

    return {
        "message":
        "Candidate Approved"
    }


@router.put(
    "/reject/{candidate_id}"
)
def reject_candidate(
    candidate_id: int
):

    db: Session = SessionLocal()

    candidate = (
        db.query(Candidate)
        .filter(
            Candidate.id ==
            candidate_id
        )
        .first()
    )

    if not candidate:
        return {
            "message":
            "Candidate not found"
        }

    candidate.final_decision = (
        "Rejected"
    )

    db.commit()

    return {
        "message":
        "Candidate Rejected"
    }


@router.put(
    "/review/{candidate_id}"
)
def review_candidate(
    candidate_id: int
):

    db: Session = SessionLocal()

    candidate = (
        db.query(Candidate)
        .filter(
            Candidate.id ==
            candidate_id
        )
        .first()
    )

    if not candidate:
        return {
            "message":
            "Candidate not found"
        }

    candidate.final_decision = (
        "Needs Review"
    )

    db.commit()

    return {
        "message":
        "Candidate Marked For Review"
    }