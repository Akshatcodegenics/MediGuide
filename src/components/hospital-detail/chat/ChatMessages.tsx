
import React, { useEffect, useRef } from "react";
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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div className="space-y-3 py-3">
      {messages.map((message) => (
        <motion.div
          key={message.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-3`}
        >
          <div className={`
            max-w-[78%] p-3 rounded-lg
            ${message.sender === 'user' 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md' 
              : 'bg-white border border-gray-200 text-gray-800 shadow-sm'}
          `}>
            {message.sender === 'bot' && (
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2 bg-blue-100">
                  <Bot size={12} className="text-blue-600" />
                </Avatar>
                <span className="text-xs font-medium text-blue-600">AI Assistant</span>
              </div>
            )}
            <div className="text-sm whitespace-pre-wrap">
              {message.content}
            </div>
            <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start px-3"
        >
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2 bg-blue-100">
                <Bot size={12} className="text-blue-600" />
              </Avatar>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </div>
  );
};
