import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const handleCollectorLogin = () => navigate('/collector-summary');

  return (
    <div className="container">
      <h1>Welcome to Waste Management Portal</h1>

      <div className="card">
        <h2>Track Waste Collection</h2>
        <p>Manage, recycle, and track waste efficiently in your city.</p>
        <Link to="/track-collection" className="button">View Stats</Link>
      </div>

      <div className="card">
        <h2>Collector Portal</h2>
        <p>Login to view your collection, earnings, and start navigation.</p>
        <button className="button" onClick={handleCollectorLogin}>Login</button>
      </div>

      <div className="card">
        <h2>Recycler Portal</h2>
        <p>Update demand, kg recycled, and location easily.</p>
        <Link to="/recycler" className="button">Login</Link>
      </div>

      <div className="card">
        <h2>Public Portal</h2>
        <p>See total waste collected, send payments, and search by area.</p>
        <Link to="/public" className="button">Enter Portal</Link>
      </div>
    </div>
  );
}
