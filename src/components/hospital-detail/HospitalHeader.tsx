
import React from "react";
import { Hospital } from "@/types";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface HospitalHeaderProps {
  hospital: Hospital;
}

export const HospitalHeader: React.FC<HospitalHeaderProps> = ({ hospital }) => {
  return (
    <div className="w-full">
      <div className="h-40 bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-white">{hospital.name}</h1>
      </div>
      
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">
              {hospital.name}
              <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {hospital.category === "government" ? "Government" : "Private"}
              </span>
            </CardTitle>
            <CardDescription>{hospital.location}</CardDescription>
          </div>
          <div className="flex items-center bg-yellow-100 px-3 py-2 rounded-full">
            <Star className="w-5 h-5 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="font-medium text-lg">{hospital.rating}</span>
          </div>
        </div>
      </CardHeader>
    </div>
  );
};
