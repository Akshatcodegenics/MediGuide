
import React from "react";
import { Hospital } from "@/types";
import { ChatContainer } from "./chat/ChatContainer";

interface AIChatAssistantProps {
  hospital: Hospital;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ hospital }) => {
  return <ChatContainer hospital={hospital} />;
};
