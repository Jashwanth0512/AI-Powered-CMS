from . import db
from datetime import datetime

class Analytics(db.Model):
    __tablename__ = 'analytics'
    
    id = db.Column(db.Integer, primary_key=True)
    content_id = db.Column(db.Integer, db.ForeignKey('content.id'), nullable=False)
    views = db.Column(db.Integer, default=0)
    shares = db.Column(db.Integer, default=0)
    engagement_score = db.Column(db.Float, default=0.0)  # AI-generated metric
    last_updated = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    content = db.relationship('Content', backref=db.backref('analytics', uselist=False))

    def __init__(self, content_id, views=0, shares=0, engagement_score=0.0):
        self.content_id = content_id
        self.views = views
        self.shares = shares
        self.engagement_score = engagement_score

    def update_engagement_score(self):
        """AI-powered engagement calculation: (views * 0.5 + shares * 2)."""
        self.engagement_score = (self.views * 0.5) + (self.shares * 2)

    def to_dict(self):
        return {
            "id": self.id,
            "content_id": self.content_id,
            "views": self.views,
            "shares": self.shares,
            "engagement_score": self.engagement_score,
            "last_updated": self.last_updated.isoformat()
        }
