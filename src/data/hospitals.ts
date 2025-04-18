import { Hospital } from "@/types";

export const hospitals: Hospital[] = [
  {
    id: 1,
    name: "Apollo Hospitals",
    location: "Delhi",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    waitingTime: 45,
    fees: 1500,
    rating: 4.7,
    category: "private",
    address: "Sarita Vihar, Delhi-Mathura Road, New Delhi, Delhi 110076",
    contact: "+91-11-2692-5858",
    email: "info@apollohospitals.com",
    website: "www.apollohospitals.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1500,
      max: 25000
    }
  },
  {
    id: 2,
    name: "Fortis Healthcare",
    location: "Mumbai",
    specialties: ["Gastroenterology", "Dermatology", "Pulmonology", "ENT"],
    waitingTime: 30,
    fees: 1800,
    rating: 4.5,
    category: "private",
    address: "Mulund Goregaon Link Road, Mumbai, Maharashtra 400078",
    contact: "+91-22-4925-4925",
    email: "enquiries@fortishealthcare.com",
    website: "www.fortishealthcare.com",
    appointmentSteps: [
      "Call the hospital appointment helpline",
      "Provide your personal details and medical concern",
      "Select your preferred doctor or let them assign one",
      "Choose from available appointment slots",
      "Confirm your appointment",
      "Arrive 30 minutes before your scheduled time"
    ],
    estimatedCost: {
      min: 1800,
      max: 30000
    }
  },
  {
    id: 3,
    name: "Max Super Speciality Hospital",
    location: "Delhi",
    specialties: ["Cardiology", "Nephrology", "Neurology", "Gastroenterology"],
    waitingTime: 60,
    fees: 1200,
    rating: 4.6,
    category: "private",
    address: "Delhi, India",
    contact: "+91-11-2692-5858",
    email: "info@maxhospitals.com",
    website: "www.maxhospitals.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1200,
      max: 25000
    }
  },
  {
    id: 4,
    name: "Medanta - The Medicity",
    location: "Gurugram",
    specialties: ["Liver", "Cardiology", "Neurosurgery", "Oncology"],
    waitingTime: 40,
    fees: 2000,
    rating: 4.8,
    category: "private",
    address: "Gurugram, India",
    contact: "+91-120-2692-5858",
    email: "info@medanta.com",
    website: "www.medanta.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 2000,
      max: 25000
    }
  },
  {
    id: 5,
    name: "AIIMS",
    location: "Delhi",
    specialties: ["General Medicine", "Cardiology", "Neurology", "Oncology"],
    waitingTime: 90,
    fees: 200,
    rating: 4.4,
    category: "government",
    address: "Ansari Nagar East, New Delhi, Delhi 110029",
    contact: "+91-11-2658-8500",
    email: "info@aiims.edu",
    website: "www.aiims.edu",
    appointmentSteps: [
      "Register on AIIMS online portal or in person",
      "Obtain a UHID (Unique Hospital ID) number",
      "Book an appointment through the online system",
      "Pay the registration fee (Rs 10 for general category)",
      "Receive appointment slip with date and time",
      "Bring all medical records and government ID on appointment day"
    ],
    estimatedCost: {
      min: 10,
      max: 5000
    }
  },
  {
    id: 6,
    name: "Lilavati Hospital",
    location: "Mumbai",
    specialties: ["Orthopedics", "Gastroenterology", "Urology", "Cardiology"],
    waitingTime: 35,
    fees: 1700,
    rating: 4.6,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@lilavati.com",
    website: "www.lilavati.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1700,
      max: 25000
    }
  },
  {
    id: 7,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    location: "Mumbai",
    specialties: ["Neurology", "Oncology", "Cardiac Sciences", "Liver"],
    waitingTime: 50,
    fees: 2200,
    rating: 4.7,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@kakilaben.com",
    website: "www.kakilaben.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 2200,
      max: 25000
    }
  },
  {
    id: 8,
    name: "Manipal Hospitals",
    location: "Bangalore",
    specialties: ["Cardiology", "Orthopedics", "Nephrology", "Neurology"],
    waitingTime: 40,
    fees: 1300,
    rating: 4.5,
    category: "private",
    address: "Bangalore, India",
    contact: "+91-80-2692-5858",
    email: "info@manipal.com",
    website: "www.manipal.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1300,
      max: 25000
    }
  },
  {
    id: 9,
    name: "Narayana Health",
    location: "Bangalore",
    specialties: ["Cardiac Sciences", "Oncology", "Orthopedics", "Neurology"],
    waitingTime: 55,
    fees: 1000,
    rating: 4.4,
    category: "private",
    address: "Bangalore, India",
    contact: "+91-80-2692-5858",
    email: "info@narayanahealth.com",
    website: "www.narayanahealth.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1000,
      max: 25000
    }
  },
  {
    id: 10,
    name: "Tata Memorial Hospital",
    location: "Mumbai",
    specialties: ["Oncology", "Radiation Therapy", "Surgical Oncology"],
    waitingTime: 75,
    fees: 800,
    rating: 4.7,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@tatamemorial.com",
    website: "www.tatamemorial.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 800,
      max: 25000
    }
  },
  {
    id: 11,
    name: "Christian Medical College",
    location: "Vellore",
    specialties: ["General Medicine", "Cardiology", "Neurology", "Gastroenterology"],
    waitingTime: 65,
    fees: 900,
    rating: 4.6,
    category: "private",
    address: "Vellore, India",
    contact: "+91-91-2692-5858",
    email: "info@christianmedicalcollege.com",
    website: "www.christianmedicalcollege.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 900,
      max: 25000
    }
  },
  {
    id: 12,
    name: "Artemis Hospital",
    location: "Gurugram",
    specialties: ["Orthopedics", "Cardiology", "Neurosciences", "Liver"],
    waitingTime: 30,
    fees: 1700,
    rating: 4.5,
    category: "private",
    address: "Gurugram, India",
    contact: "+91-120-2692-5858",
    email: "info@artemis.com",
    website: "www.artemis.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1700,
      max: 25000
    }
  },
  {
    id: 13,
    name: "Sir Ganga Ram Hospital",
    location: "Delhi",
    specialties: ["Gastroenterology", "Nephrology", "Neurology", "Cardiology"],
    waitingTime: 60,
    fees: 1400,
    rating: 4.6,
    category: "private",
    address: "Delhi, India",
    contact: "+91-11-2692-5858",
    email: "info@sgrahram.com",
    website: "www.sgrahram.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1400,
      max: 25000
    }
  },
  {
    id: 14,
    name: "Jaslok Hospital",
    location: "Mumbai",
    specialties: ["Neurology", "Cardiology", "Gastroenterology", "Oncology"],
    waitingTime: 45,
    fees: 1600,
    rating: 4.5,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@jaslok.com",
    website: "www.jaslok.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1600,
      max: 25000
    }
  },
  {
    id: 15,
    name: "Indraprastha Apollo Hospitals",
    location: "Delhi",
    specialties: ["Liver", "Cardiology", "Neurosurgery", "Orthopedics"],
    waitingTime: 55,
    fees: 1900,
    rating: 4.7,
    category: "private",
    address: "Delhi, India",
    contact: "+91-11-2692-5858",
    email: "info@indraprasthaapollo.com",
    website: "www.indraprasthaapollo.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1900,
      max: 25000
    }
  },
  {
    id: 16,
    name: "Hinduja Hospital",
    location: "Mumbai",
    specialties: ["Nephrology", "Urology", "Cardiology", "Neurology"],
    waitingTime: 40,
    fees: 1800,
    rating: 4.6,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@hinduja.com",
    website: "www.hinduja.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1800,
      max: 25000
    }
  },
  {
    id: 17,
    name: "Columbia Asia Hospital",
    location: "Bangalore",
    specialties: ["Orthopedics", "Gastroenterology", "Pulmonology", "ENT"],
    waitingTime: 30,
    fees: 1200,
    rating: 4.4,
    category: "private",
    address: "Bangalore, India",
    contact: "+91-80-2692-5858",
    email: "info@columbiaasia.com",
    website: "www.columbiaasia.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1200,
      max: 25000
    }
  },
  {
    id: 18,
    name: "Ruby Hall Clinic",
    location: "Pune",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Oncology"],
    waitingTime: 50,
    fees: 1300,
    rating: 4.5,
    category: "private",
    address: "Pune, India",
    contact: "+91-91-2692-5858",
    email: "info@rubyhallclinic.com",
    website: "www.rubyhallclinic.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1300,
      max: 25000
    }
  },
  {
    id: 19,
    name: "Wockhardt Hospitals",
    location: "Mumbai",
    specialties: ["Cardiology", "Orthopedics", "Neurology", "Gastroenterology"],
    waitingTime: 35,
    fees: 1700,
    rating: 4.5,
    category: "private",
    address: "Mumbai, India",
    contact: "+91-22-4925-4925",
    email: "info@wockhardt.com",
    website: "www.wockhardt.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1700,
      max: 25000
    }
  },
  {
    id: 20,
    name: "BLK Super Speciality Hospital",
    location: "Delhi",
    specialties: ["Cardiology", "Neurology", "Orthopedics", "Liver"],
    waitingTime: 45,
    fees: 1600,
    rating: 4.6,
    category: "private",
    address: "Delhi, India",
    contact: "+91-11-2692-5858",
    email: "info@blksuper.com",
    website: "www.blksuper.com",
    appointmentSteps: [
      "Visit the hospital website or call the helpline",
      "Register with your personal and contact details",
      "Select specialty and preferred doctor",
      "Choose available date and time slot",
      "Pay consultation fee online or at hospital",
      "Receive appointment confirmation via SMS/email"
    ],
    estimatedCost: {
      min: 1600,
      max: 25000
    }
  },
  {
    id: 21,
    name: "Safdarjung Hospital",
    location: "Delhi",
    specialties: ["General Medicine", "Emergency Care", "Orthopedics", "Gynecology"],
    waitingTime: 60,
    fees: 100,
    rating: 4.3,
    category: "government",
    address: "Ansari Nagar West, New Delhi, Delhi 110029",
    contact: "+91-11-2673-0000",
    email: "info@safdarjunghospital.gov.in",
    website: "www.safdarjunghospital.gov.in",
    appointmentSteps: [
      "Visit the hospital's registration counter",
      "Get an OPD card made",
      "Choose department based on medical need",
      "Get appointment slip with doctor details",
      "Pay nominal registration fee",
      "Wait for your turn to see the doctor"
    ],
    estimatedCost: {
      min: 10,
      max: 2000
    }
  },
  {
    id: 22,
    name: "Ram Manohar Lohia Hospital",
    location: "Delhi",
    specialties: ["General Surgery", "Internal Medicine", "Pediatrics", "Psychiatry"],
    waitingTime: 75,
    fees: 100,
    rating: 4.2,
    category: "government",
    address: "Baba Kharak Singh Marg, New Delhi, Delhi 110001",
    contact: "+91-11-2336-5525",
    email: "info@rmlh.gov.in",
    website: "www.rmlh.gov.in",
    appointmentSteps: [
      "Arrive early morning for registration",
      "Obtain OPD card from registration counter",
      "Select relevant department",
      "Pay registration fees",
      "Get doctor appointment",
      "Follow up as advised"
    ],
    estimatedCost: {
      min: 10,
      max: 2500
    }
  },
  {
    id: 23,
    name: "Lady Hardinge Medical College",
    location: "Delhi",
    specialties: ["Obstetrics", "Gynecology", "Pediatrics", "General Medicine"],
    waitingTime: 65,
    fees: 50,
    rating: 4.1,
    category: "government",
    address: "Shaheed Bhagat Singh Marg, New Delhi, Delhi 110001",
    contact: "+91-11-2336-3724",
    email: "info@lhmc.gov.in",
    website: "www.lhmc.gov.in",
    appointmentSteps: [
      "Register at OPD counter",
      "Get patient ID card",
      "Choose speciality department",
      "Pay nominal fee",
      "Receive appointment slot",
      "Visit assigned doctor"
    ],
    estimatedCost: {
      min: 10,
      max: 1500
    }
  },
  {
    id: 24,
    name: "GB Pant Hospital",
    location: "Delhi",
    specialties: ["Cardiology", "Neurology", "Gastroenterology", "Nephrology"],
    waitingTime: 70,
    fees: 100,
    rating: 4.3,
    category: "government",
    address: "1, Jawaharlal Nehru Marg, Delhi 110002",
    contact: "+91-11-2323-2400",
    email: "info@gbpant.gov.in",
    website: "www.gbpant.gov.in",
    appointmentSteps: [
      "Get registration done at OPD",
      "Choose specialty department",
      "Pay registration fee",
      "Get appointment slip",
      "Consult with doctor",
      "Collect prescribed medicines"
    ],
    estimatedCost: {
      min: 10,
      max: 2000
    }
  }
];

