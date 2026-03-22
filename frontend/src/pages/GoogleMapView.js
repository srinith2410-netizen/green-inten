import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length > 0) {
      const heat = L.heatLayer(points, { radius: 25, blur: 15, maxZoom: 10 }).addTo(map);
      return () => {
        if (map.hasLayer(heat)) map.removeLayer(heat);
      };
    }
  }, [map, points]);

  return null;
}

function getSuggestion(source) {
  if (source === 'traffic') return 'Promote EV buses and carpooling';
  if (source === 'industry') return 'Implement cleaner technologies';
  if (source === 'construction') return 'Use low-emission materials';
  if (source === 'high energy usage') return 'Switch to renewable energy';
  return 'Reduce emissions';
}

export default function GoogleMapView() {
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    fetch('/api/hotspots')
      .then(res => res.json())
      .then(data => setHotspots(data));
  }, []);

  const heatPoints = hotspots.map(h => [h.latitude, h.longitude, h.pollution_level]);

  return (
    <div>
      <h2>Emission Hotspots in Chennai</h2>
      <MapContainer center={[13.0827, 80.2707]} zoom={12} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap'
        />
        <HeatmapLayer points={heatPoints} />
        {hotspots.map(h => (
          <Marker key={h.id} position={[h.latitude, h.longitude]}>
            <Popup>
              <div>
                <h3>{h.location_name}</h3>
                <p><strong>Source:</strong> {h.source_type}</p>
                <p><strong>Pollution Level:</strong> {h.pollution_level}</p>
                <p><strong>Traffic Density:</strong> {h.traffic_density}</p>
                <p><strong>Suggestion:</strong> {getSuggestion(h.source_type)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
