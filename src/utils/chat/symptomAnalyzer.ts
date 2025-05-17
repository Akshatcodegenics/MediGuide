
import { Hospital } from '@/types';
import { symptomToSpecialty, firstAidAdvice } from './symptomMapping';

export const analyzeSymptoms = (symptoms: string, hospital: Hospital): string => {
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
