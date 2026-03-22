from flask import Blueprint, request, jsonify
from models import db, EmissionHotspot
from datetime import datetime

emission_bp = Blueprint('emission', __name__)

@emission_bp.route('/report', methods=['POST'])
def report_emission():
    data = request.get_json()
    # Assume data has location_name, lat, lon, source_type, pollution_level, traffic_density
    hotspot = EmissionHotspot(
        location_name=data['location_name'],
        latitude=data['latitude'],
        longitude=data['longitude'],
        traffic_density=data.get('traffic_density', 0),
        pollution_level=data.get('pollution_level', 0.0),
        source_type=data['source_type']
    )
    db.session.add(hotspot)
    db.session.commit()
    return jsonify({'message': 'Report submitted', 'id': hotspot.id})