
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, Star, Building, Building2 } from "lucide-react";
import { Hospital } from "@/types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface HospitalListProps {
  hospitals: Hospital[];
}

const HospitalList: React.FC<HospitalListProps> = ({ hospitals }) => {
  if (hospitals.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <p className="text-gray-500">No hospitals found matching your criteria.</p>
        <p className="text-gray-500">Try adjusting your filters for more results.</p>
      </motion.div>
    );
  }

  // Group hospitals by category
  const governmentHospitals = hospitals.filter(hospital => hospital.category === "government");
  const privateHospitals = hospitals.filter(hospital => hospital.category === "private");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Function to render hospital card
  const renderHospitalCard = (hospital: Hospital, index: number) => (
    <motion.div key={hospital.id} variants={item}>
      <Link to={`/hospital/${hospital.id}`} className="block">
        <Card className="hover:shadow-lg transition-shadow transform hover:-translate-y-1 transition-transform duration-300">
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
      </Link>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {governmentHospitals.length > 0 && (
        <div>
          <div className="flex items-center mb-4 text-xl font-semibold">
            <Building2 className="w-5 h-5 mr-2 text-blue-600" />
            <h2>Government Hospitals</h2>
          </div>
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {governmentHospitals.map(renderHospitalCard)}
          </motion.div>
        </div>
      )}

      {privateHospitals.length > 0 && (
        <div>
          <div className="flex items-center mb-4 text-xl font-semibold">
            <Building className="w-5 h-5 mr-2 text-purple-600" />
            <h2>Private Hospitals</h2>
          </div>
          <motion.div 
            className="grid grid-cols-1 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {privateHospitals.map(renderHospitalCard)}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default HospitalList;
