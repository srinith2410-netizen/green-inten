from flask import Blueprint, request, jsonify
from backend.models import db, User, RecycledRecord, MaterialRate
from datetime import datetime

collector_bp = Blueprint('collector', __name__)


@collector_bp.route('/materials', methods=['GET'])
def materials():
    rates = MaterialRate.query.all()
    return jsonify([{'material': r.material, 'rate_per_kg': r.rate_per_kg} for r in rates])


@collector_bp.route('/recycled/add', methods=['POST'])
def add_recycled():
    data = request.json or {}
    collector_id = data.get('collector_id')
    kg = float(data.get('kg', 0))
    material = data.get('material', 'mixed')

    if not collector_id or kg <= 0:
        return jsonify({'error': 'collector_id and positive kg required'}), 400

    rec = RecycledRecord(collector_id=collector_id, kg=kg, material=material, timestamp=datetime.utcnow())
    db.session.add(rec)
    db.session.commit()

    return jsonify({'message': 'record added', 'id': rec.id}), 201


@collector_bp.route('/collector/total/<int:collector_id>', methods=['GET'])
def collector_total(collector_id):
    total = db.session.query(db.func.sum(RecycledRecord.kg)).filter(RecycledRecord.collector_id == collector_id).scalar() or 0.0
    return jsonify({'collector_id': collector_id, 'total_kg': float(total)})
