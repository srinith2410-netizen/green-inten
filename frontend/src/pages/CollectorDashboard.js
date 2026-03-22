import { useEffect, useState } from 'react';
import { getCollectorDashboard } from '../api';
import GoogleMapView from './GoogleMapView';

export default function CollectorDashboard() {
  const [dashboard, setDashboard] = useState({ kgCollected: 0, pricePerKg: 0 });
  const [radius, setRadius] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCollectorDashboard();
        setDashboard(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    navigator.geolocation.getCurrentPosition((pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
  }, []);

  return (
    <div className="container">
      <h1>Collector Dashboard</h1>
      <div className="card">
        <h2>Kg Collected: {dashboard.kgCollected}</h2>
        <h2>Price per Kg: ₹{dashboard.pricePerKg}</h2>
        <button className="button" onClick={() => alert('Start Navigation clicked!')}>Start Navigation</button>
      </div>

      <div className="card">
        <h3>Pick Requests Nearby</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button" onClick={() => setRadius(1)}>1 km</button>
          <button className="button" onClick={() => setRadius(2)}>2 km</button>
          <button className="button" onClick={() => setRadius(3)}>3 km</button>
        </div>
      </div>

      {radius && userLocation && <GoogleMapView userLocation={userLocation} radius={radius} />}
    </div>
  );
}
