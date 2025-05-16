
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Play, Pause } from "lucide-react";
import { NearbyPlace } from "@/types";
import { PlacesFilter } from "./nearby-places/PlacesFilter";
import { PlacesList } from "./nearby-places/PlacesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NearbyPlacesTabProps {
  pharmacies: NearbyPlace[];
  hotels: NearbyPlace[];
  foodPlaces: NearbyPlace[];
}

export const NearbyPlacesTab: React.FC<NearbyPlacesTabProps> = ({
  pharmacies,
  hotels,
  foodPlaces,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(50);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("distance");
  
  // Filter places based on maximum distance
  const filteredPharmacies = pharmacies.filter(place => place.distance <= maxDistance);
  const filteredHotels = hotels.filter(place => place.distance <= maxDistance);
  const filteredFoodPlaces = foodPlaces.filter(place => place.distance <= maxDistance);
  
  // Sort places based on selected criteria
  const sortPlaces = (places: NearbyPlace[]) => {
    const sorted = [...places];
    
    switch(sortBy) {
      case 'distance':
        return sorted.sort((a, b) => a.distance - b.distance);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'price_asc':
        return sorted.sort((a, b) => {
          // Using ID as pseudo-price level for sorting
          const priceA = a.id % 4 + 1;
          const priceB = b.id % 4 + 1;
          return priceA - priceB;
        });
      case 'price_desc':
        return sorted.sort((a, b) => {
          const priceA = a.id % 4 + 1;
          const priceB = b.id % 4 + 1;
          return priceB - priceA;
        });
      case 'popularity':
        return sorted.sort((a, b) => {
          // Using ID for pseudo-popularity
          const popA = 65 + (a.id % 36);
          const popB = 65 + (b.id % 36);
          return popB - popA;
        });
      default:
        return sorted;
    }
  };
  
  const sortedPharmacies = sortPlaces(filteredPharmacies);
  const sortedHotels = sortPlaces(filteredHotels);
  const sortedFoodPlaces = sortPlaces(filteredFoodPlaces);
  
  // Animation for 3D objects
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.5,
        y: prev.y + 1
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg text-white mb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold mb-1">Explore Nearby Venues</h2>
            <p className="text-blue-100">Find pharmacies, hotels, and restaurants near this hospital</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
              {sortedPharmacies.length + sortedHotels.length + sortedFoodPlaces.length} Places Found
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white">
              Within {maxDistance}km
            </Badge>
          </div>
        </div>
      </motion.div>
      
      <PlacesFilter
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + sortBy + maxDistance}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <PlacesList
            activeTab={activeTab}
            filteredPharmacies={sortedPharmacies}
            filteredHotels={sortedHotels}
            filteredFoodPlaces={sortedFoodPlaces}
          />
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-blue-100 mt-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Need directions?</h3>
            <p className="text-sm text-gray-600">View all nearby places on the map</p>
          </div>
          <Button 
            variant="outline" 
            className="bg-white"
          >
            <MapPin className="w-4 h-4 mr-2" /> 
            Open Map View
          </Button>
        </div>
      </motion.div>

      {/* 3D Visual Animation Section */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 p-6 rounded-lg text-white mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <MapPin className="w-6 h-6 mr-2" />
          3D Area Visualization
        </h3>
        
        <div className="relative h-[300px] rounded-lg overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `rotateX(${rotation.x % 360}deg) rotateY(${rotation.y % 360}deg)`,
              transformOrigin: 'center center',
              transition: 'transform 0.5s ease-out'
            }}
          />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Compass className="w-16 h-16 text-blue-300 mx-auto mb-4 animate-pulse" />
              <p className="text-lg font-medium text-white mb-2">3D Model Loading...</p>
              <p className="text-sm text-blue-200">Interactive 3D model of the area coming soon!</p>
              <Button variant="outline" size="sm" className="mt-4 bg-white/10 text-white border-white/20 hover:bg-white/20">
                Preview 3D View
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-1">Pharmacies</h4>
            <p className="text-xs text-blue-200">{filteredPharmacies.length} within {maxDistance}km</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-1">Hotels</h4>
            <p className="text-xs text-blue-200">{filteredHotels.length} within {maxDistance}km</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-1">Restaurants</h4>
            <p className="text-xs text-blue-200">{filteredFoodPlaces.length} within {maxDistance}km</p>
          </div>
        </div>
      </div>
    </div>
  );
};
