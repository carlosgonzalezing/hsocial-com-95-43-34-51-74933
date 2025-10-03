
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { ReactionType } from "@/types/database/social.types";
// Removed reaction sounds - simplified version
import { useState } from "react";

interface ReactionButtonProps {
  onReaction: (type: ReactionType) => void;
  reactionCount: number;
  userHasReacted?: boolean;
}

export function ReactionButton({ 
  onReaction, 
  reactionCount, 
  userHasReacted 
}: ReactionButtonProps) {
  const [animatingReaction, setAnimatingReaction] = useState<ReactionType | null>(null);

  const handleReactionClick = (type: ReactionType) => {
    // Simplified - no sound effects
    setAnimatingReaction(type);
    setTimeout(() => setAnimatingReaction(null), 600);
    onReaction(type);
  };
  return (
    <div className="flex flex-col items-center">
      <Button 
        variant="ghost" 
        size="sm" 
        className={`flex-1 ${userHasReacted ? 'text-red-500' : ''}`}
        onClick={() => handleReactionClick('love')}
      >
        <Heart className={`h-6 w-6 mr-2 transition-transform duration-200 ${userHasReacted ? 'fill-red-500 text-red-500 scale-110 reaction-love' : ''} ${animatingReaction === 'love' ? 'reaction-love' : ''}`} />
        <span>Me encanta</span>
      </Button>
      
      {reactionCount > 0 && (
        <span className="text-xs text-muted-foreground mt-1">
          {reactionCount} {reactionCount === 1 ? 'Me encanta' : 'Me encanta'}
        </span>
      )}
    </div>
  );
}
