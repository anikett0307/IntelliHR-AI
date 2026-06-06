from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float

from app.database.db import Base


class Performance(Base):
    __tablename__ = "performance"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        nullable=False
    )

    employee_name = Column(
        String(100),
        nullable=False
    )

    month = Column(
        String(50),
        nullable=False
    )

    rating = Column(
        Float,
        nullable=False
    )

    remarks = Column(
        String(500)
    )