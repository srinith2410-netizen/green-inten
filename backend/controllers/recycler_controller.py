from flask import Blueprint, request, jsonify
from backend.models import db, RecyclerData, User

recycler_bp = Blueprint('recycler', __name__)


@recycler_bp.route('/update-demand', methods=['POST'])
def update_demand():
    data = request.json or {}
    user_id = data.get('user_id')
    demand = bool(data.get('demand', False))
    location = data.get('location')
    latitude = data.get('latitude')
    longitude = data.get('longitude')

    if not user_id:
        return jsonify({'error': 'user_id required'}), 400

    rd = RecyclerData.query.filter_by(user_id=user_id).first()
    if not rd:
        rd = RecyclerData(user_id=user_id, demand=demand, location=location, latitude=latitude, longitude=longitude)
        db.session.add(rd)
    else:
        rd.demand = demand
        rd.location = location
        rd.latitude = latitude
        rd.longitude = longitude

    db.session.commit()
    return jsonify({'message': 'updated'}), 200


@recycler_bp.route('/list', methods=['GET'])
def list_recyclers():
    rs = RecyclerData.query.all()
    out = []
    for r in rs:
        user = User.query.get(r.user_id)
        out.append({'user_id': r.user_id, 'name': user.name if user else None, 'demand': r.demand, 'location': r.location, 'latitude': r.latitude, 'longitude': r.longitude})
    return jsonify(out)
