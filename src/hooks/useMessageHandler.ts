
import { Hospital } from '@/types';
import { Message } from '@/components/hospital-detail/types/chat';
import { generateResponse } from '@/utils/chat/responseGenerator';

export const useMessageHandler = (hospital: Hospital) => {
  const createUserMessage = (content: string): Message => ({
    id: Date.now().toString(),
    content,
    sender: "user",
    timestamp: new Date()
  });

  const createBotMessage = (content: string): Message => ({
    id: Date.now().toString(),
    content,
    sender: "bot",
    timestamp: new Date()
  });

  return {
    generateResponse: (currentMessage: string) => generateResponse(currentMessage, hospital),
    createUserMessage,
    createBotMessage
  };
};
