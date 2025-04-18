import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Hospital } from "@/types";
import { Message } from "./types/chat";
import { ChatHeader } from "./chat/ChatHeader";
import { LanguageSelector } from "./chat/LanguageSelector";
import { ChatMessages } from "./chat/ChatMessages";
import { MessageInput } from "./chat/MessageInput";
import { SuggestedQuestions } from "./chat/SuggestedQuestions";
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

  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognitionAPI();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result: SpeechRecognitionResult) => result[0])
          .map((result: SpeechRecognitionAlternative) => result.transcript)
          .join('');
        
        setCurrentMessage(transcript);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "There was an error with voice recognition. Please try again.",
          variant: "destructive",
        });
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      if (!recognition.current) {
        toast({
          title: "Voice Input Not Available",
          description: "Your browser doesn't support voice recognition.",
          variant: "destructive",
        });
        return;
      }
      
      recognition.current.start();
      setIsListening(true);
      toast({
        title: "Voice Input Active",
        description: "Speak clearly into your microphone",
      });
    }
  };

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
    
    const lowerCaseMessage = currentMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('suggest') || lowerCaseMessage.includes('recommend')) {
      responseContent = `Based on your medical needs, I can suggest these hospitals:\n
1. ${hospital.name} - Specializing in ${hospital.specialties.join(', ')}\n
2. AIIMS (All India Institute of Medical Sciences) - Government hospital with comprehensive care\n
3. Safdarjung Hospital - Another excellent government option\n
4. Ram Manohar Lohia Hospital - Known for affordable quality care\n
Would you like more specific information about any of these hospitals?`;
    }
    
    for (const question of Object.keys(mockResponses)) {
      if (lowerCaseMessage.includes(question.toLowerCase())) {
        responseContent = mockResponses[question]
          .replace("{contact}", hospital.contact || "our contact number")
          .replace("{address}", hospital.address || "our address");
        break;
      }
    }
    
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: responseContent,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
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
                    onMicInput={toggleVoiceInput}
                    onKeyPress={handleKeyPress}
                    inputRef={inputRef}
                    isListening={isListening}
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
