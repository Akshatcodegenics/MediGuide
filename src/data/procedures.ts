
import { Procedure } from "@/types";

export const procedures: Procedure[] = [
  {
    id: 1,
    name: "Liver Function Test",
    description: "A series of blood tests that provide information about the state of your liver.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to blood collection center with receipt",
      "Fast for 8-12 hours before the test (water is allowed)",
      "Blood sample will be collected",
      "Results typically available within 24 hours"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous test reports (if any)"
    ],
    estimatedTime: "1-2 hours",
    specialty: "Liver"
  },
  {
    id: 2,
    name: "ECG (Electrocardiogram)",
    description: "A test that records the electrical signals in your heart.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to cardiology department with receipt",
      "Remove upper body clothing and wear hospital gown",
      "Electrodes will be attached to chest, arms, and legs",
      "Lie still during the test (2-3 minutes)",
      "Results typically available immediately"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous ECG reports (if any)"
    ],
    estimatedTime: "15-30 minutes",
    specialty: "Cardiology"
  },
  {
    id: 3,
    name: "MRI Scan",
    description: "A non-invasive imaging test that uses magnets and radio waves to create detailed images of organs and tissues.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to radiology department with receipt",
      "Remove all metal objects (jewelry, watches, etc.)",
      "Change into hospital gown",
      "Lie still on the MRI table during the scan (30-90 minutes)",
      "Results typically available within 24-48 hours"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous scan reports (if any)",
      "Medical history form"
    ],
    estimatedTime: "1-2 hours",
    specialty: "Neurology"
  },
  {
    id: 4,
    name: "Endoscopy",
    description: "A procedure to examine the inside of your body using an instrument called an endoscope.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Complete pre-procedure assessment",
      "Fast for 8-12 hours before the procedure",
      "Change into hospital gown",
      "Local anesthetic will be sprayed in your throat",
      "Endoscope will be inserted through mouth or nose",
      "Results may be available immediately or within a few days"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous medical reports",
      "List of current medications",
      "Informed consent form"
    ],
    estimatedTime: "30-60 minutes",
    specialty: "Gastroenterology"
  },
  {
    id: 5,
    name: "X-Ray",
    description: "A quick, painless test that produces images of structures inside your body.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to radiology department with receipt",
      "Remove jewelry or metal objects from the area being examined",
      "May need to change into hospital gown",
      "Position body as directed by technician",
      "Results typically available within 24 hours"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof"
    ],
    estimatedTime: "15-30 minutes",
    specialty: "Orthopedics"
  },
  {
    id: 6,
    name: "Blood Pressure Check",
    description: "A simple test that measures the pressure in your arteries as your heart pumps.",
    steps: [
      "Register at the hospital reception",
      "Go to general checkup area",
      "Sit quietly for 5 minutes before the test",
      "Cuff will be placed around your upper arm",
      "Results available immediately"
    ],
    requiredDocuments: [
      "ID proof"
    ],
    estimatedTime: "5-10 minutes",
    specialty: "General Medicine"
  },
  {
    id: 7,
    name: "CT Scan",
    description: "A computerized tomography scan combines a series of X-ray images taken from different angles.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to radiology department with receipt",
      "Remove metal objects like jewelry",
      "May need to change into hospital gown",
      "May need to drink contrast dye or have it injected",
      "Lie still on CT table during the scan",
      "Results typically available within 24-48 hours"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous scan reports (if any)",
      "List of allergies"
    ],
    estimatedTime: "30-60 minutes",
    specialty: "Neurology"
  },
  {
    id: 8,
    name: "Ultrasound",
    description: "An imaging test that uses sound waves to create pictures of the inside of your body.",
    steps: [
      "Register at the hospital reception",
      "Submit doctor's prescription",
      "Make payment at the billing counter",
      "Go to ultrasound department with receipt",
      "May need to drink water or have a full bladder (depending on the area)",
      "Gel will be applied to the area being examined",
      "Technician will move a device (transducer) over the area",
      "Results may be available immediately or within 24 hours"
    ],
    requiredDocuments: [
      "Doctor's prescription",
      "ID proof",
      "Previous ultrasound reports (if any)"
    ],
    estimatedTime: "30-45 minutes",
    specialty: "Radiology"
  }
];

export const getProceduresBySpecialty = (specialty: string) => {
  return procedures.filter(procedure => 
    procedure.specialty.toLowerCase() === specialty.toLowerCase()
  );
};

export const getProcedureById = (id: number) => {
  return procedures.find(procedure => procedure.id === id);
};
