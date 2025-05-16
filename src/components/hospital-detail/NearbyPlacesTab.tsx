
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Compass, Play, Pause } from "lucide-react";
import { NearbyPlace } from "@/types";
import { PlacesFilter } from "./nearby-places/PlacesFilter";
import { PlacesList } from "./nearby-places/PlacesList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";

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
  const [activeMediaTab, setActiveMediaTab] = useState<string>("places");
  
  // Filter places based on maximum distance
  const filteredPharmacies = pharmacies.filter(place => place.distance <= maxDistance);
  const filteredHotels = hotels.filter(place => place.distance <= maxDistance);
  const filteredFoodPlaces = foodPlaces.filter(place => place.distance <= maxDistance);
  
  return (
    <div className="space-y-8">
      <Tabs defaultValue="places" onValueChange={setActiveMediaTab} className="w-full">
        <TabsList className="mb-4 w-full md:w-auto">
          <TabsTrigger value="places">Places</TabsTrigger>
          <TabsTrigger value="media">Media Gallery</TabsTrigger>
          <TabsTrigger value="map">Interactive Map</TabsTrigger>
          <TabsTrigger value="3d">3D View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="places" className="space-y-8">
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
              <Button 
                variant="outline" 
                className="bg-white"
                onClick={() => setActiveMediaTab("map")}
              >
                <MapPin className="w-4 h-4 mr-2" /> 
                Open Map View
              </Button>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="media">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold mb-2">Area Overview Video</h2>
              <p className="text-sm text-gray-600 mb-4">Watch this video to get familiar with the area around the hospital.</p>
              
              <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <video
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop"
                  controls
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="https://samplelib.com/lib/preview/mp4/sample-5s.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <Button 
                      className="rounded-full w-16 h-16 bg-white/30 backdrop-blur-sm hover:bg-white/50"
                      onClick={() => {
                        const video = document.querySelector('video');
                        if (video) {
                          video.play();
                          setIsPlaying(true);
                        }
                      }}
                    >
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src="https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=500&auto=format&fit=crop" 
                    alt="Pharmacy interior" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-sm font-medium">Nearby Pharmacy Interior</h3>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop" 
                    alt="Hotel room" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-sm font-medium">Hotel Suite View</h3>
                  </div>
                </div>
              </Card>
              
              <Card className="overflow-hidden">
                <div className="aspect-square relative">
                  <img 
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop" 
                    alt="Restaurant interior" 
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
                    <h3 className="text-white text-sm font-medium">Popular Restaurant</h3>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="map">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
              <h2 className="text-lg font-semibold mb-2">Interactive Map</h2>
              <p className="text-sm text-gray-600">Explore nearby places within {maxDistance}km radius.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden h-[500px]">
              <iframe 
                src="/hospital/20?mapTabLink=true" 
                className="w-full h-full" 
                title="Interactive Map"
              />
            </div>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="3d">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
              <div className="flex items-center">
                <Compass className="w-6 h-6 text-purple-600 mr-2" />
                <h2 className="text-lg font-semibold">3D Area Visualization</h2>
              </div>
              <p className="text-sm text-gray-600 mt-2">Explore the hospital surroundings in 3D. Use mouse to rotate and scroll to zoom.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 h-[500px] flex items-center justify-center">
              <div className="text-center">
                <Compass className="w-16 h-16 text-purple-300 mx-auto mb-4" />
                <p className="text-gray-500">3D model visualization is loading...</p>
                <p className="text-xs text-gray-400 mt-2">This feature is being prepared for the next update</p>
              </div>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

