
import React from "react";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SupportedLanguage } from "../types/chat";

interface LanguageSelectorProps {
  activeLanguage: string;
  supportedLanguages: SupportedLanguage[];
  showLanguages: boolean;
  onToggleLanguages: () => void;
  onLanguageChange: (langCode: string) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  activeLanguage,
  supportedLanguages,
  showLanguages,
  onToggleLanguages,
  onLanguageChange,
}) => {
  return (
    <div className="border-b border-gray-100 p-2 bg-gray-50 flex justify-between items-center">
      <div className="flex items-center">
        <Languages size={16} className="text-gray-500 mr-1" />
        <span className="text-xs text-gray-600">
          {supportedLanguages.find(lang => lang.code === activeLanguage)?.name || "English"}
        </span>
      </div>
      <div className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="h-7 text-xs"
          onClick={onToggleLanguages}
        >
          Change Language
        </Button>
        
        {showLanguages && (
          <div className="absolute right-0 top-8 bg-white shadow-lg rounded-md border border-gray-200 z-10 w-40 py-1 max-h-48 overflow-auto">
            {supportedLanguages.map(lang => (
              <button
                key={lang.code}
                className={`w-full text-left px-3 py-1.5 text-sm hover:bg-gray-100 ${activeLanguage === lang.code ? 'bg-blue-50 text-blue-600' : ''}`}
                onClick={() => onLanguageChange(lang.code)}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
