from fastapi import APIRouter
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.job import Job

router = APIRouter(
    prefix="/jobs",
    tags=["Job Management"]
)


@router.get("/")
def get_jobs():

    db: Session = SessionLocal()

    try:

        return db.query(
            Job
        ).all()

    finally:

        db.close()


@router.post("/")
def create_job(
    job: dict
):

    db: Session = SessionLocal()

    try:

        new_job = Job(
            title=job["title"],
            department=job["department"],
            description=job["description"],
            status=job["status"]
        )

        db.add(
            new_job
        )

        db.commit()

        db.refresh(
            new_job
        )

        return {
            "message":
            "Job Created",
            "job":
            new_job.id
        }

    finally:

        db.close()


@router.put("/{job_id}")
def update_job(
    job_id: int,
    job: dict
):

    db: Session = SessionLocal()

    try:

        existing_job = (
            db.query(Job)
            .filter(
                Job.id == job_id
            )
            .first()
        )

        if not existing_job:

            return {
                "message":
                "Job not found"
            }

        existing_job.title = (
            job["title"]
        )

        existing_job.department = (
            job["department"]
        )

        existing_job.description = (
            job["description"]
        )

        existing_job.status = (
            job["status"]
        )

        db.commit()

        return {
            "message":
            "Job Updated"
        }

    finally:

        db.close()


@router.delete("/{job_id}")
def delete_job(
    job_id: int
):

    db: Session = SessionLocal()

    try:

        existing_job = (
            db.query(Job)
            .filter(
                Job.id == job_id
            )
            .first()
        )

        if not existing_job:

            return {
                "message":
                "Job not found"
            }

        db.delete(
            existing_job
        )

        db.commit()

        return {
            "message":
            "Job Deleted"
        }

    finally:

        db.close()