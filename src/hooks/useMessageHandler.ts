
import { Hospital } from '@/types';
import { Message } from '@/components/hospital-detail/types/chat';
import { mockResponses } from '@/components/hospital-detail/constants/chatData';

const enhancedResponses: Record<string, string[]> = {
  "treatments": [
    "At {hospital}, we offer a range of treatments including specialized surgical procedures, non-invasive therapies, and preventative care programs tailored to each patient's needs.",
    "The medical team at {hospital} is trained in the latest treatment protocols and uses state-of-the-art equipment for optimal patient outcomes.",
    "{hospital} specializes in treatments for {specialties}, with dedicated specialists available for consultations."
  ],
  "doctors": [
    "{hospital} is proud to host over {doctorCount} experienced medical professionals across various specialties.",
    "Our doctors at {hospital} include specialists in {specialties}, all committed to providing compassionate care.",
    "The medical team at {hospital} is led by renowned physicians who are pioneers in their respective fields."
  ],
  "facilities": [
    "{hospital} features modern facilities including advanced operating theaters, diagnostic imaging centers, and comfortable patient rooms.",
    "Our facilities at {hospital} are designed with patient comfort in mind, with private rooms, family waiting areas, and accessible amenities.",
    "The state-of-the-art infrastructure at {hospital} includes the latest medical technologies and equipment for accurate diagnosis and effective treatment."
  ],
  "emergency": [
    "The emergency department at {hospital} is open 24/7 and equipped to handle all types of medical emergencies.",
    "For emergencies, please come directly to {hospital}'s emergency entrance or call our emergency hotline at {contact}.",
    "{hospital} has a dedicated trauma team ready to respond to critical emergencies with rapid assessment and intervention."
  ],
  "insurance": [
    "{hospital} accepts most major insurance plans and our staff can assist with verifying your coverage before treatment.",
    "We work with various insurance providers to ensure our patients at {hospital} receive the maximum benefits available.",
    "For questions about insurance coverage at {hospital}, please contact our billing department or bring your insurance information during your visit."
  ],
  "covid": [
    "{hospital} follows strict COVID-19 protocols including screening, sanitization, and separate treatment areas for COVID patients.",
    "We have implemented comprehensive safety measures at {hospital} to protect patients and staff during the pandemic.",
    "For COVID-19 testing and treatment options at {hospital}, please call our dedicated COVID helpline before visiting."
  ],
  "pharmacy": [
    "{hospital} has an in-house pharmacy that stocks a wide range of medications and medical supplies.",
    "Our pharmacy at {hospital} is open from 8 AM to 8 PM daily, with extended hours for emergencies.",
    "Patients at {hospital} can have their prescriptions filled at our pharmacy or delivered to their rooms during their stay."
  ],
  "parking": [
    "{hospital} provides both free and paid parking options for patients and visitors.",
    "Valet parking is available at the main entrance of {hospital} for a nominal fee.",
    "There are designated parking spaces near all entrances of {hospital} for patients with disabilities."
  ],
  "visiting": [
    "Visiting hours at {hospital} are from 10 AM to 8 PM daily, with restrictions in intensive care units.",
    "We encourage family support at {hospital}, with comfortable waiting areas and accommodations for overnight stays when necessary.",
    "To ensure patient rest and recovery, {hospital} limits visitors to two per patient at any given time."
  ],
  "nutrition": [
    "{hospital} provides personalized dietary services to meet specific nutritional needs and preferences.",
    "Our nutrition team at {hospital} works closely with doctors to create meal plans that support patient recovery.",
    "Special dietary requirements, including religious and cultural preferences, are accommodated at {hospital}."
  ],
  "rehabilitation": [
    "{hospital} offers comprehensive rehabilitation services including physical therapy, occupational therapy, and speech therapy.",
    "Our rehabilitation center at {hospital} features specialized equipment and trained therapists for optimal recovery.",
    "Patients at {hospital} receive individualized rehabilitation plans designed to restore function and improve quality of life."
  ],
  "telemedicine": [
    "{hospital} provides telemedicine services for follow-up consultations and non-emergency medical advice.",
    "Virtual appointments at {hospital} can be scheduled through our website or by calling our appointment line.",
    "Telemedicine at {hospital} ensures continued care for patients who cannot visit in person, with secure and private video consultations."
  ],
  "languages": [
    "{hospital} offers interpretation services for patients who speak languages other than English.",
    "Our staff at {hospital} includes professionals fluent in multiple languages to assist diverse patient populations.",
    "For language assistance at {hospital}, please inform the reception desk when scheduling your appointment."
  ]
};

