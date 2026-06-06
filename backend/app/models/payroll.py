from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float

from app.database.db import Base


class Payroll(Base):
    __tablename__ = "payroll"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    employee_id = Column(
        Integer,
        nullable=False
    )

    basic_salary = Column(
        Float,
        nullable=False
    )

    hra = Column(
        Float,
        default=0
    )

    bonus = Column(
        Float,
        default=0
    )

    deductions = Column(
        Float,
        default=0
    )

    net_salary = Column(
        Float,
        default=0
    )