
// Analyze mood from text input

export const analyzeMood = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  // Enhanced mood detection patterns
  const moodPatterns = {
    anxious: ["anxious", "worried", "nervous", "anxiety", "panic", "stress", "stressed", "fear", "scared", "frightened", "uneasy", "restless", "concerned", "disturbed"],
    sad: ["sad", "unhappy", "depressed", "depression", "down", "blue", "upset", "grief", "sorrow", "heartbroken", "miserable", "gloomy", "crying", "lonely", "alone"],
    angry: ["angry", "frustrated", "annoyed", "mad", "irritated", "furious", "rage", "outraged", "temper", "hostile", "aggravated", "resentful", "bitter"],
    happy: ["happy", "good", "great", "excellent", "wonderful", "fantastic", "joy", "joyful", "pleased", "delighted", "content", "cheerful", "ecstatic", "thrilled", "smile", "laughing"],
    fearful: ["afraid", "scared", "frightened", "terrified", "fear", "horror", "dread", "phobia", "alarmed", "petrified", "terrorized"],
    tired: ["tired", "exhausted", "fatigue", "sleepy", "drowsy", "lethargic", "weary", "drained", "worn out", "beat", "spent", "burned out"]
  };
  
  // Enhanced visual responses with emojis for each mood
  const moodResponses = {
    anxious: "I notice you might be feeling anxious 😟. Anxiety can affect your physical health too. Taking slow, deep breaths might help while seeking care. Consider speaking with a mental health professional along with addressing your physical symptoms.",
    sad: "I sense you might be feeling down 😔. Your emotional wellbeing is just as important as your physical health. Consider activities that usually lift your mood, and I'd recommend considering both emotional and physical health as you seek medical care.",
    angry: "I understand you might be frustrated 😠. It's important to address both your physical symptoms and any stress you're experiencing. Finding healthy outlets for your emotions can help improve your overall wellbeing.",
    happy: "I'm glad to hear you're in good spirits 😊 despite seeking medical information. A positive outlook can help with recovery and the healing process!",
    fearful: "It seems you might be concerned or scared about your symptoms 😨. This is completely natural, but remember that getting proper medical advice is the best way to address health concerns and reduce fear of the unknown.",
    tired: "You seem to be experiencing fatigue 😴. Rest is important, but persistent tiredness can also be a symptom that should be evaluated by a healthcare professional. Consider your sleep habits and stress levels too."
  };
  
  // Check for mood indicators with intensity scoring
  const moodScores: Record<string, number> = {
    anxious: 0,
    sad: 0, 
    angry: 0,
    happy: 0,
    fearful: 0,
    tired: 0
  };
  
  // Calculate mood scores
  for (const [mood, indicators] of Object.entries(moodPatterns)) {
    for (const indicator of indicators) {
      if (lowerText.includes(indicator)) {
        // Increase score based on word count and emphasis
        moodScores[mood] += 1;
        
        // Check for emphasis (!, CAPS, repetition)
        if (text.includes("!") && text.toLowerCase().includes(indicator)) {
          moodScores[mood] += 0.5;
        }
        
        // Check for all caps
        if (text.includes(indicator.toUpperCase())) {
          moodScores[mood] += 0.5;
        }
        
        // Check for repetition of the same mood word
        const regex = new RegExp(indicator, 'gi');
        const matches = text.match(regex);
        if (matches && matches.length > 1) {
          moodScores[mood] += 0.5 * (matches.length - 1);
        }
      }
    }
  }
  
  // Find the dominant mood
  let dominantMood = "";
  let highestScore = 0;
  
  for (const [mood, score] of Object.entries(moodScores)) {
    if (score > highestScore) {
      highestScore = score;
      dominantMood = mood;
    }
  }
  
  // Only return a mood response if the score is significant
  if (highestScore >= 1) {
    return moodResponses[dominantMood as keyof typeof moodResponses] || "";
  }
  
  return "";
};
