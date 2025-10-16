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

  // Mostramos las 5 reacciones
  const reactionTypes: ReactionType[] = ["awesome", "love", "interesting", "success", "join"];
  
  return (
    <div 
      className={cn(
        "flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2 shadow-xl transition-all duration-200",
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
              "reaction-menu-item p-2 rounded-full transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-125",
              isActive && "scale-125 bg-gray-100 dark:bg-gray-700"
            )}
            onClick={() => onReactionSelected(type)}
            onPointerEnter={() => setActiveReaction(type)}
            onPointerLeave={() => setActiveReaction(null)}
            title={reaction.label}
          >
            <Icon 
              className={`h-7 w-7 ${reaction.color}`}
              strokeWidth={2}
              fill="currentColor"
            />
          </button>
        );
      })}
    </div>
  );
}