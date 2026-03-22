import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.heat";
import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

const getMarkerColor = (pollutionLevel) => {
  if (pollutionLevel <= 50) return "green";
  if (pollutionLevel <= 100) return "yellow";
  return "red";
};

const createCustomIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

function HeatmapLayer({ hotspots }) {
  const map = useMap();

  useEffect(() => {
    if (!hotspots || hotspots.length === 0) return;

    const heatPoints = hotspots.map(spot => [
      spot.lat,
      spot.lng,
      spot.pollutionLevel
    ]);

    const heatLayer = L.heatLayer(heatPoints, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: {
        0.2: "green",
        0.4: "yellow",
        0.6: "orange",
        0.8: "red"
      }
    });

    heatLayer.addTo(map);

    return () => {
      if (map.hasLayer(heatLayer)) {
        map.removeLayer(heatLayer);
      }
    };
  }, [hotspots, map]);

  return null;
}

function MapComponent({ hotspots, filteredHotspots, center, onHotspotClick }) {
  const [markerClusterGroup, setMarkerClusterGroup] = useState(null);

  useEffect(() => {
    if (markerClusterGroup) {
      markerClusterGroup.clearLayers();
      filteredHotspots.forEach(spot => {
        const marker = L.marker([spot.lat, spot.lng], {
          icon: createCustomIcon(getMarkerColor(spot.pollutionLevel))
        });
        marker.bindPopup(`
          <b>${spot.name}</b><br/>
          Pollution Level: ${spot.pollutionLevel}<br/>
          Cause: ${spot.emissionCause}<br/>
          Solution: ${spot.suggestedSolution}
        `);
        marker.on('click', () => onHotspotClick(spot));
        markerClusterGroup.addLayer(marker);
      });
    }
  }, [filteredHotspots, markerClusterGroup, onHotspotClick]);

  return (
    <MapContainer
      center={center}
      zoom={12}
      style={{ height: "500px", width: "100%" }}
      whenCreated={(map) => {
        const mcg = L.markerClusterGroup();
        map.addLayer(mcg);
        setMarkerClusterGroup(mcg);
      }}
    >
      <ChangeMapView center={center} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer hotspots={filteredHotspots} />
    </MapContainer>
  );
}

export default MapComponent;