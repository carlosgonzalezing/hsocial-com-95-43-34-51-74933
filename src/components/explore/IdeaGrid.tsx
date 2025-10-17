import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function IdeaGrid({ searchQuery }: { searchQuery: string }) {
  const navigate = useNavigate();
  
  const { data: ideas, isLoading } = useQuery({
    queryKey: ['explore-ideas', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq('post_type', 'idea')
        .eq('visibility', 'public')
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (searchQuery) {
        query = query.or(`content.ilike.%${searchQuery}%,title.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    }
  });

  if (isLoading) {
    return <div className="grid grid-cols-2 gap-3">
      {[1,2,3,4].map(i => <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />)}
    </div>;
  }

  if (!ideas || ideas.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No se encontraron ideas</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {ideas?.map((idea) => (
        <Card 
          key={idea.id} 
          className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate(`/`)}
        >
          <CardContent className="p-4">
            <div className="mb-3">
              <Lightbulb className="h-10 w-10 text-yellow-500 mb-2" />
              <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px]">
                {idea.content?.substring(0, 60) || 'Idea sin título'}...
              </h3>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={idea.profiles?.avatar_url} />
                <AvatarFallback className="text-xs">
                  {idea.profiles?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground truncate">
                @{idea.profiles?.username || 'usuario'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
