from . import db
from datetime import datetime

class Content(db.Model):
    __tablename__ = 'content'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    body = db.Column(db.Text, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    author = db.relationship('User', backref=db.backref('contents', lazy=True))

    def __init__(self, title, body, author_id):
        self.title = title
        self.body = body
        self.author_id = author_id

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "body": self.body,
            "author_id": self.author_id,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat() if self.updated_at else None
        }
