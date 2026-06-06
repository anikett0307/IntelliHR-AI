from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Date
from sqlalchemy import Time
from sqlalchemy import String

from app.database.db import Base


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        nullable=False
    )

    attendance_date = Column(
        Date,
        nullable=False
    )

    check_in = Column(
        Time,
        nullable=True
    )

    check_out = Column(
        Time,
        nullable=True
    )

    status = Column(
        String(20),
        default="Present"
    )