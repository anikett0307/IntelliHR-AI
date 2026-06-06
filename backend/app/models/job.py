from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class Job(Base):
    __tablename__ = "jobs"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String(100),
        nullable=False
    )

    department = Column(
        String(100),
        nullable=False
    )

    description = Column(
        String(1000),
        nullable=False
    )

    status = Column(
        String(20),
        default="Open"
    )