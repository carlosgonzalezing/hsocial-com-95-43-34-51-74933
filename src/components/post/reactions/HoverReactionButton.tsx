import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ReactionType } from "@/types/database/social.types";
import { reactionIcons } from "./ReactionIcons";

interface HoverReactionButtonProps {
  postId: string;
  userReaction: ReactionType | null;
  onReactionClick: (type: ReactionType) => void;
  postType?: string;
  isSubmitting?: boolean;
}

export function HoverReactionButton({ 
  postId, 
  userReaction, 
  onReactionClick,
  postType,
  isSubmitting = false
}: HoverReactionButtonProps) {
  const [animatingReaction, setAnimatingReaction] = useState<ReactionType | null>(null);

  // Solo usamos reacción "love"
  const primaryReactionType: ReactionType = "love";
  const reactionData = reactionIcons[primaryReactionType];
  
  // Click en el botón principal
  const handleButtonClick = useCallback(() => {
    setAnimatingReaction(primaryReactionType);
    
    // Clear animation after it completes
    setTimeout(() => setAnimatingReaction(null), 600);
    
    // Toggle reacción
    onReactionClick(primaryReactionType);
  }, [onReactionClick, primaryReactionType]);

  // Determinar si el usuario ha reaccionado
  const hasReacted = userReaction === "love";
  
  // Obtener el ícono de la reacción
  const CurrentIcon = reactionData.icon;
  const currentColor = hasReacted ? reactionData.color : '';
  const currentEmoji = hasReacted ? reactionData.emoji : null;

  return (
    <div className="relative">
      <Button 
        variant="ghost"
        size="sm"
        className={`flex items-center px-3 py-2 transition-all duration-200 ${
          hasReacted ? `${currentColor} bg-red-50 border border-red-200` : 'hover:bg-muted/50 border border-transparent'
        }`}
        onClick={handleButtonClick}
        disabled={isSubmitting}
      >
        {currentEmoji ? (
          <span className={`mr-2 text-xl transition-transform duration-200 ${
            hasReacted ? `scale-110 ${reactionData.animationClass}` : ''
          } ${animatingReaction === primaryReactionType ? reactionData.animationClass : ''}`}>
            {currentEmoji}
          </span>
        ) : (
          <CurrentIcon 
            className={`h-5 w-5 mr-2 transition-transform duration-200 ${
              hasReacted ? `${currentColor} fill-current scale-110 ${reactionData.animationClass}` : ''
            } ${animatingReaction === primaryReactionType ? reactionData.animationClass : ''}`}
            strokeWidth={1.5}
          />
        )}
        <span className={`text-sm font-medium ${hasReacted ? currentColor : ''}`}>
          {hasReacted ? "Te encanta" : "Me encanta"}
        </span>
      </Button>
    </div>
  );
}