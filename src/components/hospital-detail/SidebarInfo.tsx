
import React from "react";
import { Hospital } from "@/types";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Star } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarInfoProps {
  hospital: Hospital;
}

export const SidebarInfo: React.FC<SidebarInfoProps> = ({ hospital }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-indigo-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Having trouble booking an appointment or need more information?
            </p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <Phone className="w-4 h-4 mr-2" />
              Contact Hospital
            </Button>
            <Button variant="outline" className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Email Inquiry
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-cyan-100 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Hospital Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Wait Time</span>
              <span className="font-semibold text-blue-700">{hospital.waitingTime} mins</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Consultation Fee</span>
              <span className="font-semibold text-blue-700">₹{hospital.fees}</span>
            </div>
            <div className="h-px bg-gray-200"></div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Patient Rating</span>
              <div className="flex items-center">
                <span className="font-semibold text-blue-700 mr-1">{hospital.rating}</span>
                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
