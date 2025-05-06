
import { useState, useEffect, useRef } from "react";
import { Message, ChatCategory, Attachment, Reaction } from "@/types/chat";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useToast } from "@/hooks/use-toast";
import ChatCategories from "./ChatCategories";
import MessageSearch from "./MessageSearch";

// Sample initial messages with read status and attachments
const initialMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing today?",
    sender: "other",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true,
    reactions: [
      { emoji: "👍", userId: "user1" },
      { emoji: "❤️", userId: "user2" }
    ]
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
    read: true,
    attachments: [
      {
        id: "att1",
        type: "image",
        name: "screenshot.png",
        url: "https://images.unsplash.com/photo-1680903132242-5d85c59cf80c",
        size: 1024 * 1024 * 2.5, // 2.5MB
      }
    ]
  }
];

// Sample chat categories
const initialCategories: ChatCategory[] = [
  { id: "general", name: "General", unreadCount: 0 },
  { id: "work", name: "Work", unreadCount: 2 },
  { id: "friends", name: "Friends", unreadCount: 0 },
  { id: "family", name: "Family", unreadCount: 1 },
];

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("general");
  const [categories, setCategories] = useState<ChatCategory[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [filteredMessages]);

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

  // Filter messages by search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = messages.filter(msg => 
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMessages(filtered);
    } else {
      setFilteredMessages(messages);
    }
  }, [messages, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    
    // Update category unread count
    setCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === categoryId ? { ...cat, unreadCount: 0 } : cat
      )
    );
  };

  const handleSendMessage = (content: string, attachments: Attachment[] = []) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: "user",
      timestamp: new Date(),
      read: false,
      attachments: attachments.length > 0 ? attachments : undefined
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
        read: false,
        reactions: [],
        attachments: Math.random() > 0.7 ? getSampleAttachment() : undefined
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // Show toast notification for new message
      toast({
        title: "New message",
        description: "You have received a new message",
        duration: 3000,
      });
      
      // Update unread count for categories except active one
      setCategories(prevCategories =>
        prevCategories.map(cat =>
          cat.id !== activeCategory && Math.random() > 0.7
            ? { ...cat, unreadCount: cat.unreadCount + 1 }
            : cat
        )
      );
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

  // Function to generate a sample attachment
  const getSampleAttachment = (): Attachment[] => {
    const isImage = Math.random() > 0.5;
    
    if (isImage) {
      return [{
        id: `att${Date.now()}`,
        type: "image",
        name: "sample-image.jpg",
        url: `https://picsum.photos/500/300?random=${Math.floor(Math.random() * 100)}`,
        size: 1024 * 1024 * Math.random() * 5 // Random size up to 5MB
      }];
    } else {
      return [{
        id: `att${Date.now()}`,
        type: "file",
        name: "document.pdf",
        url: "#",
        size: 1024 * 1024 * Math.random() * 10 // Random size up to 10MB
      }];
    }
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages(prevMessages =>
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          // Check if user already added this reaction
          const userReacted = msg.reactions?.some(r => r.userId === "user" && r.emoji === emoji);
          
          if (userReacted) {
            // Remove the reaction
            return {
              ...msg,
              reactions: msg.reactions?.filter(r => !(r.userId === "user" && r.emoji === emoji))
            };
          } else {
            // Add the reaction
            const newReaction: Reaction = { emoji, userId: "user" };
            return {
              ...msg,
              reactions: [...(msg.reactions || []), newReaction]
            };
          }
        }
        return msg;
      })
    );
  };

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="p-4 border-b flex justify-between items-center">
        <h1 className="text-xl font-semibold">Chat</h1>
        <MessageSearch onSearch={handleSearch} />
      </div>
      
      <ChatCategories 
        categories={categories} 
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {searchQuery && filteredMessages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No messages found for "{searchQuery}"
          </div>
        ) : (
          <>
            {filteredMessages.map((message) => (
              <MessageBubble 
                key={message.id} 
                message={message}
                onAddReaction={handleAddReaction}
              />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;
