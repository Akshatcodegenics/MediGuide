import { Hospital } from '@/types';
import { Message } from '@/components/hospital-detail/types/chat';
import { mockResponses } from '@/components/hospital-detail/constants/chatData';

// Medical specialties mapping for symptom analysis
const symptomToSpecialty: Record<string, string[]> = {
  // Heart related
  "chest pain": ["Cardiology", "Emergency Medicine"],
  "heart palpitations": ["Cardiology"],
  "shortness of breath": ["Cardiology", "Pulmonology"],
  "high blood pressure": ["Cardiology", "Internal Medicine"],
  
  // Digestive system
  "stomach pain": ["Gastroenterology"],
  "indigestion": ["Gastroenterology"],
  "nausea": ["Gastroenterology", "General Medicine"],
  "vomiting": ["Gastroenterology", "Emergency Medicine"],
  "diarrhea": ["Gastroenterology"],
  "constipation": ["Gastroenterology"],
  
  // Respiratory
  "cough": ["Pulmonology", "ENT"],
  "sore throat": ["ENT", "General Medicine"],
  "runny nose": ["ENT", "Allergy and Immunology"],
  "difficulty breathing": ["Pulmonology", "Emergency Medicine"],
  
  // Musculoskeletal
  "joint pain": ["Orthopedics", "Rheumatology"],
  "back pain": ["Orthopedics", "Neurology"],
  "muscle pain": ["Orthopedics", "Physical Therapy"],
  
  // Neurological
  "headache": ["Neurology"],
  "migraine": ["Neurology"],
  "dizziness": ["Neurology", "ENT"],
  "memory problems": ["Neurology", "Psychiatry"],
  
  // Mental health
  "depression": ["Psychiatry", "Psychology"],
  "anxiety": ["Psychiatry", "Psychology"],
  "stress": ["Psychiatry", "Psychology"],
  "mood swings": ["Psychiatry"],
  "insomnia": ["Psychiatry", "Sleep Medicine"],
  
  // Skin
  "rash": ["Dermatology", "Allergy and Immunology"],
  "skin infection": ["Dermatology"],
  "acne": ["Dermatology"],
  
  // Eye
  "blurry vision": ["Ophthalmology"],
  "eye pain": ["Ophthalmology"],
  "red eye": ["Ophthalmology"],
  
  // General
  "fever": ["General Medicine", "Infectious Disease"],
  "fatigue": ["General Medicine", "Endocrinology"],
  "weight loss": ["Endocrinology", "Gastroenterology"],
  "weight gain": ["Endocrinology", "Nutrition"],
  
  // Women's health
  "menstrual pain": ["Gynecology"],
  "pregnancy": ["Obstetrics and Gynecology"],
  "breast pain": ["Gynecology", "Oncology"],
  
  // Urinary
  "urinary problems": ["Urology", "Nephrology"],
  "kidney pain": ["Nephrology", "Urology"],
  
  // Children
  "childhood illness": ["Pediatrics"],
  
  // Ear, nose, and throat
  "ear pain": ["ENT"],
  "hearing loss": ["ENT", "Audiology"],
  
  // Other
  "diabetes": ["Endocrinology"],
  "allergy": ["Allergy and Immunology"],
  "vaccination": ["Preventive Medicine"]
};

