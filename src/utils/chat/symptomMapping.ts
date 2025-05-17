// Symptom to specialty mapping and first aid advice

// Medical specialties mapping for symptom analysis
export const symptomToSpecialty: Record<string, string[]> = {
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
export const firstAidAdvice: Record<string, string> = {
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
