from flask import Blueprint, jsonify
from utils.data_processor import load_and_process_data, add_recommendations
from utils.heatmap_generator import generate_heatmap_data

hotspot_bp = Blueprint('hotspot', __name__)

@hotspot_bp.route('/hotspots', methods=['GET'])
def get_hotspots():
    hotspots = load_and_process_data()
    hotspots = add_recommendations(hotspots)
    return jsonify(hotspots)

@hotspot_bp.route('/heatmap-data', methods=['GET'])
def get_heatmap_data():
    hotspots = load_and_process_data()
    heat_data = generate_heatmap_data(hotspots)
    return jsonify(heat_data)

@hotspot_bp.route('/dashboard-stats', methods=['GET'])
def get_dashboard_stats():
    hotspots = load_and_process_data()
    if not hotspots:
        return jsonify({'total_hotspots': 0, 'avg_emission': 0, 'top_area': 'None'})

    total = len(hotspots)
    avg_emission = sum(h['score'] for h in hotspots) / total
    top_area = max(hotspots, key=lambda x: x['score'])['location']

    return jsonify({
        'total_hotspots': total,
        'avg_emission': round(avg_emission, 2),
        'top_area': top_area
    })