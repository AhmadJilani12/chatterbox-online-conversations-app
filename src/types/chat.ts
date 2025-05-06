
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}
