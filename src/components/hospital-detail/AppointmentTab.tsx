
import React, { useState } from "react";
import { Hospital } from "@/types";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Clock, CreditCard, FileText, HelpCircle, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AppointmentTabProps {
  hospital: Hospital;
}

export const AppointmentTab: React.FC<AppointmentTabProps> = ({ hospital }) => {
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState<number | null>(null);
  
  const handleShowHelp = (stepIndex: number) => {
    toast({
      title: `Step ${stepIndex + 1} Details`,
      description: hospital.appointmentSteps?.[stepIndex] || "No additional information available.",
      variant: "default",
    });
  };
  
  const handleBookNow = () => {
    toast({
      title: "Booking Request Sent",
      description: "Your appointment request has been received. You will get a confirmation call shortly.",
      variant: "default",
    });
  };
  
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 border border-blue-100"
      >
        <h2 className="text-xl font-semibold mb-2">Book an Appointment at {hospital.name}</h2>
        <p className="text-gray-600 mb-4">
          Follow the steps below to book your appointment. The estimated consultation fee is 
          <span className="font-semibold"> ₹{hospital.fees}</span> and average waiting time is 
          <span className="font-semibold"> {hospital.waitingTime} minutes</span>.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-blue-600" />
              Appointment Booking Process
            </h3>
            
            {hospital.appointmentSteps && (
              <ol className="space-y-4">
                {hospital.appointmentSteps.map((step, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex"
                    onMouseEnter={() => setActiveStep(index)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <span className={`flex-shrink-0 w-8 h-8 ${activeStep === index ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'} rounded-full flex items-center justify-center mr-3 transition-colors duration-300`}>
                      {index + 1}
                    </span>
                    <div className="bg-white p-4 rounded-lg shadow-sm flex-grow border border-gray-100 relative">
                      {step}
                      <button 
                        onClick={() => handleShowHelp(index)}
                        className="absolute right-2 top-2 text-gray-400 hover:text-blue-600"
                        aria-label="Show more information"
                      >
                        <HelpCircle size={16} />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </ol>
            )}
            
            <div className="mt-6">
              <Button 
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment Now
              </Button>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="font-medium mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Required Documents
              </h3>
              <ul className="space-y-3">
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Government-issued photo ID (Aadhar, PAN, Driving License)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Previous medical records (if any)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Insurance details (if applicable)</span>
                </motion.li>
                <motion.li 
                  className="flex items-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Referral letter (if applicable)</span>
                </motion.li>
              </ul>
              
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-2 flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                  Payment Options
                </h3>
                <p className="text-gray-600 text-sm">
                  The hospital accepts cash, credit/debit cards, UPI, and major insurance providers.
                </p>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h3 className="font-medium mb-2 flex items-center">
                  <Phone className="mr-2 h-5 w-5 text-blue-600" />
                  Contact for Assistance
                </h3>
                <p className="text-gray-600 text-sm">
                  For any assistance with booking, call: <span className="font-medium">{hospital.contact}</span>
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Email: <span className="font-medium">{hospital.email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
      >
        <h3 className="font-medium mb-4">Estimated Cost Range</h3>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-600">Minimum</p>
            <p className="text-xl font-semibold">₹{hospital.estimatedCost?.min || hospital.fees}</p>
          </div>
          <div className="h-1 flex-grow mx-6 bg-gradient-to-r from-green-300 to-red-300 rounded-full"></div>
          <div>
            <p className="text-gray-600">Maximum</p>
            <p className="text-xl font-semibold">₹{hospital.estimatedCost?.max || hospital.fees * 10}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *Actual costs may vary based on the specific treatment and patient condition
        </p>
      </motion.div>
    </div>
  );
};
