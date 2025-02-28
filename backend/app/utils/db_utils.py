from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def get_db_session():
    """Return a new database session."""
    return db.session

def init_db(app):
    """Initialize the database with Flask app."""
    db.init_app(app)
    with app.app_context():
        db.create_all()
