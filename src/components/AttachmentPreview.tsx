
import { Attachment } from "@/types/chat";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AttachmentPreviewProps {
  attachment: Attachment;
  onRemove?: () => void;
  readonly?: boolean;
}

const AttachmentPreview = ({ attachment, onRemove, readonly = false }: AttachmentPreviewProps) => {
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="flex group relative rounded-md overflow-hidden border border-border bg-secondary/30 mb-2">
      {attachment.type === 'image' ? (
        <div className="relative w-full h-40">
          <img 
            src={attachment.url} 
            alt={attachment.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 truncate">
            {attachment.name} {formatFileSize(attachment.size)}
          </div>
        </div>
      ) : (
        <div className="flex items-center p-2 w-full">
          <div className="bg-background rounded-md p-2 mr-2">
            <File size={20} />
          </div>
          <div className="flex-1 truncate">
            <div className="text-sm font-medium truncate">{attachment.name}</div>
            <div className="text-xs text-muted-foreground">{formatFileSize(attachment.size)}</div>
          </div>
        </div>
      )}

      {!readonly && onRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-1 right-1 h-6 w-6 rounded-full bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X size={12} />
        </Button>
      )}
    </div>
  );
};

export default AttachmentPreview;
