
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Smile } from "lucide-react";

const commonEmojis = ["😊", "😂", "❤️", "👍", "😍", "🎉", "😎", "🙌", "🤔", "😢", "😡", "🥳", "👋", "🌟", "✨"];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const EmojiPicker = ({ onEmojiSelect }: EmojiPickerProps) => {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    onEmojiSelect(emoji);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
          <Smile size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-2" side="top">
        <div className="grid grid-cols-5 gap-2">
          {commonEmojis.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              className="h-10 w-10 p-0"
              onClick={() => handleEmojiClick(emoji)}
            >
              {emoji}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiPicker;
