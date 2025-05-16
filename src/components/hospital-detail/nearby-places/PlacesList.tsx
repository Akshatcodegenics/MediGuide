
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pill, Hotel, Utensils, MapPin } from "lucide-react";
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
  // State to track if elements are in view for animations
  const [inView, setInView] = useState({
    pharmacies: false,
    hotels: false,
    food: false
  });

  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set the corresponding section to be in view
            if (entry.target.id === 'pharmacies-section') {
              setInView(prev => ({ ...prev, pharmacies: true }));
            } else if (entry.target.id === 'hotels-section') {
              setInView(prev => ({ ...prev, hotels: true }));
            } else if (entry.target.id === 'food-section') {
              setInView(prev => ({ ...prev, food: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe section elements
    const pharmaciesSection = document.getElementById('pharmacies-section');
    const hotelsSection = document.getElementById('hotels-section');
    const foodSection = document.getElementById('food-section');

    if (pharmaciesSection) observer.observe(pharmaciesSection);
    if (hotelsSection) observer.observe(hotelsSection);
    if (foodSection) observer.observe(foodSection);

    return () => {
      if (pharmaciesSection) observer.unobserve(pharmaciesSection);
      if (hotelsSection) observer.unobserve(hotelsSection);
      if (foodSection) observer.unobserve(foodSection);
    };
  }, [activeTab]);

  const renderPlaces = (places: NearbyPlace[], type: string, icon: JSX.Element, title: string, sectionId: string, isVisible: boolean) => (
    <motion.div
      id={sectionId}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-4"
    >
      <motion.div 
        className="flex items-center mb-4"
        initial={{ x: -20 }}
        animate={isVisible ? { x: 0 } : { x: -20 }}
        transition={{ duration: 0.5 }}
      >
        {icon}
        <h3 className="text-lg font-medium ml-2">{title}</h3>
        <div className="ml-auto bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-sm">
          {places.length} found
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {places.map((place, index) => (
          <PlaceCard key={place.id} place={place} type={type} index={index} />
        ))}
      </div>
      
      {places.length === 0 && (
        <motion.div 
          className="text-center py-10 bg-gray-50 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <MapPin className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No {title.toLowerCase()} found within the selected distance.</p>
          <p className="text-gray-400 text-sm">Try increasing the distance to see more results.</p>
        </motion.div>
      )}
    </motion.div>
  );

  if (activeTab === "all") {
    return (
      <div className="space-y-12">
        {filteredPharmacies.length > 0 && renderPlaces(
          filteredPharmacies,
          "pharmacy",
          <Pill className="w-5 h-5 text-green-600" />,
          "Nearby Pharmacies",
          "pharmacies-section",
          inView.pharmacies
        )}

        {filteredHotels.length > 0 && renderPlaces(
          filteredHotels,
          "hotel",
          <Hotel className="w-5 h-5 text-blue-600" />,
          "Nearby Hotels",
          "hotels-section",
          inView.hotels
        )}

        {filteredFoodPlaces.length > 0 && renderPlaces(
          filteredFoodPlaces,
          "food",
          <Utensils className="w-5 h-5 text-orange-600" />,
          "Food Centers",
          "food-section",
          inView.food
        )}
      </div>
    );
  }

  const tabConfig = {
    pharmacies: {
      places: filteredPharmacies,
      type: "pharmacy",
      icon: <Pill className="w-5 h-5 text-green-600" />,
      title: "Nearby Pharmacies",
      sectionId: "pharmacies-section"
    },
    hotels: {
      places: filteredHotels,
      type: "hotel", 
      icon: <Hotel className="w-5 h-5 text-blue-600" />,
      title: "Nearby Hotels",
      sectionId: "hotels-section"
    },
    food: {
      places: filteredFoodPlaces,
      type: "food",
      icon: <Utensils className="w-5 h-5 text-orange-600" />,
      title: "Food Centers",
      sectionId: "food-section"
    }
  };

  const config = tabConfig[activeTab as keyof typeof tabConfig];
  return config ? renderPlaces(
    config.places, 
    config.type, 
    config.icon, 
    config.title,
    config.sectionId,
    true // Always visible in single tab view
  ) : null;
};
