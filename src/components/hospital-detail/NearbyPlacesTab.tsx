
import React from "react";
import { Hospital, NearbyPlace } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Pill, Hotel, Utensils, MapPin, Star, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

interface NearbyPlacesTabProps {
  pharmacies: NearbyPlace[];
  hotels: NearbyPlace[];
  foodPlaces: NearbyPlace[];
}

const getPlaceImage = (type: string, id: number) => {
  const images = {
    pharmacy: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=500&auto=format&fit=crop"
    ],
    hotel: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop"
    ],
    food: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop"
    ]
  };
  
  const index = id % 2;
  return images[type][index];
};

const PlaceCard: React.FC<{ place: NearbyPlace; type: string }> = ({ place, type }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ scale: 1.03 }}
    className="h-full"
  >
    <Card key={place.id} className="h-full hover:shadow-md overflow-hidden">
      <div className="relative h-36 overflow-hidden">
        <img 
          src={getPlaceImage(type, place.id)} 
          alt={place.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
          <span className="text-xs font-semibold">{place.rating}</span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-base">{place.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{place.address}</span>
        </div>
        <div className="text-sm text-blue-600 mt-1 flex items-center">
          <span>{place.distance} km away</span>
          <ExternalLink className="w-3 h-3 ml-1" />
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export const NearbyPlacesTab: React.FC<NearbyPlacesTabProps> = ({
  pharmacies,
  hotels,
  foodPlaces,
}) => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Pill className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-medium">Nearby Pharmacies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pharmacies.map((place) => (
            <PlaceCard key={place.id} place={place} type="pharmacy" />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Hotel className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium">Nearby Hotels</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((place) => (
            <PlaceCard key={place.id} place={place} type="hotel" />
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <Utensils className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-medium">Food Centers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} type="food" />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
