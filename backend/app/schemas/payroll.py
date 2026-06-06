from pydantic import BaseModel


class PayrollCreate(BaseModel):

    employee_id: int

    basic_salary: float

    hra: float

    bonus: float

    deductions: float