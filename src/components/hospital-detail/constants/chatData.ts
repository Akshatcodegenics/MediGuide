import { SupportedLanguage, MockResponse } from "../types/chat";

export const predefinedQuestions = [
  "How do I book an appointment?",
  "What are the visiting hours?",
  "Do you accept insurance?",
  "How to reach this hospital?",
  "What documents are required?",
  "What's the emergency contact number?",
  "Suggest government hospitals nearby",
  "What are the average waiting times?",
  "Tell me about specialty departments",
  "Are there any free health camps?"
];

export const mockResponses: MockResponse = {
  "How do I book an appointment?": "You can book an appointment by following these steps:\n1. Call our helpline at {contact}\n2. Use our online booking system on our website\n3. Visit the hospital reception in person\n4. Use the appointment tab on this page",
  "What are the visiting hours?": "Our visiting hours are from 10:00 AM to 8:00 PM every day. For ICU patients, there are special visiting hours from 11:00 AM to 12:00 PM and 5:00 PM to 6:00 PM.",
  "Do you accept insurance?": "Yes, we accept most major insurance providers. Please bring your insurance card and ID when you visit. You can call our billing department at {contact} to confirm if your specific insurance plan is accepted.",
  "How to reach this hospital?": "You can find our exact location on the map tab. We're located at {address}. Public transport options include buses and metro. Parking is available for private vehicles.",
  "What documents are required?": "For your first visit, please bring:\n• A valid government ID\n• Your insurance card (if applicable)\n• Previous medical records and test reports\n• Any referral letters from your primary doctor",
  "What's the emergency contact number?": "Our emergency helpline is available 24/7 at {contact}. For medical emergencies, please dial this number immediately for guidance and assistance.",
  "suggest government hospitals": "Here are some recommended government hospitals:\n1. AIIMS - Known for comprehensive care\n2. Safdarjung Hospital - Excellent emergency services\n3. Ram Manohar Lohia Hospital - Affordable quality care\n4. GB Pant Hospital - Specialized cardiac and neurology care\nWould you like specific details about any of these?",
  "free health camps": "Government hospitals regularly organize free health camps. The upcoming camps include:\n1. General Health Checkup Camp\n2. Eye Checkup Camp\n3. Dental Camp\n4. Women's Health Camp\nContact the hospital's public relations office for exact dates and registration.",
  "average waiting times": "Waiting times vary by department and time of day. Generally:\n- Morning OPD: 1-2 hours\n- Emergency: Immediate attention for critical cases\n- Specialty consultations: 30-90 minutes\n- Diagnostic tests: 1-3 hours\nTip: Coming early morning usually means shorter waiting times."
};

export const supportedLanguages: SupportedLanguage[] = [
  { name: "English", code: "en" },
  { name: "Hindi", code: "hi" },
  { name: "Spanish", code: "es" },
  { name: "French", code: "fr" },
  { name: "German", code: "de" },
  { name: "Chinese", code: "zh" },
  { name: "Japanese", code: "ja" },
  { name: "Arabic", code: "ar" },
  { name: "Russian", code: "ru" },
  { name: "Portuguese", code: "pt" }
];
