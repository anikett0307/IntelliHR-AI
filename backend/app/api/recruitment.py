from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form
)
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from app.ai.resume_parser import extract_text_from_pdf
from app.ai.resume_scorer import score_resume
from app.ai.skill_extractor import extract_skills
from app.ai.interview_generator import generate_questions

from app.ai.hiring_recommender import (
    generate_recommendation
)

from app.database.db import SessionLocal
from app.models.candidate import Candidate

from app.schemas.recruitment import (
    ResumeScoreRequest,
    CandidateRequest,
)

from app.schemas.interview import InterviewRequest

import os

router = APIRouter(
    prefix="/recruitment",
    tags=["AI Recruitment"]
)


@router.get("/health")
def recruitment_health():
    return {
        "message": "AI Recruitment Module Working"
    }


@router.post("/upload-resume")
async def upload_resume(
    full_name: str = Form(...),
    email: str = Form(...),
    file: UploadFile = File(...)
):
    os.makedirs("uploads", exist_ok=True)

    upload_path = f"uploads/{file.filename}"

    with open(upload_path, "wb") as buffer:
        buffer.write(await file.read())

    db: Session = SessionLocal()

    try:
        resume_text = extract_text_from_pdf(
            upload_path
        )

        skills = extract_skills(
            resume_text
        )

        job_description = """
        Looking for an AI Engineer.

        Skills required:

        Python
        Machine Learning
        Deep Learning
        FastAPI
        LangChain
        LLM
        Generative AI
        Docker
        AWS
        """

        score = score_resume(
            resume_text,
            job_description
        )

        final_score = round(
            score * 100,
            2
        )

        if final_score >= 70:
            status = "Shortlisted"
        elif final_score >= 50:
            status = "Review"
        else:
            status = "Rejected"

        recommendation = (
            generate_recommendation(
                final_score,
                ",".join(skills)
            )
        )

        candidate = Candidate(
            full_name=full_name,
            email=email,
            resume_path=upload_path,
            score=final_score,
            skills=",".join(skills),
            status=status,
            recommendation=recommendation
        )

        db.add(candidate)
        db.commit()
        db.refresh(candidate)

        return {
            "message": "Resume uploaded successfully",
            "file_path": upload_path,
            "candidate_name": full_name,
            "score": final_score,
            "status": status,
            "skills": skills,
            "recommendation": recommendation
        }

    finally:
        db.close()


@router.get("/extract-resume")
def extract_resume():

    text = extract_text_from_pdf(
        "uploads/Aniket_MH.pdf"
    )

    return {
        "resume_text": text[:3000]
    }


@router.post("/score-resume")
def score_candidate():

    resume_text = extract_text_from_pdf(
        "uploads/Aniket_MH.pdf"
    )

    job_description = """
    Looking for an AI Engineer.

    Skills required:

    Python
    Machine Learning
    Deep Learning
    FastAPI
    LangChain
    LLM
    Generative AI
    Docker
    AWS
    """

    similarity_score = score_resume(
        resume_text,
        job_description
    )

    return {
        "candidate": "Aniket",
        "score": round(
            similarity_score * 100,
            2
        )
    }


@router.get("/candidates")
def get_candidates():

    db: Session = SessionLocal()

    try:
        candidates = db.query(Candidate).all()

        return [
            {
                "id": candidate.id,
                "full_name": candidate.full_name,
                "email": candidate.email,
                "resume_path": candidate.resume_path,
                "skills": candidate.skills,
                "score": candidate.score,
                "status": candidate.status,
                "recommendation": candidate.recommendation,
                "interview_score": candidate.interview_score,
                "interview_analysis": candidate.interview_analysis,
                "final_decision": candidate.final_decision
            }
            for candidate in candidates
        ]

    finally:
        db.close()

@router.get(
    "/resume/{candidate_id}"
)
def view_resume(
    candidate_id: int
):

    db: Session = SessionLocal()

    try:

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

        return FileResponse(
            candidate.resume_path,
            media_type=
            "application/pdf",
            filename=
            os.path.basename(
                candidate.resume_path
            )
        )

    finally:
        db.close()


@router.post("/dynamic-score")
def dynamic_score(
    request: ResumeScoreRequest
):

    db: Session = SessionLocal()

    try:
        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.id == request.candidate_id
            )
            .first()
        )

        if not candidate:
            return {
                "error": "Candidate not found"
            }

        resume_text = extract_text_from_pdf(
            candidate.resume_path
        )

        skills = extract_skills(
            resume_text
        )

        score = score_resume(
            resume_text,
            request.job_description
        )

        final_score = round(
            score * 100,
            2
        )

        if final_score >= 70:
            status = "Shortlisted"
        elif final_score >= 50:
            status = "Review"
        else:
            status = "Rejected"

        recommendation = (
            generate_recommendation(
                final_score,
                ",".join(skills)
            )
        )

        candidate.score = final_score
        candidate.status = status
        candidate.recommendation = recommendation

        db.commit()

        return {
            "score": candidate.score,
            "status": candidate.status,
            "recommendation": candidate.recommendation
        }

    finally:
        db.close()


@router.post("/extract-skills")
def extract_resume_skills(
    request: CandidateRequest
):

    db: Session = SessionLocal()

    try:
        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.id == request.candidate_id
            )
            .first()
        )

        if not candidate:
            return {
                "skills": []
            }

        resume_text = extract_text_from_pdf(
            candidate.resume_path
        )

        skills = extract_skills(
            resume_text
        )

        return {
            "skills": skills
        }

    finally:
        db.close()


@router.get("/interview-questions")
def interview_questions():

    questions = generate_questions(
        "AI Engineer"
    )

    return {
        "questions": questions
    }


@router.post("/generate-interview")
def generate_interview(
    request: InterviewRequest
):

    questions = generate_questions(
        request.role
    )

    return {
        "role": request.role,
        "questions": questions
    }
