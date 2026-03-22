def generate_heatmap_data(hotspots):
    # Return list of [lat, lon, intensity]
    return [[h['lat'], h['lon'], h['score'] / 100] for h in hotspots]  # Normalize score