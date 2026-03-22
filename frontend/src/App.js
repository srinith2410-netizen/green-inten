import React, { useState, useEffect } from "react";
import MapComponent from "./MapComponent";
import HotspotList from "./HotspotList";
import FilterPanel from "./FilterPanel";
import hotspotsData from "./data";
import "./App.css";

function App() {
  const [hotspots] = useState(hotspotsData);
  const [filteredHotspots, setFilteredHotspots] = useState(hotspotsData);
  const [center, setCenter] = useState([13.0827, 80.2707]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    traffic: true,
    industrial: true,
    residential: true
  });

  useEffect(() => {
    const filtered = hotspots.filter(spot => {
      const matchesFilter = filters[spot.emissionCause];
      const matchesSearch = spot.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
    setFilteredHotspots(filtered);
  }, [hotspots, filters, searchTerm]);

  const handleHotspotClick = (hotspot) => {
    setCenter([hotspot.lat, hotspot.lng]);
  };

  const handleSearch = () => {
    const found = hotspots.find(spot => spot.name.toLowerCase() === searchTerm.toLowerCase());
    if (found) {
      setCenter([found.lat, found.lng]);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌿 Urban Emission Hotspot Detector</h1>
        <p>Smart City Environmental Monitoring Dashboard</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search hotspot by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="main-content">
        <div className="map-section">
          <MapComponent
            hotspots={hotspots}
            filteredHotspots={filteredHotspots}
            center={center}
            onHotspotClick={handleHotspotClick}
          />
        </div>

        <div className="sidebar">
          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />
          <HotspotList hotspots={filteredHotspots} onHotspotClick={handleHotspotClick} />

          <div className="data-sources">
            <h3>Data Sources</h3>
            <ul>
              <li>CPCB Air Quality Data</li>
              <li>OpenStreetMap Traffic Density</li>
              <li>Satellite Pollution Datasets</li>
              <li>Field Observations</li>
            </ul>
          </div>

          <div className="solutions-panel">
            <h3>Sustainability Solutions</h3>
            <ul>
              <li>🚗 EV Charging Infrastructure</li>
              <li>🚌 Improved Public Transport</li>
              <li>🚴 Dedicated Cycling Lanes</li>
              <li>🌳 Urban Tree Planting</li>
              <li>🚦 Smart Traffic Signal Optimization</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

