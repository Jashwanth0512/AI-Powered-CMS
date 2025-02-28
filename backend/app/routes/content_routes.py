from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.content import Content
from ..extensions import db
from ..utils.ai_utils import AIContentGenerator

content_bp = Blueprint('content', __name__)
ai_generator = AIContentGenerator()

@content_bp.route('/', methods=['GET'])
@jwt_required()
def get_all_content():
    user_id = get_jwt_identity()['id']
    contents = Content.query.filter_by(author_id=user_id).all()
    return jsonify([c.to_dict() for c in contents]), 200

@content_bp.route('/', methods=['POST'])
@jwt_required()
def create_content():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    
    if data.get('generate_with_ai'):
        content_body = ai_generator.generate_content(data['prompt'])
    else:
        content_body = data.get('body', '')
    
    new_content = Content(
        title=data['title'],
        body=content_body,
        author_id=user_id
    )
    db.session.add(new_content)
    db.session.commit()
    return jsonify(new_content.to_dict()), 201

@content_bp.route('/<int:content_id>', methods=['PUT'])
@jwt_required()
def update_content(content_id):
    content = Content.query.get_or_404(content_id)
    user_id = get_jwt_identity()['id']
    
    if content.author_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.get_json()
    content.title = data.get('title', content.title)
    content.body = data.get('body', content.body)
    db.session.commit()
    return jsonify(content.to_dict()), 200

@content_bp.route('/<int:content_id>', methods=['DELETE'])
@jwt_required()
def delete_content(content_id):
    content = Content.query.get_or_404(content_id)
    user_id = get_jwt_identity()['id']
    
    if content.author_id != user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(content)
    db.session.commit()
    return jsonify({"message": "Content deleted"}), 200