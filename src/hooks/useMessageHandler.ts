
import { Hospital } from '@/types';
import { Message } from '@/components/hospital-detail/types/chat';
import { mockResponses } from '@/components/hospital-detail/constants/chatData';

export const useMessageHandler = (hospital: Hospital) => {
  const generateResponse = (currentMessage: string): string => {
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
    
    return responseContent;
  };

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
    generateResponse,
    createUserMessage,
    createBotMessage
  };
};
