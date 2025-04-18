
import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Message } from "../types/chat";

interface ChatMessagesProps {
  messages: Message[];
  isTyping: boolean;
  formatTime: (date: Date) => string;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ 
  messages, 
  isTyping, 
  formatTime 
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`
            max-w-[70%] p-3 rounded-lg
            ${message.sender === 'user' 
              ? 'bg-purple-500 text-white' 
              : 'bg-white border border-gray-200 text-gray-800'}
          `}>
            {message.sender === 'bot' && (
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2">
                  <Bot size={12} />
                </Avatar>
                <span className="text-xs font-medium text-blue-600">AI Assistant</span>
              </div>
            )}
            <div className="text-sm whitespace-pre-wrap">
              {message.content}
            </div>
            <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-purple-100' : 'text-gray-400'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-white border border-gray-200 p-3 rounded-lg">
            <div className="flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0.3s" }} />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
