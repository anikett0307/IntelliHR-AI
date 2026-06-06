from fastapi import APIRouter

from app.ai.interview_agent import (
    generate_interview_questions,
    evaluate_answer
)

from app.schemas.interview import (
    InterviewAgentRequest,
    AnswerRequest
)

router = APIRouter(
    prefix="/interview-agent",
    tags=["AI Interview Agent"]
)


@router.post("/start")
def start_interview(
    request: InterviewAgentRequest
):

    questions = (
        generate_interview_questions(
            request.role
        )
    )

    return {
        "candidate_id":
        request.candidate_id,

        "questions":
        questions
    }


@router.post("/evaluate")
def evaluate_candidate_answer(
    request: AnswerRequest
):

    score = evaluate_answer(
        request.question,
        request.answer
    )

    return {
        "score": score
    }