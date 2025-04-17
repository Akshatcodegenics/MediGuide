
import React from "react";
import { Hospital, NearbyPlace } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Pill, Hotel, Utensils, MapPin, Star } from "lucide-react";

interface NearbyPlacesTabProps {
  pharmacies: NearbyPlace[];
  hotels: NearbyPlace[];
  foodPlaces: NearbyPlace[];
}

const PlaceCard: React.FC<{ place: NearbyPlace }> = ({ place }) => (
  <Card key={place.id} className="hover:shadow-md">
    <CardHeader className="pb-2">
      <div className="flex justify-between">
        <CardTitle className="text-base">{place.name}</CardTitle>
        <div className="flex items-center">
          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
          <span className="text-sm">{place.rating}</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="flex items-center text-sm text-gray-600">
        <MapPin className="w-4 h-4 mr-1" />
        <span>{place.address}</span>
      </div>
      <div className="text-sm text-blue-600 mt-1">
        {place.distance} km away
      </div>
    </CardContent>
  </Card>
);

export const NearbyPlacesTab: React.FC<NearbyPlacesTabProps> = ({
  pharmacies,
  hotels,
  foodPlaces,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center mb-4">
          <Pill className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-medium">Nearby Pharmacies</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pharmacies.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <Hotel className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-medium">Nearby Hotels</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
      
      <div>
        <div className="flex items-center mb-4">
          <Utensils className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-medium">Food Centers</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </div>
    </div>
  );
};
