import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Waste Management</h3>
      </div>
      <div>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/collector">Collector</Link>
        <Link to="/public">Public</Link>
        <Link to="/track-collection">Track</Link>
      </div>
    </nav>
  );
}
