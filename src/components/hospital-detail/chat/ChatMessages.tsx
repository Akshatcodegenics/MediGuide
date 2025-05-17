
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, AlertTriangle, Image, Cube } from "lucide-react";
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

  // Function to format message content with markdown-like syntax
  const formatMessageContent = (content: string) => {
    // Format bold text (between ** **)
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format lists (lines starting with - or *)
    formattedContent = formattedContent.replace(/^(?:- |\* )(.*?)$/gm, '<li>$1</li>');
    formattedContent = formattedContent.replace(/<li>.*?<\/li>/gs, (match) => `<ul class="list-disc pl-4 my-2">${match}</ul>`);
    
    // Format heading-like text (lines between --- ---)
    formattedContent = formattedContent.replace(/^(.*?):$/gm, '<div class="font-medium text-blue-700">$1:</div>');
    
    // Format paragraphs (double line breaks)
    formattedContent = formattedContent.replace(/\n\n/g, '</p><p class="my-2">');

    // Format single line breaks
    formattedContent = formattedContent.replace(/\n/g, '<br />');
    
    // Add visual formatting for specialization terms
    formattedContent = formattedContent.replace(/(Cardiologist|Neurologist|Orthopedic|Pediatrician|Dermatologist|Ophthalmologist|Gynecologist|ENT Specialist|Psychiatrist|Urologist|Gastroenterologist|Oncologist|Endocrinologist|Pulmonologist|Rheumatologist|Nephrologist)/g, 
      '<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">$1</span>'
    );
    
    // Add visual formatting for mood analysis
    const moodPatterns = {
      'anxious': 'bg-yellow-100 text-yellow-800',
      'sad': 'bg-blue-100 text-blue-800',
      'angry': 'bg-red-100 text-red-800',
      'happy': 'bg-green-100 text-green-800',
      'fearful': 'bg-purple-100 text-purple-800', 
      'tired': 'bg-gray-100 text-gray-800'
    };
    
    // Apply mood styling if content contains mood indicators
    Object.entries(moodPatterns).forEach(([mood, classes]) => {
      if (formattedContent.toLowerCase().includes(mood)) {
        formattedContent = formattedContent.replace(
          new RegExp(`(I notice you might be feeling ${mood}|I sense you might be feeling|I understand you might be frustrated|It seems you might be concerned|You seem to be experiencing fatigue).*?\.`, 'i'),
          `<div class="flex items-center gap-2 ${classes} p-2 rounded my-2 animate-pulse">
            <div class="min-w-4 h-4 rounded-full ${classes.replace('bg-', 'bg-')} opacity-50"></div>
            <span>$&</span>
          </div>`
        );
      }
    });
    
    // Add 3D icons for certain keywords
    if (formattedContent.includes('hospital') || formattedContent.includes('Hospital')) {
      formattedContent = formattedContent.replace(/(hospital|Hospital)/g, 
        `<span class="inline-flex items-center">
          <span class="mr-1 text-blue-600">$1</span>
          <span class="inline-block animate-pulse"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" stroke-width="2"/><path d="M8 12H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M12 8V16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
        </span>`
      );
    }
    
    // Wrap in paragraph tags if not starting with a tag
    if (!formattedContent.startsWith('<')) {
      formattedContent = `<p>${formattedContent}</p>`;
    }
    
    // Add warning style to medical disclaimers
    if (formattedContent.includes("This is not a substitute for professional medical advice")) {
      formattedContent = formattedContent.replace(
        /(This is not a substitute for professional medical advice.*?\.)/g, 
        `<div class="flex items-center gap-1 text-amber-600 bg-amber-50 p-2 rounded my-2 text-sm">
          <AlertTriangle size={14} />
          <span>$1</span>
        </div>`
      );
    }
    
    return formattedContent;
  };

  // Animation variants for messages
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <motion.div 
      className="space-y-3 py-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {messages.map((message) => (
        <motion.div
          key={message.id}
          variants={messageVariants}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} px-3`}
        >
          <div className={`
            max-w-[85%] p-3 rounded-lg
            ${message.sender === 'user' 
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md' 
              : 'bg-white border border-gray-200 text-gray-800 shadow-sm'}
          `}>
            {message.sender === 'bot' && (
              <div className="flex items-center mb-1">
                <Avatar className="h-6 w-6 mr-2 bg-blue-100 relative">
                  <Bot size={12} className="text-blue-600" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
                </Avatar>
                <span className="text-xs font-medium text-blue-600">AI Assistant</span>
              </div>
            )}
            <div 
              className="text-sm"
              dangerouslySetInnerHTML={{ 
                __html: message.sender === 'bot' 
                  ? formatMessageContent(message.content) 
                  : message.content.replace(/\n/g, '<br />') 
              }}
            />
            <div className={`text-xs mt-1 flex items-center ${message.sender === 'user' ? 'text-blue-100 justify-end' : 'text-gray-400'}`}>
              {formatTime(message.timestamp)}
              {message.sender === 'bot' && 
                <span className="ml-2 inline-flex items-center">
                  <Cube size={10} className="text-blue-400 mr-1" />
                  <span className="text-xs text-blue-400">AI</span>
                </span>
              }
            </div>
          </div>
        </motion.div>
      ))}
      
      {isTyping && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-start px-3"
        >
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm relative overflow-hidden">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2 bg-blue-100">
                <Bot size={12} className="text-blue-600" />
              </Avatar>
              <div className="flex space-x-1">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-blue-300" 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-blue-400" 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-blue-500" 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-300 via-purple-500 to-blue-300 w-full animate-pulse"></div>
          </div>
        </motion.div>
      )}
      
      <div ref={messagesEndRef} />
    </motion.div>
  );
};