export const getHospitalsBySpecialty = (specialty: string) => {
  return hospitals.filter(hospital => 
    hospital.specialties.some(s => s.toLowerCase() === specialty.toLowerCase())
  );
};

export const getHospitalById = (id: number) => {
  return hospitals.find(hospital => hospital.id === id);
};

export const getGovernmentHospitals = () => {
  return hospitals.filter(hospital => hospital.category === "government");
};

export const getHospitalsByMaxFee = (maxFee: number) => {
  return hospitals.filter(hospital => hospital.fees <= maxFee);
};

export const getHospitalsByMaxWaitTime = (maxWaitTime: number) => {
  return hospitals.filter(hospital => hospital.waitingTime <= maxWaitTime);
};

export const getNearbyPlaces = (hospitalId: number, placeType: 'pharmacy' | 'hotel' | 'food'): any[] => {
  const placesData = {
    1: { // Apollo Hospital Delhi
      pharmacy: [
        {
          id: 101,
          name: "Apollo Pharmacy",
          rating: 4.6,
          distance: 0.1,
          address: "Inside Apollo Hospital, Delhi"
        },
        {
          id: 102,
          name: "MedPlus Pharmacy",
          rating: 4.3,
          distance: 0.5,
          address: "Sarita Vihar, Delhi"
        }
      ],
      hotel: [
        {
          id: 201,
          name: "Hotel Formule1 Delhi",
          rating: 4.1,
          distance: 1.2,
          address: "Mathura Road, Delhi"
        },
        {
          id: 202,
          name: "Crowne Plaza",
          rating: 4.7,
          distance: 2.5,
          address: "Okhla, Delhi"
        }
      ],
      food: [
        {
          id: 301,
          name: "Hospital Cafeteria",
          rating: 3.9,
          distance: 0,
          address: "Inside Apollo Hospital, Delhi"
        },
        {
          id: 302,
          name: "Subway",
          rating: 4.2,
          distance: 0.8,
          address: "Sarita Vihar Market, Delhi"
        }
      ]
    },
    5: { // AIIMS Delhi
      pharmacy: [
        {
          id: 103,
          name: "AIIMS Pharmacy",
          rating: 4.4,
          distance: 0,
          address: "Inside AIIMS, Delhi"
        },
        {
          id: 104,
          name: "Jan Aushadhi Kendra",
          rating: 4.5,
          distance: 0.3,
          address: "Near AIIMS Gate 1, Delhi"
        }
      ],
      hotel: [
        {
          id: 203,
          name: "Hotel Taj Palace",
          rating: 4.8,
          distance: 3.5,
          address: "Diplomatic Enclave, Delhi"
        },
        {
          id: 204,
          name: "Yatri Niwas",
          rating: 3.9,
          distance: 1.0,
          address: "AIIMS Road, Delhi"
        }
      ],
      food: [
        {
          id: 303,
          name: "AIIMS Cafeteria",
          rating: 3.7,
          distance: 0,
          address: "Inside AIIMS, Delhi"
        },
        {
          id: 304,
          name: "Sagar Ratna",
          rating: 4.3,
          distance: 0.6,
          address: "Green Park, Delhi"
        }
      ]
    }
  };
  
  // Return mock data for demonstration (in a real app, this would come from an API)
  return placesData[hospitalId]?.[placeType] || [];
};
