
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cube, Image, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types";

interface Hospital3DViewProps {
  hospital: Hospital;
}

export const Hospital3DView: React.FC<Hospital3DViewProps> = ({ hospital }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (isPlaying) {
      let lastTime = 0;
      const animate = (time: number) => {
        if (!lastTime) lastTime = time;
        const delta = time - lastTime;
        lastTime = time;
        
        setRotation(prev => ({
          x: prev.x + delta * 0.01,
          y: prev.y + delta * 0.02,
          z: prev.z + delta * 0.005
        }));
        
        animationRef.current = requestAnimationFrame(animate);
      };
      
      animationRef.current = requestAnimationFrame(animate);
    } else if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);
  
  const toggleAnimation = () => {
    setIsPlaying(!isPlaying);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-xl text-white overflow-hidden shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center">
          <Cube className="w-6 h-6 mr-2" />
          3D Hospital Visualization
        </h3>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20 rounded-full"
          onClick={toggleAnimation}
        >
          {isPlaying ? 
            <Pause className="h-5 w-5" /> : 
            <Play className="h-5 w-5" />
          }
        </Button>
      </div>
      
      <div className="relative min-h-[300px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-900 to-blue-900">
        <div 
          className="absolute inset-0 bg-grid-pattern opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="relative w-48 h-48 transform-gpu"
            style={{
              transform: `rotateX(${rotation.x % 360}deg) rotateY(${rotation.y % 360}deg) rotateZ(${rotation.z % 360}deg)`,
              transition: isPlaying ? 'none' : 'transform 1.5s ease-out',
            }}
          >
            {/* 3D Hospital Building */}
            <div className="absolute inset-0 bg-blue-500/30 rounded-lg border border-blue-400/40 shadow-lg backdrop-blur-sm transform scale-75 translate-y-4" />
            <div className="absolute inset-0 bg-blue-600/40 rounded-lg border border-blue-400/40 shadow-lg backdrop-blur-sm transform scale-90 translate-y-2" />
            <div className="absolute inset-0 bg-blue-700/50 rounded-lg border border-blue-400/40 shadow-lg backdrop-blur-sm" />
            
            {/* Hospital Cross Symbol */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-16 h-16 bg-white rounded-md shadow-lg flex items-center justify-center">
                <div className="absolute w-10 h-2 bg-red-500 rounded"></div>
                <div className="absolute w-2 h-10 bg-red-500 rounded"></div>
              </div>
            </div>
            
            {/* Ambient particles */}
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-2 h-2 rounded-full bg-blue-300/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `float ${2 + Math.random() * 3}s infinite ease-in-out`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        {/* Hospital Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-900 to-transparent p-4">
          <h4 className="font-bold text-white">{hospital.name}</h4>
          <p className="text-sm text-blue-200">{hospital.address}</p>
        </div>
        
        {/* Interaction Hint */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-2 py-1 rounded text-xs text-blue-200 flex items-center">
          <span className="animate-pulse mr-1">•</span>
          {isPlaying ? "Auto-rotating" : "Click play to animate"}
        </div>
      </div>
      
      {/* Status Indicators */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <h4 className="text-xs font-medium text-blue-200">Established</h4>
          <p className="text-sm font-bold">{hospital.yearFounded || new Date().getFullYear() - Math.floor(Math.random() * 50)}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <h4 className="text-xs font-medium text-blue-200">Departments</h4>
          <p className="text-sm font-bold">{hospital.specializations?.length || Math.floor(Math.random() * 15) + 5}</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm p-2 rounded-lg">
          <h4 className="text-xs font-medium text-blue-200">Rating</h4>
          <p className="text-sm font-bold flex items-center">
            {hospital.rating || (Math.random() * 2 + 3).toFixed(1)} 
            <span className="text-yellow-400 ml-1">★</span>
          </p>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.2); }
        }
      `}</style>
    </motion.div>
  );
};
