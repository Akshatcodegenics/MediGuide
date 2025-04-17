
import React from "react";
import { Hospital } from "@/types";
import { motion } from "framer-motion";

interface AppointmentTabProps {
  hospital: Hospital;
}

export const AppointmentTab: React.FC<AppointmentTabProps> = ({ hospital }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Appointment Booking Process</h2>
        {hospital.appointmentSteps && (
          <ol className="space-y-4">
            {hospital.appointmentSteps.map((step, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center mr-3">
                  {index + 1}
                </span>
                <div className="bg-white p-4 rounded-lg shadow-sm flex-grow border border-gray-100">
                  {step}
                </div>
              </motion.li>
            ))}
          </ol>
        )}
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Required Documents</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Government-issued photo ID (Aadhar, PAN, Driving License)</li>
          <li>Previous medical records (if any)</li>
          <li>Insurance details (if applicable)</li>
          <li>Referral letter (if applicable)</li>
        </ul>
      </div>
    </div>
  );
};
