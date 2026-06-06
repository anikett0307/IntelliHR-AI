from fastapi import FastAPI
from app.models.job import Job
from app.models.candidate import Candidate
from app.database.db import Base, engine
from app.models.job import Job
from app.models.candidate import Candidate

from app.models.user import User
from app.models.role import Role

from app.api.auth import router as auth_router
from app.models.employee import Employee
from app.api.employees import router as employee_router
from app.api.dashboard import (
    router as dashboard_router
)
from app.models.leave_request import LeaveRequest
from app.api.leaves import (
    router as leave_router
)
from app.models.attendance import Attendance

from app.api.attendance import (
    router as attendance_router
)
from app.models.payroll import Payroll

from app.api.payroll import (
    router as payroll_router
)
from app.models.performance import Performance
from app.api.recruitment import (
    router as recruitment_router
)
from fastapi.middleware.cors import CORSMiddleware
from app.api.chatbot import (
    router as chatbot_router
)
from app.api.jobs import (
    router as jobs_router
)
from app.api.interview_agent import (
    router as interview_agent_router
)


Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="IntelliHR AI",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(employee_router)
app.include_router(
    dashboard_router
)
app.include_router(
    leave_router
)
app.include_router(
    attendance_router
)
app.include_router(
    payroll_router
)
app.include_router(
    recruitment_router
)
from app.api.performance import (
    router as performance_router
)

app.include_router(
    performance_router
)
app.include_router(
    chatbot_router
)

from app.api.voice_screening import (
    router as voice_screening_router
)

app.include_router(
    voice_screening_router
)
from app.api.hiring_decisions import (
    router as hiring_router
)

app.include_router(
    hiring_router
)
app.include_router(
    jobs_router
)

app.include_router(
    interview_agent_router
)

@app.get("/")
def root():
    return {
        "message": "Welcome to IntelliHR AI"
    }