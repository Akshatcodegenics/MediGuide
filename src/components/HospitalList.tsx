
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Star } from "lucide-react";
import { Hospital } from "@/types";

interface HospitalListProps {
  hospitals: Hospital[];
}

const HospitalList: React.FC<HospitalListProps> = ({ hospitals }) => {
  if (hospitals.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hospitals found matching your criteria.</p>
        <p className="text-gray-500">Try adjusting your filters for more results.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{hospital.name}</CardTitle>
              <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
                <span className="font-medium">{hospital.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{hospital.location}</span>
                  {hospital.distance !== undefined && (
                    <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {hospital.distance} km
                    </span>
                  )}
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Wait time: {hospital.waitingTime} minutes</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  <span>Consultation fees: ₹{hospital.fees}</span>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Specialties:</h3>
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default HospitalList;
