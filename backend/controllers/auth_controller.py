from flask import Blueprint, request, jsonify
from datetime import datetime
from backend.models import db, User, OTP
from backend.utils.otp_utils import generate_otp, otp_expiry

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.json or {}
    name = data.get('name')
    aadhar = data.get('aadhar')
    mobile = data.get('mobile')
    gender = data.get('gender')
    location = data.get('location')
    category = data.get('category')
    preferred_language = data.get('preferred_language', 'en')

    if not all([name, aadhar, mobile, category]):
        return jsonify({'error': 'Missing required fields'}), 400

    existing = User.query.filter_by(mobile=mobile).first()
    if existing:
        return jsonify({'error': 'Mobile already registered'}), 400

    user = User(name=name, aadhar=aadhar, mobile=mobile, gender=gender,
                location=location, category=category, preferred_language=preferred_language,
                registered_at=datetime.utcnow(), active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({'message': 'Registered', 'user_id': user.id}), 201


@auth_bp.route('/request-otp', methods=['POST'])
def request_otp():
    data = request.json or {}
    mobile = data.get('mobile')
    if not mobile:
        return jsonify({'error': 'mobile required'}), 400

    code = generate_otp()
    expires = otp_expiry()
    otp = OTP(mobile=mobile, code=code, expires_at=expires)
    db.session.add(otp)
    db.session.commit()

    # In production: send SMS. For prototype, return code in response.
    return jsonify({'message': 'OTP generated', 'otp': code}), 200


@auth_bp.route('/verify-otp', methods=['POST'])
def verify_otp():
    data = request.json or {}
    mobile = data.get('mobile')
    code = data.get('code')
    if not all([mobile, code]):
        return jsonify({'error': 'mobile and code required'}), 400

    otp = OTP.query.filter_by(mobile=mobile, code=code).order_by(OTP.expires_at.desc()).first()
    if not otp:
        return jsonify({'error': 'invalid otp'}), 400
    if otp.expires_at < datetime.utcnow():
        return jsonify({'error': 'otp expired'}), 400

    # Mark user active if exists and update last_active
    user = User.query.filter_by(mobile=mobile).first()
    if user:
        user.last_active = datetime.utcnow()
        db.session.commit()
        return jsonify({'message': 'verified', 'user_id': user.id, 'category': user.category}), 200

    return jsonify({'message': 'verified, but user not found'}), 200
