from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from ..models.content import Content
from ..models.analytics import Analytics
from ..utils.ai_utils import AIContentGenerator

analytics_bp = Blueprint('analytics', __name__)
ai_generator = AIContentGenerator()

@analytics_bp.route('/seo-analyze', methods=['POST'])
@jwt_required()
def analyze_seo():
    data = request.get_json()
    text = data.get('text', '')
    analysis = ai_generator.analyze_seo(text)
    return jsonify(analysis), 200

@analytics_bp.route('/content-stats', methods=['GET'])
@jwt_required()
def content_statistics():
    total_content = Content.query.count()
    total_authors = User.query.count()
    most_active_author = User.query.join(Content).group_by(User.id).order_by(db.func.count().desc()).first()
    
    return jsonify({
        'total_content': total_content,
        'total_authors': total_authors,
        'most_active_author': most_active_author.email if most_active_author else None
    }), 200

@analytics_bp.route('/engagement/<int:content_id>', methods=['GET'])
@jwt_required()
def engagement_metrics(content_id):
    content = Content.query.get_or_404(content_id)
    analytics = Analytics.query.filter_by(content_id=content_id).first()
    
    return jsonify({
        'views': analytics.views if analytics else 0,
        'shares': analytics.shares if analytics else 0,
        'engagement_rate': analytics.engagement_rate if analytics else 0
    }), 200