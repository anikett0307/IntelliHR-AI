from fastapi import APIRouter
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password
from app.database.db import SessionLocal
from app.models.role import Role
from app.schemas.auth import LoginRequest
from app.core.security import (
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.get("/health")
def health_check():
    return {
        "status": "working"
    }


@router.post("/seed-roles")
def seed_roles():

    db: Session = SessionLocal()

    roles = [
        "Admin",
        "HR Recruiter",
        "Senior Manager",
        "Employee"
    ]

    for role_name in roles:

        existing_role = (
            db.query(Role)
            .filter(Role.name == role_name)
            .first()
        )

        if not existing_role:
            role = Role(name=role_name)
            db.add(role)

    db.commit()

    return {
        "message": "Roles seeded successfully"
    }
@router.post("/register")
def register_user(user: UserCreate):

    db: Session = SessionLocal()

    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        return {
            "message": "Email already exists"
        }

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role_id=user.role_id
    )

    db.add(new_user)

    db.commit()

    return {
        "message": "User registered successfully"
    }
@router.post("/login")
def login(
    login_data: LoginRequest
):

    db: Session = SessionLocal()

    user = (
        db.query(User)
        .filter(
            User.email ==
            login_data.email
        )
        .first()
    )

    if not user:
        return {
            "message": "Invalid email"
        }

    if not verify_password(
        login_data.password,
        user.password
    ):
        return {
            "message": "Invalid password"
        }

    token = create_access_token(
        {
            "user_id": user.id,
            "email": user.email,
            "role_id": user.role_id
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }
@router.get("/users")
def get_users():

    db: Session = SessionLocal()

    users = (
        db.query(User)
        .all()
    )

    return users