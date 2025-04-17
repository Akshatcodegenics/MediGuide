
import React from "react";
import HospitalFinder from "@/components/HospitalFinder";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <motion.header 
        className="bg-white bg-opacity-80 backdrop-blur-sm shadow-sm py-6 sticky top-0 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700">
              MediGuide
            </h1>
            <p className="text-gray-600">Find the best hospital for your healthcare needs</p>
          </motion.div>
        </div>
      </motion.header>
      
      <main className="py-8">
        <HospitalFinder />
      </main>
      
      <motion.footer 
        className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm">
              MediGuide helps you find the best hospitals based on your preferences.
            </p>
            <p className="text-xs mt-2 text-gray-300">
              © 2025 MediGuide. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Index;
