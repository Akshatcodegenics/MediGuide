
import React, { useEffect, useRef } from "react";
import { Hospital } from "@/types";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mock locations for hospitals
const hospitalLocations: Record<number, {lat: number, lng: number}> = {
  1: {lat: 28.6139, lng: 77.2090}, // Apollo Delhi
  2: {lat: 19.0760, lng: 72.8777}, // Fortis Mumbai
  5: {lat: 28.5672, lng: 77.2100}, // AIIMS Delhi
};

// For demo purposes. In a real application, this would be stored in environment variables
// or fetched from a server-side API
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrZzVvN2EyNTA5bmwyeG11OWg1NGY5OTYifQ.JVG_vlk4_G1LYUc4QvlzYg';

interface MapTabProps {
  hospital: Hospital;
}

export const MapTab: React.FC<MapTabProps> = ({ hospital }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom: 14
      });

      map.current.addControl(new mapboxgl.NavigationControl());
      
      // Add marker for the hospital
      new mapboxgl.Marker({ color: "#8b5cf6" })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${hospital.name}</h3>`))
        .addTo(map.current);
      
      return () => {
        map.current?.remove();
        map.current = null;
      };
    }
  }, [hospital]);

  return (
    <div className="space-y-4">
      <p className="text-gray-600">
        {hospital.name} is located at {hospital.address}.
      </p>
      <div ref={mapContainer} className="h-[400px] rounded-lg shadow-md" />
    </div>
  );
};
