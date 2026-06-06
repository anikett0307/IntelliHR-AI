from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from app.database.db import Base


class Employee(Base):
    __tablename__ = "employees"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_code = Column(
        String(20),
        unique=True,
        nullable=False
    )

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(100),
        unique=True,
        nullable=False
    )

    department = Column(
        String(100),
        nullable=False
    )

    designation = Column(
        String(100),
        nullable=False
    )

    phone = Column(
        String(20)
    )

    status = Column(
        String(20),
        default="Active"
    )