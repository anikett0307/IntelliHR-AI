from fastapi import APIRouter

from app.schemas.chat import (
    ChatRequest
)

from app.ai.hr_chatbot import (
    hr_chat
)

router = APIRouter(
    prefix="/chatbot",
    tags=["HR Chatbot"]
)


@router.post("/")

def chat(
    request: ChatRequest
):

    answer = hr_chat(
        request.message
    )

    return {
        "response":
            answer
    }