// Common first aid and precautions
const firstAidAdvice: Record<string, string> = {
  "fever": "Take rest, stay hydrated, and use a cold compress if temperature is high. Take paracetamol if needed after consulting with a healthcare provider.",
  "headache": "Rest in a quiet, dark room. Apply a cold or warm compress to your forehead or neck. Stay hydrated and avoid triggers like loud sounds and bright lights.",
  "cuts": "Clean the wound with soap and water, apply pressure to stop bleeding, apply an antiseptic, and cover with a sterile bandage.",
  "burns": "Run cool (not cold) water over the burn for 10-15 minutes. Do not apply ice directly. Cover with a clean, dry cloth.",
  "sprains": "Remember RICE: Rest, Ice, Compression, and Elevation. Avoid putting weight on the injured area.",
  "fractures": "Immobilize the area, apply ice to reduce swelling, and seek immediate medical attention.",
  "choking": "Perform the Heimlich maneuver if someone is choking and unable to speak.",
  "heart attack": "Call emergency services immediately. Have the person sit down and rest while waiting for help.",
  "stroke": "Remember FAST: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services.",
  "poisoning": "Call poison control immediately. Do not induce vomiting unless instructed by medical professionals.",
  "dehydration": "Drink small amounts of water frequently. For severe dehydration, oral rehydration solutions are recommended.",
  "heat exhaustion": "Move to a cooler place, drink water, and apply cool compresses.",
  "allergic reaction": "Remove the allergen if possible. For severe reactions with difficulty breathing, seek emergency help immediately.",
  "insect bites": "Clean the area, apply a cold compress to reduce swelling, and use anti-itch cream if needed."
};

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
  ],
  // Added more location-specific responses for cities across India
  "locations": [
    "We have partner hospitals across India including in non-metro cities like Noida, Gorakhpur, Patna, Lucknow, Jaipur, and many more.",
    "Our healthcare network extends to over 100 cities across India, including tier-2 and tier-3 cities.",
    "You can find quality healthcare in your city through our network of affiliated hospitals and clinics throughout India."
  ],
  "tier2cities": [
    "We provide comprehensive healthcare services in tier-2 cities like Bhopal, Indore, Kanpur, Lucknow, Nagpur, Vadodara, and many others.",
    "Our hospital network includes facilities in growing cities like Varanasi, Patna, Ranchi, Raipur, and Visakhapatnam.",
    "Quality healthcare is available through our partner hospitals in cities like Allahabad, Jalandhar, Ludhiana, and Chandigarh."
  ],
  "tier3cities": [
    "We ensure healthcare access in smaller cities like Gorakhpur, Siliguri, Jammu, Jodhpur, and similar tier-3 cities across India.",
    "Our affiliated medical facilities serve patients in places like Aligarh, Moradabad, Saharanpur, and other developing urban areas.",
    "Through our network, patients can access specialized care in cities like Bareilly, Tirupati, Ajmer, and similar locations."
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

  // Analyze symptoms and recommend specialists
  const analyzeSymptoms = (symptoms: string): string => {
    const lowerSymptoms = symptoms.toLowerCase();
    const detectedSymptoms: string[] = [];
    const recommendedSpecialties = new Set<string>();
    let firstAidRecommendation = "";
    
    // Detect symptoms from the user input
    for (const symptom of Object.keys(symptomToSpecialty)) {
      if (lowerSymptoms.includes(symptom)) {
        detectedSymptoms.push(symptom);
        
        // Add corresponding specialties
        for (const specialty of symptomToSpecialty[symptom]) {
          recommendedSpecialties.add(specialty);
        }
        
        // Check if we have first aid advice for this symptom
        for (const condition of Object.keys(firstAidAdvice)) {
          if (symptom.includes(condition) || condition.includes(symptom)) {
            firstAidRecommendation = firstAidAdvice[condition];
            break;
          }
        }
      }
    }
    
    // If no symptoms detected
    if (detectedSymptoms.length === 0) {
      return "I couldn't identify specific symptoms from your description. Please describe your symptoms more clearly, such as 'headache', 'stomach pain', or 'fever'.";
    }
    
    // Create response
    let response = `Based on your described symptoms (${detectedSymptoms.join(", ")}), I would recommend consulting with the following specialists:\n\n`;
    
    response += Array.from(recommendedSpecialties).map(specialty => `- ${specialty}`).join('\n');
    
    // Add first aid advice if available
    if (firstAidRecommendation) {
      response += `\n\n**First Aid/Precautions:**\n${firstAidRecommendation}`;
    }
    
    response += `\n\nPlease note: This is not a substitute for professional medical advice. If you're experiencing severe symptoms, please seek immediate medical attention.`;
    
    // Check if hospital has any of the recommended specialties
    const matchingSpecialties = hospital.specialties.filter(s => 
      Array.from(recommendedSpecialties).some(r => 
        s.toLowerCase().includes(r.toLowerCase())
      )
    );
    
    if (matchingSpecialties.length > 0) {
      response += `\n\nGood news! ${hospital.name} offers services in ${matchingSpecialties.join(", ")}. Would you like to schedule an appointment?`;
    }
    
    return response;
  };

  // Analyze mood from text
  const analyzeMood = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Simple mood detection patterns
    const moodPatterns = {
      anxious: ["anxious", "worried", "nervous", "anxiety", "panic", "stress", "stressed"],
      sad: ["sad", "unhappy", "depressed", "depression", "down", "blue", "upset", "grief"],
      angry: ["angry", "frustrated", "annoyed", "mad", "irritated", "furious"],
      happy: ["happy", "good", "great", "excellent", "wonderful", "fantastic"],
      fearful: ["afraid", "scared", "frightened", "terrified", "fear"],
      tired: ["tired", "exhausted", "fatigue", "sleepy", "drowsy", "lethargic"]
    };
    
    // Check for mood indicators
    for (const [mood, indicators] of Object.entries(moodPatterns)) {
      for (const indicator of indicators) {
        if (lowerText.includes(indicator)) {
          switch(mood) {
            case "anxious":
              return "I notice you might be feeling anxious. Anxiety can affect your physical health too. Consider speaking with a mental health professional along with addressing your physical symptoms.";
            case "sad":
              return "I sense you might be feeling down. Your emotional wellbeing is just as important as your physical health. I'd recommend considering both as you seek medical care.";
            case "angry":
              return "I understand you might be frustrated. It's important to address both your physical symptoms and any stress you're experiencing.";
            case "happy":
              return "I'm glad to hear you're in good spirits despite not feeling well physically. A positive outlook can help with recovery!";
            case "fearful":
              return "It seems you might be concerned or scared about your symptoms. This is completely natural, but remember that getting proper medical advice is the best way to address health concerns.";
            case "tired":
              return "You seem to be experiencing fatigue. Rest is important, but persistent tiredness can also be a symptom that should be evaluated by a healthcare professional.";
          }
        }
      }
    }
    
    return "";
  };

  const generateResponse = (currentMessage: string): string => {
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
      const symptomAnalysis = analyzeSymptoms(currentMessage);
      
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
        responseContent = formatResponse(getRandomResponse("tier3cities"));
      } else if (lowerCaseMessage.includes("tier 2")) {
        responseContent = formatResponse(getRandomResponse("tier2cities"));
      } else {
        responseContent = formatResponse(getRandomResponse("locations"));
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
Would you like more specific information about any of these hospitals?`);
    }
    
    // Check for greetings
    if (/^(hi|hello|hey|greetings)/i.test(lowerCaseMessage.trim())) {
      return formatResponse(`Hello there! 👋 Welcome to ${hospital.name}'s AI assistant. How may I help you today? You can ask about our services, doctors, booking appointments, facilities, or describe your symptoms for specialist recommendations.`);
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
