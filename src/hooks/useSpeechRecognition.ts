
import { useState, useRef, useEffect } from 'react';
import { useToast } from './use-toast';

export const useSpeechRecognition = () => {
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef<any>(null);
  const { toast } = useToast();
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition.current = new SpeechRecognitionAPI();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event: SpeechRecognitionEvent) => {
        const currentTranscript = Array.from(event.results)
          .map((result: SpeechRecognitionResult) => result[0])
          .map((result: SpeechRecognitionAlternative) => result.transcript)
          .join('');
        
        setTranscript(currentTranscript);
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Input Error",
          description: "There was an error with voice recognition. Please try again.",
          variant: "destructive",
        });
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const toggleVoiceInput = () => {
    if (isListening) {
      recognition.current?.stop();
      setIsListening(false);
    } else {
      if (!recognition.current) {
        toast({
          title: "Voice Input Not Available",
          description: "Your browser doesn't support voice recognition.",
          variant: "destructive",
        });
        return;
      }
      
      recognition.current.start();
      setIsListening(true);
      toast({
        title: "Voice Input Active",
        description: "Speak clearly into your microphone",
      });
    }
  };

  return {
    isListening,
    toggleVoiceInput,
    transcript,
    setTranscript
  };
};
