
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Clock, DollarSign, Info } from "lucide-react";
import { NearbyPlace } from "@/types";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface PlaceCardProps {
  place: NearbyPlace;
  type: string;
  index: number;
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

const getPriceLevel = (type: string, id: number) => {
  // Generate a consistent price level based on id
  const levels = ["$", "$$", "$$$", "$$$$"];
  return levels[id % levels.length];
};

const getRandomReviews = (id: number) => {
  // Generate consistent reviews based on id
  const baseReviews = [
    "Great place, highly recommend!",
    "Good service but a bit pricey.",
    "Excellent staff, very helpful.",
    "Clean and comfortable, will visit again."
  ];
  return baseReviews[id % baseReviews.length];
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, type, index }) => {
  const priceLevel = getPriceLevel(type, place.id);
  const review = getRandomReviews(place.id);
  
  // Get multiple images for the carousel
  const getMultipleImages = () => {
    const baseImg = getPlaceImage(type, place.id);
    const imgIdBase = place.id % 4;
    
    return [
      baseImg,
      type === 'pharmacy' 
        ? `https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=500&auto=format&fit=crop`
        : type === 'hotel'
        ? `https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=500&auto=format&fit=crop`
        : `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop`
    ];
  };
  
  const images = getMultipleImages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03 }}
      className="h-full"
    >
      <Card key={place.id} className="h-full hover:shadow-md overflow-hidden">
        <div className="relative h-44 overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i} className="h-44">
                  <motion.img 
                    src={img} 
                    alt={`${place.name} - image ${i+1}`} 
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
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
            {type === 'food' && (
              <div className="flex items-center text-sm text-green-600">
                <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{priceLevel} • Average cost per person</span>
              </div>
            )}
            {type === 'hotel' && (
              <div className="flex items-center text-sm text-purple-600">
                <DollarSign className="w-4 h-4 mr-1 flex-shrink-0" />
                <span>{priceLevel} • Per night</span>
              </div>
            )}
            <div className="flex items-center text-sm text-orange-600">
              <Info className="w-4 h-4 mr-1 flex-shrink-0" />
              <span className="italic">"{review}"</span>
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
};
