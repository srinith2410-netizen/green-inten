// Dashboard functionality
function updateDashboard() {
    fetch('http://localhost:5000/api/dashboard-stats')
        .then(res => res.json())
        .then(data => {
            document.getElementById('total-hotspots').textContent = data.total_hotspots;
            document.getElementById('avg-emission').textContent = data.avg_emission;
            document.getElementById('top-area').textContent = data.top_area;
        })
        .catch(err => console.error('Error fetching dashboard stats:', err));
}

// Call on load
document.addEventListener('DOMContentLoaded', updateDashboard);