import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { reactionIcons } from "./ReactionIcons";

interface Reaction {
  id: string;
  reaction_type: string;
  created_at: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  career?: string;
}

interface ReactionsDialogProps {
  postId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReactionsDialog({ postId, open, onOpenChange }: ReactionsDialogProps) {
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && postId) {
      fetchReactions();
    }
  }, [open, postId]);

  const fetchReactions = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("reactions")
        .select(`
          id,
          reaction_type,
          created_at,
          user_id,
          profiles!reactions_user_id_fkey (
            username,
            avatar_url,
            career
          )
        `)
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching reactions:", error);
        return;
      }

      const formattedReactions: Reaction[] = (data || []).map((item: any) => ({
        id: item.id,
        reaction_type: item.reaction_type,
        created_at: item.created_at,
        user_id: item.user_id,
        username: item.profiles?.username || "Usuario",
        avatar_url: item.profiles?.avatar_url,
        career: item.profiles?.career
      }));

      setReactions(formattedReactions);
    } catch (error) {
      console.error("Error in fetchReactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getReactionEmoji = (type: string) => {
    return reactionIcons[type as keyof typeof reactionIcons]?.emoji || "❤️";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Reacciones ({reactions.length})
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : reactions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay reacciones todavía
            </p>
          ) : (
            reactions.map((reaction) => (
              <div 
                key={reaction.id} 
                className="flex items-start gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  {reaction.avatar_url ? (
                    <AvatarImage src={reaction.avatar_url} alt={reaction.username} />
                  ) : (
                    <AvatarFallback>
                      {reaction.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{reaction.username}</span>
                    <span className="text-lg">{getReactionEmoji(reaction.reaction_type)}</span>
                  </div>
                  {reaction.career && (
                    <Badge variant="outline" className="mt-1 text-xs">
                      🎓 {reaction.career}
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
