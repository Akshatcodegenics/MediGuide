
import React, { useEffect, useRef, useState } from "react";
import { Hospital } from "@/types";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from "@/components/ui/button";
import { Compass, Locate, Layers, MoveHorizontal, Navigation, MapPin } from "lucide-react";
import { motion } from "framer-motion";

// Mock locations for hospitals with more accurate coordinates
const hospitalLocations: Record<number, {lat: number, lng: number}> = {
  1: {lat: 28.6139, lng: 77.2090}, // Apollo Delhi
  2: {lat: 19.0760, lng: 72.8777}, // Fortis Mumbai
  5: {lat: 28.5672, lng: 77.2100}, // AIIMS Delhi
  // Add more hospitals with accurate coordinates
  20: {lat: 23.0225, lng: 72.5714}, // Hospital in Ahmedabad
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
  const [mapLoaded, setMapLoaded] = useState<boolean>(false);
  const maxDistance = 100; // Maximum distance in kilometers
  
  const styles = {
    'streets-v11': 'Street View',
    'satellite-v9': 'Satellite',
    'light-v11': 'Light Mode',
    'dark-v11': 'Dark Mode',
    'outdoors-v12': 'Outdoors'
  };
  
  const searchParams = new URLSearchParams(window.location.search);
  const isMapTabLink = searchParams.get('mapTabLink') === 'true';

  useEffect(() => {
    if (mapContainer.current && !map.current) {
      const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${mapStyle}`,
        center: [location.lng, location.lat],
        zoom: 13, // Increased zoom level for better visibility
        pitchWithRotate: true,
        pitch: 50, // Added pitch for better 3D view
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
      const popupContent = `
        <div class="bg-white p-3 rounded-lg shadow-lg">
          <h3 class="font-bold text-purple-600 mb-1">${hospital.name}</h3>
          <p class="text-sm text-gray-600">${hospital.address || 'Address not available'}</p>
          ${hospital.contact ? `<p class="text-sm text-blue-600 mt-1">${hospital.contact}</p>` : ''}
          <div class="mt-2">
            <button class="text-xs bg-purple-600 text-white px-2 py-1 rounded">Book Appointment</button>
          </div>
        </div>
      `;
      
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'custom-popup'
      }).setHTML(popupContent);
      
      new mapboxgl.Marker({ 
        color: "#8b5cf6",
        scale: 1.5 // Larger marker for better visibility
      })
        .setLngLat([location.lng, location.lat])
        .setPopup(popup)
        .addTo(map.current);
      
      map.current.on('load', () => {
        setMapLoaded(true);
        
        if (isMapTabLink) {
          setShowNearby(true);
        }
        
        // Add 3D buildings for more visual appeal
        if (map.current) {
          map.current.addLayer({
            'id': '3d-buildings',
            'source': 'composite',
            'source-layer': 'building',
            'filter': ['==', 'extrude', 'true'],
            'type': 'fill-extrusion',
            'minzoom': 12,
            'paint': {
              'fill-extrusion-color': '#aaa',
              'fill-extrusion-height': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'height']
              ],
              'fill-extrusion-base': [
                'interpolate', ['linear'], ['zoom'],
                15, 0,
                15.05, ['get', 'min_height']
              ],
              'fill-extrusion-opacity': 0.6
            }
          });
        }
      });
    }
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [hospital, mapStyle]);
  
  useEffect(() => {
    if (!map.current || !showNearby || !mapLoaded) return;
    
    // Remove existing markers except the hospital marker
    const markers = document.querySelectorAll('.mapboxgl-marker:not(:first-child)');
    markers.forEach(marker => marker.remove());
    
    const location = hospitalLocations[hospital.id] || { lat: 28.6139, lng: 77.2090 };
    
    // Add nearby place markers when showNearby is toggled on
    const addNearbyMarkers = () => {
      if (!map.current) return;
      
      // Sample nearby places within maxDistance km radius
      const generateRandomLocation = (baseLat: number, baseLng: number, maxDistanceKm: number) => {
        // Convert distance to degrees (approximately)
        const maxDegrees = maxDistanceKm / 111; // 1 degree ≈ 111km
        const randomDistance = Math.random() * maxDegrees * 0.7; // Only use 70% of max distance for better visualization
        const randomAngle = Math.random() * 2 * Math.PI;
        
        return {
          lat: baseLat + (randomDistance * Math.cos(randomAngle)),
          lng: baseLng + (randomDistance * Math.sin(randomAngle))
        };
      };
      
      const nearbyPlaces = [
        // Pharmacies (within maxDistance km)
        ...Array(5).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance * 0.3); // Closer to hospital
          const distance = Math.round(Math.random() * maxDistance * 0.3);
          return {
            type: 'pharmacy',
            name: `City Pharmacy ${i + 1}`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#10b981',
            distance,
            rating: (3 + Math.random() * 2).toFixed(1),
            priceLevel: ['$', '$$', '$$$'][Math.floor(Math.random() * 3)]
          };
        }),
        // Hotels (within maxDistance km)
        ...Array(8).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance * 0.6);
          const distance = Math.round(Math.random() * maxDistance * 0.6);
          return {
            type: 'hotel',
            name: `Hotel ${['Grand', 'Royal', 'Comfort', 'Luxury', 'Budget', 'Premium', 'Elite', 'Star'][i]} Inn`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#3b82f6',
            distance,
            rating: (3 + Math.random() * 2).toFixed(1),
            priceLevel: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)]
          };
        }),
        // Food places (within maxDistance km)
        ...Array(10).fill(null).map((_, i) => {
          const pos = generateRandomLocation(location.lat, location.lng, maxDistance);
          const distance = Math.round(Math.random() * maxDistance);
          return {
            type: 'food',
            name: `${['Italian', 'Chinese', 'Indian', 'Mexican', 'Thai', 'Fast', 'Vegan', 'Seafood', 'Grill', 'Cafe'][i]} Restaurant`,
            lat: pos.lat,
            lng: pos.lng,
            color: '#f97316',
            distance,
            rating: (3 + Math.random() * 2).toFixed(1),
            priceLevel: ['$', '$$', '$$$', '$$$$'][Math.floor(Math.random() * 4)]
          };
        })
      ];
      
      // Create a bounds object to fit all markers
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend([location.lng, location.lat]);
      
      nearbyPlaces.forEach(place => {
        // Only show places within the selected maximum distance
        if (place.distance <= maxDistance) {
          bounds.extend([place.lng, place.lat]);
          
          // Create custom popup content based on place type
          let popupContent = `
            <div class="p-3 rounded-lg shadow-lg bg-white">
              <h3 class="font-bold mb-1">${place.name}</h3>
              <p class="text-sm text-gray-600">${place.type.charAt(0).toUpperCase() + place.type.slice(1)}</p>
              <div class="flex items-center mt-1">
                <span class="text-yellow-500 mr-2">★ ${place.rating}</span>
                <span class="text-purple-600">${place.distance}km</span>
              </div>
          `;
          
          // Add specific content based on place type
          if (place.type === 'food') {
            popupContent += `
              <p class="text-sm font-medium mt-1">${place.priceLevel} • Average cost per person</p>
            `;
          } else if (place.type === 'hotel') {
            popupContent += `
              <p class="text-sm font-medium mt-1">${place.priceLevel} • Per night</p>
            `;
          }
          
          popupContent += `
              <button class="text-xs bg-blue-600 text-white px-2 py-1 rounded mt-2">View Details</button>
            </div>
          `;
          
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: 'custom-popup'
          }).setHTML(popupContent);
          
          // Create and add marker
          new mapboxgl.Marker({ 
            color: place.color,
            scale: 0.8
          })
            .setLngLat([place.lng, place.lat])
            .setPopup(popup)
            .addTo(map.current!);
        }
      });
      
      // Fit map to show all markers with padding
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 13
      });
    };
    
    addNearbyMarkers();
    
  }, [hospital, showNearby, mapLoaded, maxDistance]);
  
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
      { id: 101, name: "City General Hospital", lat: location.lat + 0.02, lng: location.lng + 0.03, distance: "5.2 km", rating: 4.2 },
      { id: 102, name: "Community Health Center", lat: location.lat - 0.03, lng: location.lng - 0.01, distance: "7.8 km", rating: 3.9 },
      { id: 103, name: "Metro Medical Center", lat: location.lat + 0.01, lng: location.lng - 0.04, distance: "9.1 km", rating: 4.5 },
    ];
    
    // First, fit bounds to show all markers
    const bounds = new mapboxgl.LngLatBounds();
    
    // Add the current hospital
    bounds.extend([location.lng, location.lat]);
    
    // Remove existing hospital markers
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add marker for the current hospital
    new mapboxgl.Marker({ 
      color: "#8b5cf6",
      scale: 1.5
    })
      .setLngLat([location.lng, location.lat])
      .setPopup(new mapboxgl.Popup().setHTML(`
        <div class="p-3 bg-white rounded-lg">
          <h3 class="font-bold text-purple-600 mb-1">${hospital.name}</h3>
          <p class="text-sm text-gray-600">${hospital.address || 'Address not available'}</p>
          ${hospital.contact ? `<p class="text-sm text-blue-600 mt-1">${hospital.contact}</p>` : ''}
        </div>
      `))
      .addTo(map.current!);
    
    // Add markers for nearby hospitals
    nearbyHospitals.forEach(nearbyHospital => {
      bounds.extend([nearbyHospital.lng, nearbyHospital.lat]);
      
      new mapboxgl.Marker({ color: "#ef4444" })
        .setLngLat([nearbyHospital.lng, nearbyHospital.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <div class="p-3 bg-white rounded-lg">
            <h3 class="font-bold mb-1">${nearbyHospital.name}</h3>
            <div class="flex items-center text-sm">
              <span class="text-yellow-500 mr-2">★ ${nearbyHospital.rating}</span>
              <span class="text-blue-600">${nearbyHospital.distance} from ${hospital.name}</span>
            </div>
            <button class="text-xs bg-red-600 text-white px-2 py-1 rounded mt-2">View Hospital</button>
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
        <div className="flex items-center mb-2">
          <MapPin className="w-5 h-5 text-purple-600 mr-2" />
          <h2 className="text-lg font-medium">Hospital Location</h2>
        </div>
        <p className="text-gray-600">
          {hospital.name} is located at <span className="font-medium">{hospital.address}</span>.
          Explore nearby places within {maxDistance}km.
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
                zoom: 15,
                essential: true,
                pitch: 60,
                bearing: 30,
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
        className="h-[550px] rounded-lg shadow-md overflow-hidden border border-gray-200" 
      />
      
      <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
        <span>Use two fingers to zoom and pan</span>
        <span>Map data © Mapbox</span>
      </div>
    </motion.div>
  );
};
