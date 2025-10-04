
import React, { useState } from "react";
import { reactionIcons, type ReactionType } from "./ReactionIcons";
import { ReactionsDialog } from "./ReactionsDialog";

interface ReactionSummaryProps {
  reactions: Record<string, number>;
  maxVisible?: number;
  postId: string;
}

export function ReactionSummary({ reactions, maxVisible = 3, postId }: ReactionSummaryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Only show "love" reactions since we simplified to just this one type
  const loveCount = reactions.love || 0;

  if (loveCount === 0) {
    return null;
  }

  const loveReaction = reactionIcons.love;

  return (
    <>
      <div 
        className="flex items-center cursor-pointer hover:underline transition-all" 
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex -space-x-1 mr-2">
          <div
            className="w-5 h-5 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm"
            title={`${loveCount} ${loveReaction.label}`}
          >
            <span className="text-xs leading-none">{loveReaction.emoji}</span>
          </div>
        </div>
        <span className="ml-1">
          {loveCount} {loveCount === 1 ? "reacción" : "reacciones"}
        </span>
      </div>
      
      <ReactionsDialog 
        postId={postId} 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
      />
    </>
  );
}
