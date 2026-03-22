export default function TrackCollection() {
  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Waste Collection Stats</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 16 }}>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>1 Ton</h2>
          <p>Waste Recycled</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>1M</h2>
          <p>Users</p>
        </div>
        <div className="card" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2>70%</h2>
          <p>Waste Recycled in India</p>
        </div>
      </div>
    </div>
  );
}
