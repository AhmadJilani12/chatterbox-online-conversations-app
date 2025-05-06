
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface MessageSearchProps {
  onSearch: (query: string) => void;
}

const MessageSearch = ({ onSearch }: MessageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
    if (!isExpanded) setIsExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  return (
    <div className={`flex items-center transition-all duration-300 ${isExpanded ? "w-full" : "w-auto"}`}>
      {isExpanded ? (
        <div className="flex w-full items-center space-x-2">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="h-8"
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={clearSearch}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setIsExpanded(true)}
        >
          <Search size={16} />
        </Button>
      )}
    </div>
  );
};

export default MessageSearch;
