from pydantic import BaseModel


class PerformanceCreate(BaseModel):

    employee_id: int

    employee_name: str

    month: str

    rating: float

    remarks: str