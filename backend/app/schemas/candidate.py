from pydantic import BaseModel
from pydantic import EmailStr


class CandidateCreate(BaseModel):

    full_name: str

    email: EmailStr

    job_description: str