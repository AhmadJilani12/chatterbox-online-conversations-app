
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Reaction } from "@/types/chat";
import { SmilePlus } from "lucide-react";

const commonReactions = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

interface MessageReactionsProps {
  reactions: Reaction[];
  messageId: string;
  onAddReaction: (messageId: string, emoji: string) => void;
}

const MessageReactions = ({ reactions, messageId, onAddReaction }: MessageReactionsProps) => {
  const [open, setOpen] = useState(false);

  const handleReactionClick = (emoji: string) => {
    onAddReaction(messageId, emoji);
    setOpen(false);
  };

  // Group reactions by emoji
  const groupedReactions = reactions.reduce((acc: Record<string, number>, reaction) => {
    acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="flex flex-wrap gap-1 mt-1">
      {/* Display existing reactions with count */}
      {Object.entries(groupedReactions).map(([emoji, count]) => (
        <Button
          key={emoji}
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-xs rounded-full bg-secondary/50 hover:bg-secondary"
          onClick={() => handleReactionClick(emoji)}
        >
          {emoji} {count > 1 && count}
        </Button>
      ))}

      {/* Add reaction button */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 rounded-full bg-secondary/30 hover:bg-secondary"
          >
            <SmilePlus size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1" side="top" align="start">
          <div className="flex gap-1">
            {commonReactions.map((emoji) => (
              <Button
                key={emoji}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => handleReactionClick(emoji)}
              >
                {emoji}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MessageReactions;
