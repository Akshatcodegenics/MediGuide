
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Hotel, Utensils } from "lucide-react";
import { NearbyPlace } from "@/types";
import { PlaceCard } from "./PlaceCard";

interface PlacesListProps {
  activeTab: string;
  filteredPharmacies: NearbyPlace[];
  filteredHotels: NearbyPlace[];
  filteredFoodPlaces: NearbyPlace[];
}

export const PlacesList: React.FC<PlacesListProps> = ({
  activeTab,
  filteredPharmacies,
  filteredHotels,
  filteredFoodPlaces
}) => {
  const renderPlaces = (places: NearbyPlace[], type: string, icon: JSX.Element, title: string) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <div className="flex items-center mb-4">
        {icon}
        <h3 className="text-lg font-medium">{title}</h3>
        <div className="ml-auto text-sm text-gray-500">{places.length} found</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <PlaceCard key={place.id} place={place} type={type} index={index} />
        ))}
      </div>
    </motion.div>
  );

  if (activeTab === "all") {
    return (
      <div className="space-y-8">
        <AnimatePresence>
          {filteredPharmacies.length > 0 && renderPlaces(
            filteredPharmacies,
            "pharmacy",
            <Pill className="w-5 h-5 text-green-600 mr-2" />,
            "Nearby Pharmacies"
          )}
        </AnimatePresence>

        <AnimatePresence>
          {filteredHotels.length > 0 && renderPlaces(
            filteredHotels,
            "hotel",
            <Hotel className="w-5 h-5 text-blue-600 mr-2" />,
            "Nearby Hotels"
          )}
        </AnimatePresence>

        <AnimatePresence>
          {filteredFoodPlaces.length > 0 && renderPlaces(
            filteredFoodPlaces,
            "food",
            <Utensils className="w-5 h-5 text-orange-600 mr-2" />,
            "Food Centers"
          )}
        </AnimatePresence>
      </div>
    );
  }

  const tabConfig = {
    pharmacies: {
      places: filteredPharmacies,
      type: "pharmacy",
      icon: <Pill className="w-5 h-5 text-green-600 mr-2" />,
      title: "Nearby Pharmacies"
    },
    hotels: {
      places: filteredHotels,
      type: "hotel", 
      icon: <Hotel className="w-5 h-5 text-blue-600 mr-2" />,
      title: "Nearby Hotels"
    },
    food: {
      places: filteredFoodPlaces,
      type: "food",
      icon: <Utensils className="w-5 h-5 text-orange-600 mr-2" />,
      title: "Food Centers"
    }
  };

  const config = tabConfig[activeTab as keyof typeof tabConfig];
  return config ? renderPlaces(config.places, config.type, config.icon, config.title) : null;
};
