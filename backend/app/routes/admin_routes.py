from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..models.user import User
from ..extensions import db

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def get_all_users():
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    users = User.query.all()
    return jsonify([{
        'id': u.id,
        'email': u.email,
        'role': u.role
    } for u in users]), 200

@admin_bp.route('/users/<int:user_id>/role', methods=['PUT'])
@jwt_required()
def update_user_role(user_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    user = User.query.get_or_404(user_id)
    data = request.get_json()
    if data['role'] not in ['admin', 'editor', 'author']:
        return jsonify({"error": "Invalid role"}), 400
    
    user.role = data['role']
    db.session.commit()
    return jsonify({"message": "Role updated successfully"}), 200

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@jwt_required()
def delete_user(user_id):
    current_user = get_jwt_identity()
    if current_user['role'] != 'admin':
        return jsonify({"error": "Unauthorized"}), 403
    
    if current_user['id'] == user_id:
        return jsonify({"error": "Cannot delete yourself"}), 400
    
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted successfully"}), 200