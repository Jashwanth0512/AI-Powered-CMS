import jwt
import bcrypt
import os
from datetime import datetime, timedelta
from flask import current_app

SECRET_KEY = os.getenv("JWT_SECRET", "default_secret")

def hash_password(password: str) -> str:
    """Hash password using bcrypt."""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode(), salt).decode()

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify password against hashed password."""
    return bcrypt.checkpw(password.encode(), hashed_password.encode())

def create_access_token(user_id: int, role: str, expires_in=24):
    """Create a JWT access token with expiration."""
    payload = {
        "user_id": user_id,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=expires_in)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def decode_access_token(token: str):
    """Decode JWT token and return user data or None if invalid."""
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None

def refresh_access_token(token: str):
    """Refresh JWT access token before expiry."""
    decoded_token = decode_access_token(token)
    if decoded_token:
        return create_access_token(decoded_token["user_id"], decoded_token["role"])
    return None
