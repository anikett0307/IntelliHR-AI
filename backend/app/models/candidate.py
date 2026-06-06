from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from app.database.db import Base


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        nullable=False
    )

    resume_path = Column(
        String(500)
    )

    skills = Column(
    String(1000),
        default=""
    )

    score = Column(
        Float,
        default=0
    )

    status = Column(
        String(50),
        default="Pending"
    )

    recommendation = Column(
        Text
    )
    
    interview_score = Column(
        Float,
        default=0
    )
    
    interview_analysis = Column(
        Text
    )
    
    final_decision = Column(
        String(100),
        default="Pending"
    )