
// Analyze mood from text input

export const analyzeMood = (text: string): string => {
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
