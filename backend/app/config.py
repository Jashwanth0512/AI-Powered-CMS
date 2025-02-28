import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

class Config:
    """Configuration settings for Flask app"""
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret")
    SQLALCHEMY_DATABASE_URI = os.getenv("DB_URI", "sqlite:///database.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET", "default_jwt_secret")
    DEBUG = os.getenv("DEBUG", "False").lower() in ["true", "1"]

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False

config_options = {
    "development": DevelopmentConfig,
    "production": ProductionConfig
}
