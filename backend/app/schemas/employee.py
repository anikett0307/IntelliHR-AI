from pydantic import BaseModel
from pydantic import EmailStr


class EmployeeCreate(BaseModel):

    employee_code: str

    full_name: str

    email: EmailStr

    department: str

    designation: str

    phone: str