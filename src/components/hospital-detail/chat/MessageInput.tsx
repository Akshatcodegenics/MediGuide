
import React from "react";
import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  currentMessage: string;
  onMessageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onMicInput: () => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  currentMessage,
  onMessageChange,
  onSendMessage,
  onMicInput,
  onKeyPress,
  inputRef,
}) => {
  return (
    <div className="border-t border-gray-200 p-3 bg-white">
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={onMicInput}
        >
          <Mic size={18} className="text-gray-600" />
        </Button>
        <Input
          ref={inputRef}
          value={currentMessage}
          onChange={onMessageChange}
          onKeyPress={onKeyPress}
          placeholder="Type your question here..."
          className="flex-1"
        />
        <Button
          size="icon"
          className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600"
          onClick={onSendMessage}
          disabled={!currentMessage.trim()}
        >
          <Send size={16} className="text-white" />
        </Button>
      </div>
    </div>
  );
};
