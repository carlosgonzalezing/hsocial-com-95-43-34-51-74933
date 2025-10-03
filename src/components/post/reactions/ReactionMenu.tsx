import React from "react";
import { reactionIcons, type ReactionType } from "./ReactionIcons";
import { cn } from "@/lib/utils";

interface ReactionMenuProps {
  show: boolean;
  activeReaction: ReactionType | null;
  setActiveReaction: (reaction: ReactionType | null) => void;
  onReactionSelected: (type: ReactionType) => void;
  onPointerLeave: () => void;
}

export function ReactionMenu({
  show,
  activeReaction,
  setActiveReaction,
  onReactionSelected,
  onPointerLeave
}: ReactionMenuProps) {
  
  if (!show) return null;

  // Solo mostramos la reacción "love"
  const reactionTypes: ReactionType[] = ["love"];
  
  return (
    <div 
      className={cn(
        "flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-2 py-1 shadow-lg transition-all duration-200",
        show ? "opacity-100 scale-100" : "opacity-0 scale-95"
      )}
      onPointerLeave={onPointerLeave}
    >
      {reactionTypes.map((type) => {
        const reaction = reactionIcons[type];
        const Icon = reaction.icon;
        const isActive = activeReaction === type;
        
        return (
          <button
            key={type}
            className={cn(
              "p-2 rounded-full transition-transform duration-150 hover:scale-125",
              isActive && "scale-125 bg-gray-100 dark:bg-gray-700"
            )}
            onClick={() => onReactionSelected(type)}
            onPointerEnter={() => setActiveReaction(type)}
            onPointerLeave={() => setActiveReaction(null)}
          >
            <Icon 
              className={`h-6 w-6 ${reaction.color}`}
              strokeWidth={1.5}
            />
          </button>
        );
      })}
    </div>
  );
}