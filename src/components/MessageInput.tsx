
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import EmojiPicker from "./EmojiPicker";
import { Attachment } from "@/types/chat";
import AttachmentPreview from "./AttachmentPreview";

interface MessageInputProps {
  onSendMessage: (message: string, attachments?: Attachment[]) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() || attachments.length > 0) {
      onSendMessage(message, attachments);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setMessage((prev) => prev + emoji);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const isImage = file.type.startsWith('image/');
      const attachment: Attachment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        type: isImage ? 'image' : 'file',
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file)
      };
      
      setAttachments(prev => [...prev, attachment]);
    });
    
    // Clear the input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(attachment => attachment.id !== id));
  };

  return (
    <div className="border-t bg-card p-2">
      {/* Attachment previews */}
      {attachments.length > 0 && (
        <div className="px-2 mb-2">
          <div className="flex flex-wrap gap-2">
            {attachments.map(attachment => (
              <div key={attachment.id} className="max-w-[150px]">
                <AttachmentPreview 
                  attachment={attachment} 
                  onRemove={() => removeAttachment(attachment.id)} 
                />
              </div>
            ))}
          </div>
        </div>
      )}
      
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-2 p-2"
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          multiple
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleFileClick}
          className="rounded-full text-muted-foreground hover:text-foreground"
        >
          <Paperclip size={20} />
        </Button>
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
          disabled={!message.trim() && attachments.length === 0}
          className="rounded-full"
        >
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;
