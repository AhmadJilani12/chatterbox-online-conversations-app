
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import MessageReactions from "./MessageReactions";
import AttachmentPreview from "./AttachmentPreview";

interface MessageBubbleProps {
  message: Message;
  onAddReaction?: (messageId: string, emoji: string) => void;
}

const MessageBubble = ({ message, onAddReaction }: MessageBubbleProps) => {
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
        {message.attachments && message.attachments.length > 0 && (
          <div className="mb-2">
            {message.attachments.map(attachment => (
              <AttachmentPreview 
                key={attachment.id} 
                attachment={attachment} 
                readonly={true} 
              />
            ))}
          </div>
        )}
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
        
        {message.reactions && message.reactions.length > 0 && onAddReaction && (
          <MessageReactions 
            reactions={message.reactions} 
            messageId={message.id} 
            onAddReaction={onAddReaction} 
          />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
