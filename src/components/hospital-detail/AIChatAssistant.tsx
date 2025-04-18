import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Hospital } from "@/types";
import { Message } from "./types/chat";
import { ChatHeader } from "./chat/ChatHeader";
import { LanguageSelector } from "./chat/LanguageSelector";
import { ChatMessages } from "./chat/ChatMessages";
import { MessageInput } from "./chat/MessageInput";
import { SuggestedQuestions } from "./chat/SuggestedQuestions";

// Mock data imports moved to constants
import { predefinedQuestions, mockResponses, supportedLanguages } from "./constants/chatData";

interface AIChatAssistantProps {
  hospital: Hospital;
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

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    
    let responseContent = "I'm not sure about that. Can you ask something else about the hospital or booking appointments?";
    
    for (const question of Object.keys(mockResponses)) {
      if (currentMessage.toLowerCase().includes(question.toLowerCase())) {
        responseContent = mockResponses[question]
          .replace("{contact}", hospital.contact || "our contact number")
          .replace("{address}", hospital.address || "our address");
        break;
      }
    }
    
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
    
    if (
      currentMessage.toLowerCase().includes("special") || 
      currentMessage.toLowerCase().includes("department") || 
      currentMessage.toLowerCase().includes("treatment")
    ) {
      responseContent = `${hospital.name} specializes in: ${hospital.specialties.join(", ")}. Which specific specialty are you interested in?`;
    }
    
    const botMessage: Message = {
      id: Date.now().toString(),
      content: responseContent,
      sender: "bot",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, botMessage]);
    setIsTyping(false);
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
    
    setTimeout(() => {
      setCurrentMessage("I want to book an appointment");
      toast({
        title: "Voice captured",
        description: "Message has been transcribed",
      });
    }, 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
      
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
            <ChatHeader
              hospital={hospital}
              isMinimized={isMinimized}
              toggleMinimize={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              onClose={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col h-[430px]"
                >
                  <LanguageSelector
                    activeLanguage={activeLanguage}
                    supportedLanguages={supportedLanguages}
                    showLanguages={showLanguages}
                    onToggleLanguages={() => setShowLanguages(!showLanguages)}
                    onLanguageChange={handleLanguageChange}
                  />
                  
                  <ChatMessages
                    messages={messages}
                    isTyping={isTyping}
                    formatTime={formatTime}
                  />
                  
                  <SuggestedQuestions
                    questions={predefinedQuestions}
                    onQuestionSelect={handlePredefinedQuestion}
                  />
                  
                  <MessageInput
                    currentMessage={currentMessage}
                    onMessageChange={(e) => setCurrentMessage(e.target.value)}
                    onSendMessage={handleSendMessage}
                    onMicInput={handleMicInput}
                    onKeyPress={handleKeyPress}
                    inputRef={inputRef}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
