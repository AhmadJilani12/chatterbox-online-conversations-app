
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: Date;
  read?: boolean;
  typing?: boolean;
  reactions?: Reaction[];
  attachments?: Attachment[];
}

export interface Reaction {
  emoji: string;
  userId: string;
}

export interface Attachment {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
  size?: number;
}

export interface ChatProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
}

export interface ChatCategory {
  id: string;
  name: string;
  unreadCount: number;
}
