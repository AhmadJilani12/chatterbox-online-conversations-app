
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  read?: boolean;
  typing?: boolean;
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}
