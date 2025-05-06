
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { formatDistanceToNow } from "date-fns";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUserMessage = message.sender === 'user';
  const formattedTime = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });
  
  return (
    <div 
      className={cn(
        "flex w-full mb-4 message-animation",
        isUserMessage ? "justify-end" : "justify-start"
      )}
    >
      <div 
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2 shadow-sm",
          isUserMessage 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "bg-secondary text-secondary-foreground rounded-tl-sm"
        )}
      >
        <p className="text-sm sm:text-base">{message.content}</p>
        <p className={cn(
          "text-xs mt-1 opacity-70",
          isUserMessage ? "text-primary-foreground" : "text-secondary-foreground"
        )}>
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;
