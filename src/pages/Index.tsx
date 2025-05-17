
import React from "react";
import HospitalFinder from "@/components/HospitalFinder";
import { motion } from "framer-motion";
import { Image, Play, Cube } from "lucide-react"; 
import { Button } from "@/components/ui/button";

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
      
      <div className="py-12 bg-gradient-to-br from-blue-900 to-purple-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-6"
            >
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Find the Perfect <span className="text-blue-300">Healthcare</span> For Your Needs</h2>
              <p className="text-lg text-blue-100">Discover top-rated hospitals, specialized doctors, and essential medical services across India.</p>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                  <Image className="mr-2 h-5 w-5" />
                  View Case Studies
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative"
            >
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl shadow-2xl">
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/40"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="3d-animation relative">
                      <Cube className="w-24 h-24 text-white mx-auto animate-pulse" />
                      <div className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                      <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-purple-900/80 to-transparent p-6">
                    <h3 className="text-xl font-bold text-white">Interactive 3D Hospital Map</h3>
                    <p className="text-blue-200">Explore facilities with our advanced visual navigation</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-4 -bottom-4 bg-blue-600 rounded-lg p-4 shadow-lg">
                <p className="font-bold text-xl">5000+</p>
                <p className="text-sm">Hospitals Nationwide</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
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
