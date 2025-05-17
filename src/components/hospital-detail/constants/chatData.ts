
import { SupportedLanguage, MockResponse } from "../types/chat";

export const predefinedQuestions = [
  "How do I book an appointment?",
  "What are the visiting hours?",
  "Do you accept insurance?",
  "How to reach this hospital?",
  "I have severe headache and fever",
  "Analyze my symptoms: coughing and chest pain",
  "Hospitals in Gorakhpur?",
  "I'm feeling anxious with stomach pain",
  "First aid for burns?",
  "What specialist should I see for joint pain?"
];

export const mockResponses: MockResponse = {
  "How do I book an appointment?": "You can book an appointment by following these steps:\n1. Call our helpline at {contact}\n2. Use our online booking system on our website\n3. Visit the hospital reception in person\n4. Use the appointment tab on this page",
  "What are the visiting hours?": "Our visiting hours are from 10:00 AM to 8:00 PM every day. For ICU patients, there are special visiting hours from 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM.",
  "Do you accept insurance?": "Yes, we accept most major insurance providers. Please bring your insurance card and ID when you visit. You can call our billing department at {contact} to confirm if your specific insurance plan is accepted.",
  "How to reach this hospital?": "You can find our exact location on the map tab. We're located at {address}. Public transport options include buses and metro. Parking is available for private vehicles.",
  "What documents are required?": "For your first visit, please bring:\n• A valid government ID\n• Your insurance card (if applicable)\n• Previous medical records and test reports\n• Any referral letters from your primary doctor",
  "What's the emergency contact number?": "Our emergency helpline is available 24/7 at {contact}. For medical emergencies, please dial this number immediately for guidance and assistance.",
  "suggest government hospitals": "Here are some recommended government hospitals across India:\n1. AIIMS - Known for comprehensive care (Delhi, Bhopal, Jodhpur, Patna, etc.)\n2. Safdarjung Hospital - Excellent emergency services\n3. Ram Manohar Lohia Hospital - Affordable quality care\n4. JIPMER Puducherry - Advanced medical education and care\n5. PGI Chandigarh - Leading research and treatment center\n6. King George's Medical University, Lucknow - Comprehensive care in UP\n7. Medical College Kolkata - Historic institution with extensive services\nWould you like specific details about any of these?",
  "free health camps": "Government hospitals regularly organize free health camps across India, including tier-2 and tier-3 cities. The upcoming camps include:\n1. General Health Checkup Camp\n2. Eye Checkup Camp\n3. Dental Camp\n4. Women's Health Camp\nContact the hospital's public relations office for exact dates and registration.",
  "average waiting times": "Waiting times vary by department and location. Generally:\n- Morning OPD: 1-2 hours\n- Emergency: Immediate attention for critical cases\n- Specialty consultations: 30-90 minutes\n- Diagnostic tests: 1-3 hours\nTip: Coming early morning usually means shorter waiting times.",
  "hospitals in tier 2 cities": "India has excellent healthcare facilities in tier-2 cities, including:\n1. Apollo Hospitals in Bhubaneswar, Madurai, Vizag\n2. Fortis Hospitals in Mohali, Amritsar, Jaipur\n3. Medanta in Indore, Lucknow\n4. Max Healthcare in Dehradun, Bathinda\n5. Government Medical Colleges in most state capitals\nMany of these offer specialized care comparable to metro hospitals.",
  "hospitals in tier 3 cities": "Healthcare is improving in smaller cities with facilities like:\n1. District Hospitals in every district headquarters\n2. Medical Colleges in places like Gorakhpur, Rewa, Shimoga, Raichur\n3. Private multi-specialty hospitals opening branches\n4. Ayushman empaneled hospitals for affordable care\nMany patients can now get quality treatment without traveling to metros."
};

export const supportedLanguages: SupportedLanguage[] = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Bengali", code: "bn" },
  { name: "Telugu", code: "te" },
  { name: "Tamil", code: "ta" },
  { name: "Marathi", code: "mr" },
  { name: "Gujarati", code: "gu" },
  { name: "Kannada", code: "kn" },
  { name: "Malayalam", code: "ml" },
  { name: "Punjabi", code: "pa" }
];
