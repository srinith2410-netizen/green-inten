// Initialize the map
var map = L.map('map').setView([13.0827, 80.2707], 12);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Function to get suggestion based on source
function getSuggestion(source) {
  if (source === 'traffic') return 'Promote EV buses and carpooling';
  if (source === 'industry') return 'Implement cleaner technologies';
  if (source === 'construction') return 'Use low-emission materials';
  if (source === 'high energy usage') return 'Switch to renewable energy';
  return 'Reduce emissions';
}

// Fetch hotspots and add to map
function loadHotspots() {
    fetch('http://localhost:5000/api/hotspots')
    .then(res => res.json())
    .then(data => {
        // Clear existing layers if needed, but for simplicity, assume reload page or handle
        // Add heatmap
        var heatPoints = data.map(h => [h.lat, h.lon, h.score / 100]);  // Assuming score normalized
        L.heatLayer(heatPoints, { radius: 25, blur: 15, maxZoom: 10 }).addTo(map);

        // Add markers with popups
        data.forEach(h => {
            var marker = L.marker([h.lat, h.lon]).addTo(map);
            marker.bindPopup(`
                <div>
                    <h3>${h.location}</h3>
                    <p><strong>Source:</strong> ${h.source || 'traffic'}</p>
                    <p><strong>Pollution Level:</strong> ${h.pollution}</p>
                    <p><strong>Traffic Density:</strong> ${h.traffic}</p>
                    <p><strong>Emission Score:</strong> ${h.score.toFixed(2)}</p>
                    <p><strong>Suggestion:</strong> ${h.recommendation}</p>
                </div>
            `);
        });
    })
    .catch(err => console.error('Error fetching hotspots:', err));
}

loadHotspots();

// Handle report form
document.getElementById('pollution-report').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        location_name: document.getElementById('location-name').value,
        latitude: parseFloat(document.getElementById('lat').value),
        longitude: parseFloat(document.getElementById('lon').value),
        source_type: document.getElementById('source-type').value,
        traffic_density: parseInt(document.getElementById('traffic-density').value) || 0,
        pollution_level: parseFloat(document.getElementById('pollution-level').value) || 0
    };

    fetch('http://localhost:5000/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
        alert('Report submitted successfully!');
        // Optionally reload hotspots
        location.reload();
    })
    .catch(err => console.error('Error submitting report:', err));
});
