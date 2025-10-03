import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { ReactionType } from "@/types/database/social.types";
import { useToast } from "@/hooks/use-toast";
import { toggleReactionOptimized, getUserPostReaction } from "@/lib/api/reactions/optimized-reactions";

/**
 * Hook optimizado para manejar las reacciones de los posts
 * Usa la nueva API optimizada que previene duplicados y auto-reacciones
 */
export function usePostReactions(postId: string) {
  const [isReacting, setIsReacting] = useState(false);
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Verificar si el usuario ya reaccionó al post
  useEffect(() => {
    const checkUserReaction = async () => {
      try {
        const reaction = await getUserPostReaction(postId);
        setUserReaction(reaction);
      } catch (error) {
        console.error("Error checking user reaction:", error);
        setUserReaction(null);
      }
    };

    if (postId) {
      checkUserReaction();
    }
  }, [postId]);

  const onReaction = useCallback(async (postId: string, type: ReactionType) => {
    if (isReacting) return;
    
    setIsReacting(true);
    
    try {
      // Verificar autenticación
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "Debes iniciar sesión para reaccionar",
          variant: "destructive"
        });
        return;
      }

      // Usar la función optimizada
      const result = await toggleReactionOptimized(postId, undefined, type);

      if (result.success) {
        if (result.action === "removed") {
          setUserReaction(null);
          toast({
            title: "Reacción eliminada",
            description: "Tu reacción se ha eliminado",
          });
        } else if (result.action === "added") {
          setUserReaction(type);
          toast({
            title: "¡Reacción añadida!",
            description: "Tu reacción se ha guardado",
          });
        }
        
        // Invalidar queries para actualizar la UI
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        queryClient.invalidateQueries({ queryKey: ['post-reactions', postId] });
      } else {
        toast({
          title: "Error",
          description: result.error || "Error al procesar la reacción",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error in onReaction:', error);
      toast({
        title: "Error",
        description: error.message || "Error al procesar la reacción",
        variant: "destructive"
      });
    } finally {
      setIsReacting(false);
    }
  }, [isReacting, queryClient, toast]);

  return {
    isReacting,
    onReaction,
    userReaction
  };
}