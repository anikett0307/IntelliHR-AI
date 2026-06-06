from pydantic import BaseModel



class ResumeScoreRequest(BaseModel):

    candidate_id: int

    job_description: str

class CandidateRequest(BaseModel):
    candidate_id: int