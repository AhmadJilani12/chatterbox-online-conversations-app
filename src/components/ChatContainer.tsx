
import { useState } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

// Sample initial messages
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    id: "2",
    content: "I'm good, thanks for asking! How about you?",
    sender: "user",
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000) // 23 hours ago
  },
  {
    id: "3",
    content: "I'm doing great! Just working on some new features.",
    sender: "other",
    timestamp: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
  }
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message! This is a simulated response.",
        sender: "other",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b">
        <h1 className="text-xl font-semibold">Chat</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
