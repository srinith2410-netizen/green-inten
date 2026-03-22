import React from "react";

function HotspotList({ hotspots }) {
  return (
    <div className="hotspot-list">
      <h2>Emission Hotspots</h2>
      {hotspots && hotspots.map((spot, index) => (
        <div key={index} className="hotspot-card">
          <h3>{spot.name}</h3>
          <p>Pollution Level: {spot.pollutionLevel}</p>
          <p>Cause: {spot.emissionSource}</p>
        </div>
      ))}
    </div>
  );
}

export default HotspotList;