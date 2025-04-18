
import React, { useState } from "react";
import { Hospital, NearbyPlace } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Pill, Hotel, Utensils, MapPin, Star, ExternalLink, Phone, Globe, Clock, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

interface NearbyPlacesTabProps {
  pharmacies: NearbyPlace[];
  hotels: NearbyPlace[];
  foodPlaces: NearbyPlace[];
}

const getPlaceImage = (type: string, id: number) => {
  const images = {
    pharmacy: [
      "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=500&auto=format&fit=crop"
    ],
    hotel: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop"
    ],
    food: [
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?q=80&w=500&auto=format&fit=crop"
    ]
  };
  
  const index = id % 4;
  return images[type][index];
};

const PlaceCard: React.FC<{ place: NearbyPlace; type: string; index: number }> = ({ place, type, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ scale: 1.03 }}
    className="h-full"
  >
    <Card key={place.id} className="h-full hover:shadow-md overflow-hidden">
      <div className="relative h-44 overflow-hidden">
        <motion.img 
          src={getPlaceImage(type, place.id)} 
          alt={place.name} 
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
          <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
          <span className="text-xs font-semibold">{place.rating}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <h3 className="text-white font-medium truncate">{place.name}</h3>
        </div>
      </div>
      <CardContent className="pt-3">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" />
            <span className="truncate">{place.address}</span>
          </div>
          <div className="flex items-center text-sm text-blue-600">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>Open • Closes 9PM</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium text-purple-600">{place.distance} km away</span>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </Button>
          </div>
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
  const [activeTab, setActiveTab] = useState<string>("all");
  const [maxDistance, setMaxDistance] = useState<number>(10);
  
  // Filter places based on maximum distance
  const filteredPharmacies = pharmacies.filter(place => place.distance <= maxDistance);
  const filteredHotels = hotels.filter(place => place.distance <= maxDistance);
  const filteredFoodPlaces = foodPlaces.filter(place => place.distance <= maxDistance);
  
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100"
      >
        <h2 className="text-lg font-medium mb-3">Nearby Places Filter</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="col-span-1 md:col-span-3">
            <label className="text-sm text-gray-600 mb-1 block">Maximum Distance: {maxDistance} km</label>
            <Slider
              value={[maxDistance]}
              min={1}
              max={30}
              step={1}
              onValueChange={(value) => setMaxDistance(value[0])}
              className="mt-2"
            />
          </div>
          <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pharmacies">
                  <Pill className="w-4 h-4 mr-1" />
                </TabsTrigger>
                <TabsTrigger value="hotels">
                  <Hotel className="w-4 h-4 mr-1" />
                </TabsTrigger>
                <TabsTrigger value="food">
                  <Utensils className="w-4 h-4 mr-1" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </motion.div>
      
      <TabsContent value="all" className={activeTab !== "all" ? "hidden" : ""}>
        <div className="space-y-8">
          <AnimatePresence>
            {filteredPharmacies.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center mb-4">
                  <Pill className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="text-lg font-medium">Nearby Pharmacies</h3>
                  <div className="ml-auto text-sm text-gray-500">{filteredPharmacies.length} found</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPharmacies.map((place, index) => (
                    <PlaceCard key={place.id} place={place} type="pharmacy" index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {filteredHotels.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center mb-4">
                  <Hotel className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="text-lg font-medium">Nearby Hotels</h3>
                  <div className="ml-auto text-sm text-gray-500">{filteredHotels.length} found</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredHotels.map((place, index) => (
                    <PlaceCard key={place.id} place={place} type="hotel" index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {filteredFoodPlaces.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex items-center mb-4">
                  <Utensils className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="text-lg font-medium">Food Centers</h3>
                  <div className="ml-auto text-sm text-gray-500">{filteredFoodPlaces.length} found</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFoodPlaces.map((place, index) => (
                    <PlaceCard key={place.id} place={place} type="food" index={index} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </TabsContent>
      
      <TabsContent value="pharmacies" className={activeTab !== "pharmacies" ? "hidden" : ""}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center mb-4">
            <Pill className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="text-lg font-medium">Nearby Pharmacies</h3>
            <div className="ml-auto text-sm text-gray-500">{filteredPharmacies.length} found</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPharmacies.map((place, index) => (
              <PlaceCard key={place.id} place={place} type="pharmacy" index={index} />
            ))}
          </div>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="hotels" className={activeTab !== "hotels" ? "hidden" : ""}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center mb-4">
            <Hotel className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium">Nearby Hotels</h3>
            <div className="ml-auto text-sm text-gray-500">{filteredHotels.length} found</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredHotels.map((place, index) => (
              <PlaceCard key={place.id} place={place} type="hotel" index={index} />
            ))}
          </div>
        </motion.div>
      </TabsContent>
      
      <TabsContent value="food" className={activeTab !== "food" ? "hidden" : ""}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <div className="flex items-center mb-4">
            <Utensils className="w-5 h-5 text-orange-600 mr-2" />
            <h3 className="text-lg font-medium">Food Centers</h3>
            <div className="ml-auto text-sm text-gray-500">{filteredFoodPlaces.length} found</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFoodPlaces.map((place, index) => (
              <PlaceCard key={place.id} place={place} type="food" index={index} />
            ))}
          </div>
        </motion.div>
      </TabsContent>
      
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
