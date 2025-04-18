
import React from "react";
import { Button } from "@/components/ui/button";

interface SuggestedQuestionsProps {
  questions: string[];
  onQuestionSelect: (question: string) => void;
}

export const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
  questions,
  onQuestionSelect,
}) => {
  return (
    <div className="border-t border-gray-100 p-2 overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-2">
        {questions.map((question, index) => (
          <Button 
            key={index}
            variant="outline" 
            size="sm"
            className="text-xs h-7 whitespace-nowrap flex-shrink-0"
            onClick={() => onQuestionSelect(question)}
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
};
