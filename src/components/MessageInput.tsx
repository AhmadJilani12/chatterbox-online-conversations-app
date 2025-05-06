
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import EmojiPicker from "./EmojiPicker";

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center gap-2 p-4 border-t bg-card"
    >
      <EmojiPicker onEmojiSelect={handleEmojiSelect} />
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="flex-1 bg-secondary border-0 focus-visible:ring-2"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!message.trim()}
        className="rounded-full"
      >
        <Send size={18} />
      </Button>
    </form>
  );
};

export default MessageInput;
