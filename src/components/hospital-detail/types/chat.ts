
export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export interface SupportedLanguage {
  name: string;
  code: string;
}

export interface MockResponse {
  [key: string]: string;
}
