
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { NearbyPlace } from "@/types";
import { PlacesFilter } from "./nearby-places/PlacesFilter";
import { PlacesList } from "./nearby-places/PlacesList";

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
  const [maxDistance, setMaxDistance] = useState<number>(10);
  
  // Filter places based on maximum distance
  const filteredPharmacies = pharmacies.filter(place => place.distance <= maxDistance);
  const filteredHotels = hotels.filter(place => place.distance <= maxDistance);
  const filteredFoodPlaces = foodPlaces.filter(place => place.distance <= maxDistance);
  
  return (
    <div className="space-y-8">
      <PlacesFilter
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      <PlacesList
        activeTab={activeTab}
        filteredPharmacies={filteredPharmacies}
        filteredHotels={filteredHotels}
        filteredFoodPlaces={filteredFoodPlaces}
      />
      
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
          <Button variant="outline" className="bg-white">
            <MapPin className="w-4 h-4 mr-2" /> 
            Open Map View
          </Button>
        </div>
      </motion.div>
    </div>
  );
};
