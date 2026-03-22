import pandas as pd
import os

def load_and_process_data():
    # Load data from CSV
    traffic_data = pd.read_csv(os.path.join(os.path.dirname(__file__), '..', 'datasets', 'traffic_data.csv'))

    # Calculate emission score
    traffic_data['score'] = 0.6 * traffic_data['traffic'] + 0.4 * traffic_data['pollution']

    # Sort and get top hotspots
    hotspots = traffic_data.sort_values(by='score', ascending=False).head(10)

    return hotspots.to_dict('records')

def get_recommendation(row):
    if row['traffic'] > 85:
        return 'Improve public transport and promote carpooling'
    elif row['pollution'] > 100:
        return 'Promote EV adoption and emission regulations'
    else:
        return 'Increase green cover and monitor air quality'

def add_recommendations(hotspots):
    for h in hotspots:
        h['recommendation'] = get_recommendation(h)
    return hotspots