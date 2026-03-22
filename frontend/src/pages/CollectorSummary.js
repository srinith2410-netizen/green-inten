import { useState, useEffect } from 'react';
import GoogleMapView from './GoogleMapView';

export default function CollectorSummary() {
  const thisMonthKg = 1200;
  const lastMonthKg = 600;
  const thisMonthMoney = 12000;
  const lastMonthMoney = 6000;

  const [radius, setRadius] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
  }, []);

  return (
    <div className="container">
      <h1>Collector Summary</h1>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>{thisMonthKg} kg</h2>
          <p>Collected This Month</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>₹{thisMonthMoney}</h2>
          <p>Earnings This Month</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>{lastMonthKg} kg</h2>
          <p>Collected Last Month</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>₹{lastMonthMoney}</h2>
          <p>Earnings Last Month</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>Pick Requests Nearby</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="button" onClick={() => setRadius(1)}>1 km</button>
          <button className="button" onClick={() => setRadius(2)}>2 km</button>
          <button className="button" onClick={() => setRadius(3)}>3 km</button>
        </div>
      </div>

      {radius && userLocation && (
        <div style={{ marginTop: 16 }}>
          <GoogleMapView userLocation={userLocation} radius={radius} />
        </div>
      )}
    </div>
  );
}
