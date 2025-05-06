
import { useState, useEffect, useRef } from "react";
import { Message } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";

// Sample initial messages with read status
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  },
  {
    id: "2",
    content: "I'm good, thanks for asking! How about you?",
    sender: "user",
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000), // 23 hours ago
    read: true
  },
  {
    id: "3",
    content: "I'm doing great! Just working on some new features.",
    sender: "other",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: true
  }
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Mark messages as read when they appear
  useEffect(() => {
    const unreadMessages = messages.filter(msg => msg.sender === 'other' && !msg.read);
    if (unreadMessages.length > 0) {
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.sender === 'other' && !msg.read ? { ...msg, read: true } : msg
          )
        );
      }, 1000);
    }
  }, [messages]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      read: false
    };
    setMessages([...messages, newMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate a response after a short delay
    setTimeout(() => {
      setIsTyping(false);
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getRandomResponse(content),
        sender: "other",
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Show toast notification for new message
      toast({
        title: "New message",
        description: "You have received a new message",
        duration: 3000,
      });
    }, 1500);
  };

  // Function to generate random responses
  const getRandomResponse = (message: string): string => {
    const responses = [
      "That's interesting! Tell me more.",
      "I see what you mean. What do you think about that?",
      "Thanks for sharing that with me!",
      "I appreciate your message.",
      `I understand. Regarding "${message.substring(0, 15)}...", what's your opinion?`,
      "Let me think about that for a moment...",
      "That's a great point!",
      "I hadn't thought of it that way before.",
      "You make a compelling argument."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
