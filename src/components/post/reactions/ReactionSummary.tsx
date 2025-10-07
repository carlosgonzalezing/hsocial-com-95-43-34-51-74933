
import React, { useState, useEffect } from "react";
import { reactionIcons, type ReactionType } from "./ReactionIcons";
import { ReactionsDialog } from "./ReactionsDialog";
import { getReactionsWithProfiles } from "@/lib/api/posts/queries/reactions";

interface ReactionSummaryProps {
  reactions: Record<string, number>;
  maxVisible?: number;
  postId: string;
}

export function ReactionSummary({ reactions, maxVisible = 3, postId }: ReactionSummaryProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [firstReactors, setFirstReactors] = useState<Array<{ username: string }>>([]);
  
  const loveCount = reactions.love || 0;

  useEffect(() => {
    if (loveCount > 0) {
      getReactionsWithProfiles(postId).then(setFirstReactors);
    }
  }, [loveCount, postId]);

  if (loveCount === 0) {
    return null;
  }

  const loveReaction = reactionIcons.love;
  const firstName = firstReactors[0]?.username || "";
  const remainingCount = loveCount - 1;

  return (
    <>
      <div 
        className="flex items-center cursor-pointer hover:underline transition-all" 
        onClick={() => setIsDialogOpen(true)}
      >
        <div className="flex -space-x-1 mr-2">
          <div
            className="w-5 h-5 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm"
            title={`${loveCount} ${loveReaction.label}`}
          >
            <span className="text-xs leading-none">{loveReaction.emoji}</span>
          </div>
        </div>
        <span className="ml-1">
          {firstName && remainingCount > 0 ? (
            <>{firstName} y {remainingCount} {remainingCount === 1 ? "persona más" : "personas más"}</>
          ) : firstName && remainingCount === 0 ? (
            <>{firstName}</>
          ) : (
            <>{loveCount} {loveCount === 1 ? "reacción" : "reacciones"}</>
          )}
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
