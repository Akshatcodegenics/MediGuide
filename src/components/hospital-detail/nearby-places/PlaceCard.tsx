
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Star, Clock, DollarSign, Info, ThumbsUp } from "lucide-react";
import { NearbyPlace } from "@/types";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

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

// Get amenities based on place type and id
const getAmenities = (type: string, id: number) => {
  const amenitiesByType = {
    pharmacy: ["24/7 Service", "Prescription Delivery", "Health Consultation", "Surgical Supplies"],
    hotel: ["Free WiFi", "Swimming Pool", "Restaurant", "Fitness Center", "Room Service", "Free Parking"],
    food: ["Outdoor Seating", "Delivery", "Takeout", "Vegetarian Options", "Full Bar", "Breakfast"]
  };
  
  // Get 2-3 random amenities based on id for consistency
  const typeAmenities = amenitiesByType[type];
  const count = 2 + (id % 2); // 2 or 3 amenities
  const result = [];
  
  for (let i = 0; i < count; i++) {
    const index = (id + i) % typeAmenities.length;
    result.push(typeAmenities[index]);
  }
  
  return result;
};

// Generate popularity score (0-100) based on id
const getPopularityScore = (id: number) => {
  return 65 + (id % 36); // 65-100
};

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, type, index }) => {
  const priceLevel = getPriceLevel(type, place.id);
  const review = getRandomReviews(place.id);
  const amenities = getAmenities(type, place.id);
  const popularityScore = getPopularityScore(place.id);
  
  // Get multiple images for the carousel
  const getMultipleImages = () => {
    const baseImg = getPlaceImage(type, place.id);
    // Get 3 images for the carousel
    return Array(3).fill(null).map((_, i) => {
      const imgIndex = (place.id + i) % 4;
      return type === 'pharmacy' 
        ? `https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=500&auto=format&fit=crop`.replace('1631549916768', `${1631549916768 + imgIndex * 1000}`)
        : type === 'hotel'
        ? `https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=500&auto=format&fit=crop`.replace('1564501049412', `${1564501049412 + imgIndex * 1000}`)
        : `https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format&fit=crop`.replace('1517248135467', `${1517248135467 + imgIndex * 1000}`)
    });
  };
  
  const images = getMultipleImages();

  // Animation variants for hover effects
  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 } 
    }
  };
  
  // Badge colors based on price level
  const getPriceBadgeColor = (price: string) => {
    switch(price.length) {
      case 1: return "bg-green-100 text-green-800"; // $
      case 2: return "bg-blue-100 text-blue-800";   // $$
      case 3: return "bg-yellow-100 text-yellow-800"; // $$$
      case 4: return "bg-red-100 text-red-800";     // $$$$
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover="hover"
      variants={cardVariants}
      className="h-full"
    >
      <Card key={place.id} className="h-full overflow-hidden border-t-4 border-t-blue-500">
        <div className="relative h-44 overflow-hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={i} className="h-44">
                  <motion.div 
                    className="w-full h-full"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img 
                      src={img} 
                      alt={`${place.name} - image ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-7 w-7" />
            <CarouselNext className="right-1 h-7 w-7" />
          </Carousel>
          
          <motion.div 
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center"
            whileHover={{ scale: 1.1 }}
          >
            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="text-xs font-semibold">{place.rating}</span>
          </motion.div>
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-3">
            <h3 className="text-white font-medium truncate">{place.name}</h3>
            <div className="flex items-center mt-1">
              <Badge className={`mr-1 text-xs ${getPriceBadgeColor(priceLevel)}`}>
                {priceLevel}
              </Badge>
              <Badge className="bg-purple-100 text-purple-800 text-xs">
                {place.distance} km
              </Badge>
            </div>
          </div>
        </div>
        <CardContent className="pt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-1 text-gray-500 flex-shrink-0" />
            <span className="truncate">{place.address}</span>
          </div>
          
          <div className="flex items-center text-sm text-blue-600">
            <Clock className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>Open • Closes 9PM</span>
          </div>
          
          {/* Price information specific to place type */}
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
          
          {/* Popularity score with animated progress bar */}
          <div className="text-sm text-gray-600">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <ThumbsUp className="w-3 h-3 mr-1 text-blue-500" />
                <span>Popularity</span>
              </div>
              <span className="font-medium">{popularityScore}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <motion.div 
                className="bg-blue-600 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${popularityScore}%` }}
                transition={{ delay: 0.3, duration: 0.8 }}
              />
            </div>
          </div>
          
          {/* Review quote */}
          <div className="flex items-center text-sm text-orange-600 italic">
            <Info className="w-4 h-4 mr-1 flex-shrink-0" />
            <span>"{review}"</span>
          </div>
          
          {/* Amenities */}
          <div className="flex flex-wrap gap-1 pt-1">
            {amenities.map((amenity, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-gray-50">
                {amenity}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100">
            <span className="text-sm font-medium text-purple-600">{place.distance} km away</span>
            <div className="space-x-1">
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <MapPin className="w-3 h-3" />
                <span>Map</span>
              </Button>
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
