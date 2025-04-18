
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/components/hospital-detail/types/chat';
import { Hospital } from '@/types';
import { mockResponses } from '@/components/hospital-detail/constants/chatData';

export const useChatState = (hospital: Hospital) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = {
        id: Date.now().toString(),
        content: `👋 Hello! I'm your AI assistant for ${hospital.name}. How can I help you today?`,
        sender: "bot" as const,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
    }
  }, [hospital.name, messages.length]);

  useEffect(() => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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

  return {
    messages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    endOfMessagesRef,
    inputRef,
    handleSendMessage
  };
};
