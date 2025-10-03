import { useState, useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toggleReactionOptimized, getUserPostReaction, getUserCommentReaction } from '@/lib/api/reactions/optimized-reactions';
import { ReactionType } from '@/types/database/social.types';
import { useToast } from '@/hooks/use-toast';

interface UseOptimizedReactionsProps {
  postId?: string;
  commentId?: string;
}

export function useOptimizedReactions({ postId, commentId }: UseOptimizedReactionsProps) {
  const [userReaction, setUserReaction] = useState<ReactionType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Cache local para evitar checks innecesarios
  const [reactionCache, setReactionCache] = useState<Map<string, ReactionType | null>>(new Map());

  const cacheKey = postId ? `post:${postId}` : `comment:${commentId}`;

  // Cargar reacción inicial del usuario
  useEffect(() => {
    const loadUserReaction = async () => {
      if (!postId && !commentId) return;
      
      // Verificar cache primero
      if (reactionCache.has(cacheKey)) {
        setUserReaction(reactionCache.get(cacheKey)!);
        return;
      }

      try {
        let reaction: ReactionType | null = null;
        
        if (postId) {
          reaction = await getUserPostReaction(postId);
        } else if (commentId) {
          reaction = await getUserCommentReaction(commentId);
        }
        
        setUserReaction(reaction);
        setReactionCache(prev => new Map(prev).set(cacheKey, reaction));
      } catch (error) {
        console.error('Error loading user reaction:', error);
        setUserReaction(null);
      }
    };

    loadUserReaction();
  }, [postId, commentId, cacheKey, reactionCache]);

  // Función optimizada para toggle de reacciones
  const toggleReaction = useCallback(async (reactionType: ReactionType = 'love') => {
    if (isLoading) return; // Prevenir clicks múltiples
    
    setIsLoading(true);
    
    try {
      const result = await toggleReactionOptimized(postId, commentId, reactionType);
      
      if (result.success) {
        const newReaction = result.action === 'added' ? reactionType : null;
        setUserReaction(newReaction);
        
        // Actualizar cache local
        setReactionCache(prev => new Map(prev).set(cacheKey, newReaction));
        
        // Invalidar queries relacionadas para refrescar conteos
        if (postId) {
          queryClient.invalidateQueries({ queryKey: ['posts'] });
          queryClient.invalidateQueries({ queryKey: ['post-reactions', postId] });
        }
        
        if (commentId) {
          queryClient.invalidateQueries({ queryKey: ['comments'] });
          queryClient.invalidateQueries({ queryKey: ['comment-reactions', commentId] });
        }
      } else {
        // Mostrar error específico
        toast({
          title: "Error",
          description: result.error || "No se pudo procesar la reacción",
          variant: "destructive"
        });
      }
    } catch (error: any) {
      console.error('Error toggling reaction:', error);
      toast({
        title: "Error",
        description: "Error de conexión. Intenta nuevamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, postId, commentId, queryClient, toast, cacheKey]);

  // Verificar si el usuario puede reaccionar (no es su propio contenido)
  const canReact = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;

      if (postId) {
        const { data } = await supabase
          .from('posts')
          .select('user_id')
          .eq('id', postId)
          .single();
        return data?.user_id !== user.id;
      }

      if (commentId) {
        const { data } = await supabase
          .from('comments')
          .select('user_id')
          .eq('id', commentId)
          .single();
        return data?.user_id !== user.id;
      }

      return false;
    } catch (error) {
      console.error('Error checking if user can react:', error);
      return false;
    }
  }, [postId, commentId]);

  return {
    userReaction,
    isLoading,
    toggleReaction,
    canReact
  };
}