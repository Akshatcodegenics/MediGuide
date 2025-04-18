
import { useState, useRef, useEffect } from 'react';
import { Message } from '@/components/hospital-detail/types/chat';
import { Hospital } from '@/types';
import { useMessageHandler } from './useMessageHandler';

export const useChatState = (hospital: Hospital) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { generateResponse, createUserMessage, createBotMessage } = useMessageHandler(hospital);

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessage = createBotMessage(
        `👋 Hello! I'm your AI assistant for ${hospital.name}. How can I help you today?`
      );
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
    
    const userMessage = createUserMessage(currentMessage);
    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage("");
    setIsTyping(true);
    
    const responseContent = generateResponse(currentMessage);
    
    setTimeout(() => {
      const botMessage = createBotMessage(responseContent);
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
