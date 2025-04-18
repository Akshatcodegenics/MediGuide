import React, { useEffect, useRef, useState } from "react";
import { Hospital } from "@/types";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Compass, Locate, Layers, MoveHorizontal, Navigation } from "lucide-react";
import { motion } from "framer-motion";

// Mock locations for hospitals with more accurate coordinates
const hospitalLocations: Record<number, {lat: number, lng: number}> = {
  1: {lat: 28.6139, lng: 77.2090}, // Apollo Delhi
  2: {lat: 19.0760, lng: 72.8777}, // Fortis Mumbai
  5: {lat: 28.5672, lng: 77.2100}, // AIIMS Delhi
};

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVtby11c2VyIiwiYSI6ImNrZzVvN2EyNTA5bmwyeG11OWg1NGY5OTYifQ.JVG_vlk4_G1LYUc4QvlzYg';

interface MapTabProps {
  hospital: Hospital;
}

export const MapTab: React.FC<MapTabProps> = ({ hospital }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapStyle, setMapStyle] = useState<string>('streets-v11');
  const [showNearby, setShowNearby] = useState<boolean>(false);
  const maxDistance = 100; // Maximum distance in kilometers
  
  const styles = {
    'streets-v11': 'Street View',
    'satellite-v9': 'Satellite',
    'light-v11': 'Light Mode',
    'dark-v11': 'Dark Mode',
    'outdoors-v12': 'Outdoors'
  };

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${mapStyle}`,
        center: [location.lng, location.lat],
        zoom: 12, // Increased zoom level for better visibility
        pitchWithRotate: true,
        pitch: 45, // Added pitch for better 3D view
      });

      // Add navigation controls with more options
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
          showZoom: true,
          showCompass: true
        }), 
        'bottom-right'
      );

      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
      
      // Add marker for the hospital with custom popup
      new mapboxgl.Marker({ 
        color: "#8b5cf6",
        scale: 1.2 // Slightly larger marker
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup({
          offset: 25,
          closeButton: false,
          className: 'custom-popup'
        }).setHTML(`
          <div class="bg-white p-3 rounded-lg shadow-lg">
            <h3 class="font-bold text-purple-600 mb-1">${hospital.name}</h3>
            <p class="text-sm text-gray-600">${hospital.address || 'Address not available'}</p>
            ${hospital.contact ? `<p class="text-sm text-blue-600 mt-1">${hospital.contact}</p>` : ''}
          </div>
        `))
        .addTo(map.current);
    }
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [hospital, mapStyle]);
  
  useEffect(() => {
    if (!map.current || !showNearby) return;
    
    const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
    
    // Add nearby place markers when showNearby is toggled on
    const addNearbyMarkers = () => {
      if (!map.current) return;
      
      // Sample nearby places within 100km radius
      const generateRandomLocation = (baseLat: number, baseLng: number, maxDistanceKm: number) => {
        // Convert distance to degrees (approximately)
        const maxDegrees = maxDistanceKm / 111; // 1 degree ≈ 111km
        const randomDistance = Math.random() * maxDegrees;
        const randomAngle = Math.random() * 2 * Math.PI;
        
        return {
          lat: baseLat + (randomDistance * Math.cos(randomAngle)),
          lng: baseLng + (randomDistance * Math.sin(randomAngle))
        };
      };
      
      const nearbyPlaces = [
        // Pharmacies (within 100km)
        ...Array(3).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance);
          return {
            type: 'pharmacy',
            name: `City Pharmacy ${i + 1}`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#10b981',
            distance: Math.round(Math.random() * maxDistance)
          };
        }),
        // Hotels (within 100km)
        ...Array(3).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance);
          return {
            type: 'hotel',
            name: `Hotel ${i + 1}`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#3b82f6',
            distance: Math.round(Math.random() * maxDistance)
          };
        }),
        // Food places (within 100km)
        ...Array(3).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance);
          return {
            type: 'food',
            name: `Restaurant ${i + 1}`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#f97316',
            distance: Math.round(Math.random() * maxDistance)
          };
        })
      ];
      
      // Create a bounds object to fit all markers
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([location.lng, location.lat]);
      
      nearbyPlaces.forEach(place => {
        bounds.extend([place.lng, place.lat]);
        
        new mapboxgl.Marker({ color: place.color })
          .setLngLat([place.lng, place.lat])
          .setPopup(new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: 'custom-popup'
          }).setHTML(`
            <div class="bg-white p-3 rounded-lg shadow-lg">
              <h3 class="font-bold mb-1">${place.name}</h3>
              <p class="text-sm text-gray-600">${place.type.charAt(0).toUpperCase() + place.type.slice(1)}</p>
              <p class="text-sm text-blue-600 mt-1">${place.distance}km from hospital</p>
            </div>
          `))
          .addTo(map.current!);
      });
      
      // Fit map to show all markers with padding
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 12
      });
    };
    
    addNearbyMarkers();
    
  }, [hospital, showNearby]);
  
  const changeMapStyle = (style: string) => {
    setMapStyle(style);
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`);
    }
  };
  
  const findNearbyHospitals = () => {
    if (!map.current) return;
    
    const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
    
    // In a real app, this would be an API call to find nearby hospitals
    const nearbyHospitals = [
      { id: 101, name: "City General Hospital", lat: location.lat + 0.02, lng: location.lng + 0.03, distance: "5.2 km" },
      { id: 102, name: "Community Health Center", lat: location.lat - 0.03, lng: location.lng - 0.01, distance: "7.8 km" },
      { id: 103, name: "Metro Medical Center", lat: location.lat + 0.01, lng: location.lng - 0.04, distance: "9.1 km" },
    ];
    
    // First, fit bounds to show all markers
    const bounds = new mapboxgl.LngLatBounds();
    
    // Add the current hospital
    bounds.extend([location.lng, location.lat]);
    
    // Add markers for nearby hospitals
    nearbyHospitals.forEach(nearbyHospital => {
      bounds.extend([nearbyHospital.lng, nearbyHospital.lat]);
      
      new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([nearbyHospital.lng, nearbyHospital.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div style="padding: 8px;">
            <h3 style="font-weight: bold; margin-bottom: 5px;">${nearbyHospital.name}</h3>
            <p style="font-size: 12px; margin: 0;">${nearbyHospital.distance} from ${hospital.name}</p>
          </div>
        `))
        .addTo(map.current!);
    });
    
    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 12
    });
  };
  
  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
        <p className="text-gray-600">
          {hospital.name} is located at <span className="font-medium">{hospital.address}</span>.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowNearby(!showNearby)}
          className={showNearby ? "bg-blue-100" : ""}
        >
          <Compass className="mr-2 h-4 w-4" />
          {showNearby ? "Hide Nearby Places" : "Show Nearby Places"}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={findNearbyHospitals}
        >
          <MoveHorizontal className="mr-2 h-4 w-4" />
          Nearby Hospitals
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            if (map.current) {
              const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
              map.current.flyTo({
                center: [location.lng, location.lat],
                zoom: 14,
                essential: true
              });
            }
          }}
        >
          <Locate className="mr-2 h-4 w-4" />
          Reset View
        </Button>
        
        <div className="relative ml-auto">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const dropdown = document.getElementById('map-style-dropdown');
              if (dropdown) {
                dropdown.classList.toggle('hidden');
              }
            }}
          >
            <Layers className="mr-2 h-4 w-4" />
            Map Style
          </Button>
          <div id="map-style-dropdown" className="hidden absolute right-0 mt-1 bg-white rounded-md shadow-lg z-10 border">
            <div className="py-1">
              {Object.entries(styles).map(([styleId, styleName]) => (
                <button
                  key={styleId}
                  className={`block px-4 py-2 text-sm text-left w-full hover:bg-gray-100 ${mapStyle === styleId ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}`}
                  onClick={() => {
                    changeMapStyle(styleId);
                    document.getElementById('map-style-dropdown')?.classList.add('hidden');
                  }}
                >
                  {styleName}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div 
        ref={mapContainer} 
        className="h-[500px] rounded-lg shadow-md overflow-hidden border border-gray-200" 
      />
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <span>Use two fingers to zoom and pan</span>
        <span>Map data © Mapbox</span>
      </div>
    </motion.div>
  );
};
