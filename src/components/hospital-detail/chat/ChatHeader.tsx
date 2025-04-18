
import React from "react";
import { Bot, Minimize2, Maximize2, X } from "lucide-react";
import { Hospital } from "@/types";

interface ChatHeaderProps {
  hospital: Hospital;
  isMinimized: boolean;
  toggleMinimize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  hospital, 
  isMinimized, 
  toggleMinimize, 
  onClose 
}) => {
  return (
    <div 
      className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white flex justify-between items-center cursor-pointer"
      onClick={toggleMinimize}
    >
      <div className="flex items-center">
        <Bot className="mr-2" size={20} />
        <div>
          <h3 className="font-medium text-sm">AI Health Assistant</h3>
          <p className="text-xs text-white/80">{hospital.name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {isMinimized ? (
          <Maximize2 size={18} onClick={toggleMinimize} />
        ) : (
          <Minimize2 size={18} onClick={toggleMinimize} />
        )}
        <X size={18} onClick={onClose} />
      </div>
    </div>
  );
};
