
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatCategory } from "@/types/chat";
import { Badge } from "@/components/ui/badge";

interface ChatCategoriesProps {
  categories: ChatCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const ChatCategories = ({ categories, activeCategory, onCategoryChange }: ChatCategoriesProps) => {
  return (
    <div className="flex overflow-x-auto py-2 px-4 border-b space-x-2 no-scrollbar">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "ghost"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className="whitespace-nowrap"
        >
          {category.name}
          {category.unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2 h-5 min-w-5 px-1">
              {category.unreadCount}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  );
};

export default ChatCategories;
