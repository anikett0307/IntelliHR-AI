from fastapi import APIRouter
from pydantic import BaseModel

import ollama
import re

from sqlalchemy.orm import Session

from app.ai.interview_analyzer import (
    analyze_interview
)

from app.database.db import SessionLocal
from app.models.candidate import Candidate


router = APIRouter(
    prefix="/voice-screening",
    tags=["Voice Screening"]
)


class VoiceRequest(BaseModel):
    transcript: str


class InterviewRequest(BaseModel):
    candidate_id: int
    transcript: str


@router.post("/evaluate")
def evaluate_voice(
    request: VoiceRequest
):

    prompt = f"""
You are a Senior HR Manager.

Evaluate the candidate response.

Candidate Response:
{request.transcript}

Give:

Communication Score: X/10

Confidence Score: X/10

Technical Knowledge Score: X/10

Final Recommendation:
Strong Hire / Recommended / Needs Review / Reject

Reason:
Short reason.

Return only the evaluation.
"""

    response = ollama.chat(
        model="phi4-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "evaluation":
        response["message"]["content"]
    }


@router.post("/analyze")
def analyze_candidate(
    request: InterviewRequest
):

    db: Session = SessionLocal()

    try:

        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.id ==
                request.candidate_id
            )
            .first()
        )

        if not candidate:
            return {
                "message":
                "Candidate not found"
            }

        analysis = analyze_interview(
            request.transcript
        )

        candidate.interview_analysis = (
            analysis
        )

        score_match = re.search(
            r"Overall Score:\s*(\d+)",
            analysis
        )

        if score_match:

            candidate.interview_score = float(
                score_match.group(1)
            )

        else:

            candidate.interview_score = 0

        if candidate.score is not None:

            final_score = round(
                (
                    candidate.score * 0.4
                )
                +
                (
                    candidate.interview_score * 0.6
                ),
                2
            )

            if final_score >= 80:

                candidate.final_decision = (
                    "Strong Hire"
                )

            elif final_score >= 70:

                candidate.final_decision = (
                    "Recommended"
                )

            elif final_score >= 50:

                candidate.final_decision = (
                    "Needs Review"
                )

            else:

                candidate.final_decision = (
                    "Reject"
                )

        db.commit()
        db.refresh(candidate)

        return {

            "candidate_id":
            candidate.id,

            "candidate_name":
            candidate.full_name,

            "analysis":
            analysis,

            "resume_score":
            candidate.score,

            "interview_score":
            candidate.interview_score,

            "final_decision":
            candidate.final_decision
        }

    finally:

        db.close()