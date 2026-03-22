from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route("/api/pollution/<city>")
def pollution(city):
    """
    Note: OpenAQ v1/v2 APIs are retired. For production use, sign up for OpenAQ v3 API key.
    This endpoint now returns mock pollution data for demonstration purposes.
    """

    # Mock pollution data for Chennai locations (simulating PM2.5 readings)
    mock_data = [
        {"name": "T. Nagar", "lat": 13.0418, "lng": 80.2337, "pollution": 85, "parameter": "pm25"},
        {"name": "Guindy", "lat": 13.0067, "lng": 80.2206, "pollution": 92, "parameter": "pm25"},
        {"name": "Velachery", "lat": 12.9759, "lng": 80.2212, "pollution": 78, "parameter": "pm25"},
        {"name": "Adyar", "lat": 13.0064, "lng": 80.2575, "pollution": 110, "parameter": "pm25"},
        {"name": "Anna Nagar", "lat": 13.0850, "lng": 80.2101, "pollution": 95, "parameter": "pm25"},
        {"name": "Kodambakkam", "lat": 13.0521, "lng": 80.2255, "pollution": 88, "parameter": "pm25"},
        {"name": "Nungambakkam", "lat": 13.0604, "lng": 80.2425, "pollution": 102, "parameter": "pm25"},
        {"name": "Royapettah", "lat": 13.0554, "lng": 80.2661, "pollution": 115, "parameter": "pm25"},
        {"name": "Mylapore", "lat": 13.0368, "lng": 80.2676, "pollution": 98, "parameter": "pm25"},
        {"name": "Triplicane", "lat": 13.0588, "lng": 80.2756, "pollution": 105, "parameter": "pm25"},
        {"name": "Thousand Lights", "lat": 13.0615, "lng": 80.2544, "pollution": 120, "parameter": "pm25"},
        {"name": "Purasawalkam", "lat": 13.0878, "lng": 80.2544, "pollution": 90, "parameter": "pm25"},
        {"name": "Vepery", "lat": 13.0892, "lng": 80.2750, "pollution": 82, "parameter": "pm25"},
        {"name": "Perambur", "lat": 13.1217, "lng": 80.2327, "pollution": 125, "parameter": "pm25"},
        {"name": "Kolathur", "lat": 13.1242, "lng": 80.2121, "pollution": 95, "parameter": "pm25"}
    ]

    # Add some randomization to simulate real-time data
    import random
    for item in mock_data:
        # Add small random variation (±10) to simulate changing conditions
        variation = random.randint(-10, 10)
        item["pollution"] = max(50, min(150, item["pollution"] + variation))

    return jsonify(mock_data)

if __name__ == "__main__":
    app.run(debug=True)


if __name__ == "__main__":
    app.run(debug=True)