export const useMessageHandler = (hospital: Hospital) => {
  // Get a random response from the array of responses for a category
  const getRandomResponse = (category: string): string => {
    const responses = enhancedResponses[category] || [mockResponses[category] || ""];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Format response with hospital data
  const formatResponse = (response: string): string => {
    return response
      .replace(/\{hospital\}/g, hospital.name)
      .replace(/\{contact\}/g, hospital.contact || "our contact number")
      .replace(/\{address\}/g, hospital.address || "our address")
      .replace(/\{specialties\}/g, hospital.specialties?.join(', ') || "various medical fields")
      .replace(/\{doctorCount\}/g, (hospital.id * 10 + 5).toString()); // Mock doctor count based on hospital ID
  };

  const generateResponse = (currentMessage: string): string => {
    let responseContent = "I'm not sure about that. Can you ask something else about the hospital or booking appointments?";
    
    const lowerCaseMessage = currentMessage.toLowerCase();
    
    // Check for contextual queries
    if (lowerCaseMessage.includes('suggest') || lowerCaseMessage.includes('recommend')) {
      return formatResponse(`Based on your medical needs, I can suggest these hospitals:\n
1. ${hospital.name} - Specializing in ${hospital.specialties.join(', ')}\n
2. AIIMS (All India Institute of Medical Sciences) - Government hospital with comprehensive care\n
3. Safdarjung Hospital - Another excellent government option\n
4. Ram Manohar Lohia Hospital - Known for affordable quality care\n
Would you like more specific information about any of these hospitals?`);
    }
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings)/i.test(lowerCaseMessage.trim())) {
      return formatResponse(`Hello there! 👋 Welcome to ${hospital.name}'s AI assistant. How may I help you today? You can ask about our services, doctors, booking appointments, or facilities.`);
    }
    
    // Check for thanks
    if (/thank you|thanks|thx/i.test(lowerCaseMessage)) {
      return "You're welcome! Is there anything else you'd like to know about the hospital or your healthcare needs?";
    }
    
    // Check for predefined questions and categories
    for (const category of Object.keys(enhancedResponses)) {
      if (lowerCaseMessage.includes(category)) {
        responseContent = formatResponse(getRandomResponse(category));
        break;
      }
    }
    
    // Check original mock responses if no match found in enhanced responses
    if (responseContent === "I'm not sure about that. Can you ask something else about the hospital or booking appointments?") {
      for (const question of Object.keys(mockResponses)) {
        if (lowerCaseMessage.includes(question.toLowerCase())) {
          responseContent = formatResponse(mockResponses[question]);
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

Would you like me to guide you through the online booking process?`);
    }
    
    // Handle location or directions queries
    if (lowerCaseMessage.includes('where') || lowerCaseMessage.includes('location') || lowerCaseMessage.includes('direction') || lowerCaseMessage.includes('address')) {
      responseContent = formatResponse(`${hospital.name} is located at ${hospital.address || "our registered address"}. 

You can view our exact location on the interactive map in the "Map" tab. The map shows nearby landmarks, parking facilities, and public transport options.

Would you like directions from a specific location?`);
    }
    
    // Handle emergency-related queries with high priority
    if (lowerCaseMessage.includes('emergency') || lowerCaseMessage.includes('urgent') || lowerCaseMessage.includes('critical')) {
      responseContent = formatResponse(`For medical emergencies, please call ${hospital.contact || "our emergency number"} immediately or visit our 24/7 emergency department located at the east entrance of ${hospital.name}.

Our emergency team is equipped to handle all types of medical emergencies with minimal waiting time. If you're experiencing severe symptoms like chest pain, difficulty breathing, or severe bleeding, please seek immediate medical attention.`);
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
