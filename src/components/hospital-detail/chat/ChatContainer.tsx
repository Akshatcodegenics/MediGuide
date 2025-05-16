
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Hospital } from '@/types';
import { ChatHeader } from './ChatHeader';
import { LanguageSelector } from './LanguageSelector';
import { ChatMessages } from './ChatMessages';
import { MessageInput } from './MessageInput';
import { SuggestedQuestions } from './SuggestedQuestions';
import { supportedLanguages, predefinedQuestions } from '../constants/chatData';
import { useChatState } from '@/hooks/useChatState';
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatContainerProps {
  hospital: Hospital;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({ hospital }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [activeLanguage, setActiveLanguage] = useState("en");
  const [showLanguages, setShowLanguages] = useState(false);

  const {
    messages,
    currentMessage,
    setCurrentMessage,
    isTyping,
    endOfMessagesRef,
    inputRef,
    handleSendMessage
  } = useChatState(hospital);

  const {
    isListening,
    toggleVoiceInput,
    transcript,
    setTranscript
  } = useSpeechRecognition();

  React.useEffect(() => {
    if (transcript) {
      setCurrentMessage(transcript);
      setTranscript('');
    }
  }, [transcript]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    setCurrentMessage(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  const handleLanguageChange = (langCode: string) => {
    setActiveLanguage(langCode);
    setShowLanguages(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageCircle size={24} />
        </motion.button>
      )}
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              width: isMinimized ? "300px" : "380px",
              height: isMinimized ? "auto" : "520px"
            }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 20 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200"
          >
            <ChatHeader
              hospital={hospital}
              isMinimized={isMinimized}
              toggleMinimize={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              onClose={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            />
            
            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col h-[430px]"
                >
                  <LanguageSelector
                    activeLanguage={activeLanguage}
                    supportedLanguages={supportedLanguages}
                    showLanguages={showLanguages}
                    onToggleLanguages={() => setShowLanguages(!showLanguages)}
                    onLanguageChange={handleLanguageChange}
                  />
                  
                  <ScrollArea className="flex-1 px-1">
                    <ChatMessages
                      messages={messages}
                      isTyping={isTyping}
                      formatTime={formatTime}
                    />
                  </ScrollArea>
                  
                  <SuggestedQuestions
                    questions={predefinedQuestions}
                    onQuestionSelect={handlePredefinedQuestion}
                  />
                  
                  <MessageInput
                    currentMessage={currentMessage}
                    onMessageChange={(e) => setCurrentMessage(e.target.value)}
                    onSendMessage={handleSendMessage}
                    onMicInput={toggleVoiceInput}
                    onKeyPress={handleKeyPress}
                    inputRef={inputRef}
                    isListening={isListening}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
