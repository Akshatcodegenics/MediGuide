
import React from "react";
import { Hospital } from "@/types";
import { MapPin, Phone, Mail, Globe, Clock, DollarSign } from "lucide-react";

interface InfoTabProps {
  hospital: Hospital;
}

export const InfoTab: React.FC<InfoTabProps> = ({ hospital }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-start">
            <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <h3 className="font-medium">Address</h3>
              <p className="text-gray-600">{hospital.address}</p>
            </div>
          </div>
          
          {hospital.contact && (
            <div className="flex items-start">
              <Phone className="w-5 h-5 text-gray-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Contact</h3>
                <p className="text-gray-600">{hospital.contact}</p>
              </div>
            </div>
          )}
          
          {hospital.email && (
            <div className="flex items-start">
              <Mail className="w-5 h-5 text-gray-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">{hospital.email}</p>
              </div>
            </div>
          )}
          
          {hospital.website && (
            <div className="flex items-start">
              <Globe className="w-5 h-5 text-gray-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Website</h3>
                <p className="text-blue-600 hover:underline">
                  <a href={`https://${hospital.website}`} target="_blank" rel="noopener noreferrer">
                    {hospital.website}
                  </a>
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start">
            <Clock className="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <h3 className="font-medium">Waiting Time</h3>
              <p className="text-gray-600">{hospital.waitingTime} minutes</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <DollarSign className="w-5 h-5 text-gray-500 mr-3 mt-1" />
            <div>
              <h3 className="font-medium">Consultation Fee</h3>
              <p className="text-gray-600">₹{hospital.fees}</p>
            </div>
          </div>
          
          {hospital.estimatedCost && (
            <div className="flex items-start">
              <DollarSign className="w-5 h-5 text-gray-500 mr-3 mt-1" />
              <div>
                <h3 className="font-medium">Estimated Cost Range</h3>
                <p className="text-gray-600">
                  ₹{hospital.estimatedCost.min} - ₹{hospital.estimatedCost.max}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Specialties</h3>
        <div className="flex flex-wrap gap-2">
          {hospital.specialties.map((specialty) => (
            <span
              key={specialty}
              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
            >
              {specialty}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
