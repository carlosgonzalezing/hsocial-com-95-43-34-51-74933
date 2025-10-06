import React from "react";
import { ReactionSummary } from "./reactions/ReactionSummary";
import { MessageCircle, Share2 } from "lucide-react";
import { Post } from "@/types/post";

interface PostActivitySummaryProps {
  post: Post;
  reactionsByType: Record<string, number>;
  commentsCount: number;
  sharesCount: number;
}

export function PostActivitySummary({
  post,
  reactionsByType,
  commentsCount,
  sharesCount,
}: PostActivitySummaryProps) {
  const totalReactions = Object.values(reactionsByType).reduce((sum, count) => sum + count, 0);
  const hasActivity = totalReactions > 0 || commentsCount > 0 || sharesCount > 0;

  if (!hasActivity) {
    return null;
  }
  
  // Si los datos están cargando, usar valores optimistas desde el cache
  const isOptimisticData = post.user_reaction && totalReactions === 0;

  return (
    <div className="flex items-center justify-between px-6 py-3 text-xs text-muted-foreground/80 border-b border-border/50">
      {/* Left side - Reactions */}
      <div className="flex items-center">
        {totalReactions > 0 && (
          <ReactionSummary reactions={reactionsByType} postId={post.id} />
        )}
      </div>

      {/* Right side - Comments and Shares */}
      <div className="flex items-center gap-4">
        {commentsCount > 0 && (
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <span>{commentsCount} {commentsCount === 1 ? 'comentario' : 'comentarios'}</span>
          </div>
        )}
        
        {sharesCount > 0 && (
          <div className="flex items-center gap-1 cursor-pointer hover:underline">
            <span>{sharesCount} {sharesCount === 1 ? 'vez compartido' : 'veces compartido'}</span>
          </div>
        )}
      </div>
    </div>
  );
}