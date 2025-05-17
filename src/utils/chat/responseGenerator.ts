
import { Hospital } from '@/types';
import { mockResponses } from '@/components/hospital-detail/constants/chatData';
import { enhancedResponses } from './responseData';
import { analyzeSymptoms } from './symptomAnalyzer';
import { analyzeMood } from './moodAnalyzer';

// Get a random response from the array of responses for a category
export const getRandomResponse = (category: string): string => {
  const responses = enhancedResponses[category] || [mockResponses[category] || ""];
  return responses[Math.floor(Math.random() * responses.length)];
};

// Format response with hospital data
export const formatResponse = (response: string, hospital: Hospital): string => {
  return response
    .replace(/\{hospital\}/g, hospital.name)
    .replace(/\{contact\}/g, hospital.contact || "our contact number")
    .replace(/\{address\}/g, hospital.address || "our address")
    .replace(/\{specialties\}/g, hospital.specialties?.join(', ') || "various medical fields")
    .replace(/\{doctorCount\}/g, (hospital.id * 10 + 5).toString()); // Mock doctor count based on hospital ID
};

export const generateResponse = (currentMessage: string, hospital: Hospital): string => {
  let responseContent = "I'm not sure about that. Can you ask something else about the hospital or booking appointments?";
  
  const lowerCaseMessage = currentMessage.toLowerCase();
  
  // Check for mood and symptoms analysis request
  if (lowerCaseMessage.includes("analyze") || 
      lowerCaseMessage.includes("symptom") || 
      lowerCaseMessage.includes("feel") || 
      lowerCaseMessage.includes("experiencing") ||
      lowerCaseMessage.includes("suffering") ||
      lowerCaseMessage.includes("pain") ||
      lowerCaseMessage.includes("ache")) {
    
    const moodAnalysis = analyzeMood(currentMessage);
    const symptomAnalysis = analyzeSymptoms(currentMessage, hospital);
    
    if (moodAnalysis && symptomAnalysis) {
      return `${moodAnalysis}\n\n${symptomAnalysis}`;
    } else if (symptomAnalysis) {
      return symptomAnalysis;
    } else if (moodAnalysis) {
      return `${moodAnalysis}\n\nCould you please describe any physical symptoms you're experiencing so I can provide better guidance?`;
    }
  }
  
  // Check for non-metro city queries
  if (lowerCaseMessage.includes("noida") || 
      lowerCaseMessage.includes("gorakhpur") || 
      lowerCaseMessage.includes("tier 2") ||
      lowerCaseMessage.includes("tier 3") ||
      lowerCaseMessage.includes("small city") ||
      lowerCaseMessage.includes("non-metro") ||
      lowerCaseMessage.includes("non metro")) {
    
    if (lowerCaseMessage.includes("tier 3") || lowerCaseMessage.includes("small")) {
      responseContent = formatResponse(getRandomResponse("tier3cities"), hospital);
    } else if (lowerCaseMessage.includes("tier 2")) {
      responseContent = formatResponse(getRandomResponse("tier2cities"), hospital);
    } else {
      responseContent = formatResponse(getRandomResponse("locations"), hospital);
    }
    
    return responseContent;
  }
  
  // Check for contextual queries
  if (lowerCaseMessage.includes('suggest') || lowerCaseMessage.includes('recommend')) {
    return formatResponse(`Based on your medical needs, I can suggest these hospitals:\n
1. ${hospital.name} - Specializing in ${hospital.specialties.join(', ')}\n
2. AIIMS (All India Institute of Medical Sciences) - Government hospital with comprehensive care\n
3. Safdarjung Hospital - Another excellent government option\n
4. Ram Manohar Lohia Hospital - Known for affordable quality care\n
Would you like more specific information about any of these hospitals?`, hospital);
  }
  
  // Check for greetings
  if (/^(hi|hello|hey|greetings)/i.test(lowerCaseMessage.trim())) {
    return formatResponse(`Hello there! 👋 Welcome to ${hospital.name}'s AI assistant. How may I help you today? You can ask about our services, doctors, booking appointments, facilities, or describe your symptoms for specialist recommendations.`, hospital);
  }
  
  // Check for thanks
  if (/thank you|thanks|thx/i.test(lowerCaseMessage)) {
    return "You're welcome! Is there anything else you'd like to know about the hospital or your healthcare needs?";
  }
  
  // Check for predefined questions and categories
  for (const category of Object.keys(enhancedResponses)) {
    if (lowerCaseMessage.includes(category)) {
      responseContent = formatResponse(getRandomResponse(category), hospital);
      break;
    }
  }
  
  // Check original mock responses if no match found in enhanced responses
  if (responseContent === "I'm not sure about that. Can you ask something else about the hospital or booking appointments?") {
    for (const question of Object.keys(mockResponses)) {
      if (lowerCaseMessage.includes(question.toLowerCase())) {
        responseContent = formatResponse(mockResponses[question], hospital);
        break;
      }
    }
  }
  
  // Handle appointment-related queries
  if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('schedule')) {
    responseContent = formatResponse(`To book an appointment at ${hospital.name}, you can:
    
1. Call our appointment desk at ${hospital.contact || "our main contact number"}
2. Visit our website and use the online booking form
3. Use the "Book Appointment" tab on this page to see available slots
4. Walk in to our reception desk between 9am and 5pm

Would you like me to guide you through the online booking process?`, hospital);
  }
  
  // Handle location or directions queries
  if (lowerCaseMessage.includes('where') || lowerCaseMessage.includes('location') || lowerCaseMessage.includes('direction') || lowerCaseMessage.includes('address')) {
    responseContent = formatResponse(`${hospital.name} is located at ${hospital.address || "our registered address"}. 

You can view our exact location on the interactive map in the "Map" tab. The map shows nearby landmarks, parking facilities, and public transport options.

Would you like directions from a specific location?`, hospital);
  }
  
  // Handle emergency-related queries with high priority
  if (lowerCaseMessage.includes('emergency') || lowerCaseMessage.includes('urgent') || lowerCaseMessage.includes('critical')) {
    responseContent = formatResponse(`For medical emergencies, please call ${hospital.contact || "our emergency number"} immediately or visit our 24/7 emergency department located at the east entrance of ${hospital.name}.

Our emergency team is equipped to handle all types of medical emergencies with minimal waiting time. If you're experiencing severe symptoms like chest pain, difficulty breathing, or severe bleeding, please seek immediate medical attention.`, hospital);
  }
  
  return responseContent;
};
