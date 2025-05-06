
import { cn } from "@/lib/utils";

const TypingIndicator = () => {
  return (
    <div className="flex items-end space-x-1 px-4 py-2 animate-fade-in">
      <div className="bg-secondary rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "0ms" }}></div>
      <div className="bg-secondary rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "150ms" }}></div>
      <div className="bg-secondary rounded-full w-2 h-2 animate-bounce" style={{ animationDelay: "300ms" }}></div>
    </div>
  );
};

export default TypingIndicator;
