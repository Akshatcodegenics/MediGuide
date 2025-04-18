
import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hospital } from "@/types";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, Language, Mic, Users, ChevronRight } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

interface AIChatAssistantProps {
  hospital: Hospital;
}

// Mock data for predefined questions
const predefinedQuestions = [
  "How do I book an appointment?",
  "What are the visiting hours?",
  "Do you accept insurance?",
  "How to reach this hospital?",
  "What documents are required?",
  "What's the emergency contact number?"
];

// Mock data for AI responses
const mockResponses: Record<string, string> = {
  "How do I book an appointment?": "You can book an appointment by following these steps:\n1. Call our helpline at {contact}\n2. Use our online booking system on our website\n3. Visit the hospital reception in person\n4. Use the appointment tab on this page",
  "What are the visiting hours?": "Our visiting hours are from 10:00 AM to 8:00 PM every day. For ICU patients, there are special visiting hours from 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM.",
  "Do you accept insurance?": "Yes, we accept most major insurance providers. Please bring your insurance card and ID when you visit. You can call our billing department at {contact} to confirm if your specific insurance plan is accepted.",
  "How to reach this hospital?": "You can find our exact location on the map tab. We're located at {address}. Public transport options include buses and metro. Parking is available for private vehicles.",
  "What documents are required?": "For your first visit, please bring:\n• A valid government ID\n• Your insurance card (if applicable)\n• Previous medical records and test reports\n• Any referral letters from your primary doctor",
  "What's the emergency contact number?": "Our emergency helpline is available 24/7 at {contact}. For medical emergencies, please dial this number immediately for guidance and assistance."
};

// Supported languages with their language codes
const supportedLanguages = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Chinese", code: "zh" },
  { name: "Japanese", code: "ja" },
  { name: "Arabic", code: "ar" },
  { name: "Russian", code: "ru" },
  { name: "Portuguese", code: "pt" }
];

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ hospital }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [showLanguages, setShowLanguages] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Initial greeting when opening the chat
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        content: `👋 Hello! I'm your AI assistant for ${hospital.name}. How can I help you today?`,
        sender: "bot" as const,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [isOpen, hospital.name, messages.length]);

  // Auto-scroll to the latest message
  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      let responseContent = "I'm not sure about that. Can you ask something else about the hospital or booking appointments?";
      
      // Check if the message matches any predefined questions
      for (const question of Object.keys(mockResponses)) {
        if (currentMessage.toLowerCase().includes(question.toLowerCase())) {
          responseContent = mockResponses[question]
            .replace("{contact}", hospital.contact || "our contact number")
            .replace("{address}", hospital.address || "our address");
          break;
        }
      }
      
      // If message mentions booking/appointment
      if (
        currentMessage.toLowerCase().includes("appointment") || 
        currentMessage.toLowerCase().includes("booking") || 
        currentMessage.toLowerCase().includes("schedule")
      ) {
        responseContent = `To book an appointment at ${hospital.name}, you can:\n
1. Call us at ${hospital.contact}\n
2. Visit our website at ${hospital.website}\n
3. Email us at ${hospital.email}\n
4. Use the Appointment tab on this page to book online\n
The consultation fee starts at ₹${hospital.fees}. Would you like me to help you with anything specific about the booking process?`;
      }
      
      // If message asks about specialties/departments
      if (
        currentMessage.toLowerCase().includes("special") || 
        currentMessage.toLowerCase().includes("department") || 
        currentMessage.toLowerCase().includes("treatment")
      ) {
        responseContent = `${hospital.name} specializes in: ${hospital.specialties.join(", ")}. Which specific specialty are you interested in?`;
      }
      
      // Add AI response to chat
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  const handlePredefinedQuestion = (question: string) => {
    setCurrentMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };
  
  const handleLanguageChange = (langCode: string) => {
    setActiveLanguage(langCode);
    setShowLanguages(false);
    
    // Show a toast notification about language change
    const langName = supportedLanguages.find(lang => lang.code === langCode)?.name || "Unknown";
    toast({
      title: `Language changed to ${langName}`,
      description: "All assistant responses will now be in this language",
    });
  };
  
  const handleMicInput = () => {
    toast({
      title: "Voice input activated",
      description: "Please speak clearly into your microphone",
    });
    
    // In a real implementation, we would use the Web Speech API here
    // For demo purposes, we'll just simulate a voice input after a delay
    setTimeout(() => {
      setCurrentMessage("I want to book an appointment");
      toast({
        title: "Voice captured",
        description: "Message has been transcribed",
      });
    }, 2000);
  };
  
  // Toggle chat open/closed
  const toggleChat = () => setIsOpen(!isOpen);
  
  // Toggle chat minimized/maximized
  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };
  
  // Format time for message timestamp
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat toggle button */}
      {!isOpen && (
        <motion.button
          onClick={toggleChat}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMinimized ? "300px" : "380px",
              height: isMinimized ? "auto" : "520px"
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
          >
            {/* Chat header */}
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
                <X size={18} onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }} />
              </div>
            </div>
            
            {/* Chat content */}
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col h-[430px]"
                >
                  {/* Language selector */}
                  <div className="border-b border-gray-100 p-2 bg-gray-50 flex justify-between items-center">
                    <div className="flex items-center">
                      <Language size={16} className="text-gray-500 mr-1" />
                      <span className="text-xs text-gray-600">
                        {supportedLanguages.find(lang => lang.code === activeLanguage)?.name || "English"}
                      </span>
                    </div>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => setShowLanguages(!showLanguages)}
                      >
                        Change Language
                      </Button>
                      
                      {showLanguages && (
                        <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-40 py-1 max-h-48 overflow-auto">
                          {supportedLanguages.map(lang => (
                            <button
                              key={lang.code}
                              className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${activeLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''}`}
                              onClick={() => handleLanguageChange(lang.code)}
                            >
                              {lang.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Messages area */}
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
                    
                    {/* Typing indicator */}
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
                    
                    <div ref={endOfMessagesRef} />
                  </div>
                  
                  {/* Suggested questions */}
                  <div className="border-t border-gray-100 p-2 overflow-x-auto whitespace-nowrap">
                    <div className="flex space-x-2">
                      {predefinedQuestions.map((question, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm"
                          className="text-xs h-7 whitespace-nowrap flex-shrink-0"
                          onClick={() => handlePredefinedQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div className="border-t border-gray-200 p-3 bg-white">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={handleMicInput}
                      >
                        <Mic size={18} className="text-gray-600" />
                      </Button>
                      <Input
                        ref={inputRef}
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your question here..."
                        className="flex-1"
                      />
                      <Button
                        size="icon"
                        className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim()}
                      >
                        <Send size={16} className="text-white" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
