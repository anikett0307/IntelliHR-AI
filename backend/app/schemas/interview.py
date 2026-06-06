from pydantic import BaseModel


class InterviewRequest(BaseModel):
    role: str


class InterviewAgentRequest(BaseModel):
    candidate_id: int
    role: str


class AnswerRequest(BaseModel):
    candidate_id: int
    question: str
    answer: str