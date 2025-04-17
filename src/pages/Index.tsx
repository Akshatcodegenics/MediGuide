
import React from "react";
import HospitalFinder from "@/components/HospitalFinder";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-purple-700">MediGuide</h1>
          <p className="text-gray-600">Find the best hospital for your healthcare needs</p>
        </div>
      </header>
      
      <main className="py-8">
        <HospitalFinder />
      </main>
      
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-sm">
              MediGuide helps you find the best hospitals based on your preferences.
            </p>
            <p className="text-xs mt-2 text-gray-400">
              © 2025 MediGuide. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
