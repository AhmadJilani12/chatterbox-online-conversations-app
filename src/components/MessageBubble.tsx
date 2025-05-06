
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUserMessage = message.sender === 'user';
  const formattedTime = format(new Date(message.timestamp), 'h:mm a');
  
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
        <div className={cn(
          "flex items-center justify-end gap-1 mt-1",
          isUserMessage ? "text-primary-foreground/70" : "text-secondary-foreground/70"
        )}>
          <span className="text-xs">{formattedTime}</span>
          {isUserMessage && (
            <span className="ml-1">
              {message.read ? <CheckCheck size={12} /> : <Check size={12} />}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
