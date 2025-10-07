import React from "react";
import { ReactionSummary } from "./reactions/ReactionSummary";
import { Post } from "@/types/post";

interface PostActivitySummaryProps {
  post: Post;
  reactionsByType: Record<string, number>;
  commentsCount: number;
  sharesCount: number;
  onCommentsClick?: () => void;
}

export function PostActivitySummary({
  post,
  reactionsByType,
  commentsCount,
  sharesCount,
  onCommentsClick,
}: PostActivitySummaryProps) {
  const totalReactions = Object.values(reactionsByType).reduce((sum, count) => sum + count, 0);
  const hasActivity = totalReactions > 0 || commentsCount > 0 || sharesCount > 0;

  if (!hasActivity) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-6 py-3 text-sm text-muted-foreground border-b border-border/50">
      {/* Left side - Reactions (estilo Facebook: "Nombre y X personas más") */}
      <div className="flex items-center">
        {totalReactions > 0 && (
          <ReactionSummary reactions={reactionsByType} postId={post.id} />
        )}
      </div>

      {/* Right side - Comments and Shares (estilo Facebook) */}
      <div className="flex items-center gap-3 text-muted-foreground/80">
        {commentsCount > 0 && (
          <button
            className="hover:underline transition-all"
            onClick={onCommentsClick}
          >
            {commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}
          </button>
        )}
        
        {sharesCount > 0 && (
          <span className="hover:underline cursor-pointer transition-all">
            {sharesCount} {sharesCount === 1 ? 'vez compartida' : 'veces compartida'}
          </span>
        )}
      </div>
    </div>
  );
}