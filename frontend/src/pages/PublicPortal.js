import RequestForm from './PublicPortalLogin';
import TrackCollection from './TrackCollection';
import { Link } from 'react-router-dom';

export default function PublicPortal() {
  return (
    <div className="container">
      <h1>Public Portal</h1>
      <div className="card">
        <h3>Stats</h3>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="card" style={{ textAlign: 'center' }}>1 Ton<br/>Waste Recycled</div>
          <div className="card" style={{ textAlign: 'center' }}>1M<br/>Users</div>
          <div className="card" style={{ textAlign: 'center' }}>70%<br/>Recycled</div>
        </div>
      </div>

      <div className="card">
        <h3>Request Pickup</h3>
        <p>If you are a public user, please <Link to="/public-login">login with mobile + Aadhaar + OTP</Link> to request a pickup.</p>
      </div>

      <TrackCollection />
    </div>
  );
}
