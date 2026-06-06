from sqlalchemy import Column, Integer, String, ForeignKey
from app.database.db import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(100), unique=True, nullable=False)

    password = Column(String(255), nullable=False)

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )