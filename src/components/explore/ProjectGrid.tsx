import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProjectGrid({ searchQuery }: { searchQuery: string }) {
  const navigate = useNavigate();
  
  const { data: projects, isLoading } = useQuery({
    queryKey: ['explore-projects', searchQuery],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq('post_type', 'project')
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

  if (!projects || projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <FolderOpen className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No se encontraron proyectos</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {projects?.map((project) => (
        <Card 
          key={project.id} 
          className="overflow-hidden cursor-pointer hover:opacity-80 transition-opacity bg-[#262626] border-none"
          onClick={() => navigate(`/projects`)}
        >
          {/* Imagen o placeholder */}
          {project.media_url ? (
            <img 
              src={project.media_url} 
              alt={project.content}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <FolderOpen className="h-12 w-12 text-white" />
            </div>
          )}
          
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm line-clamp-2 text-white">
              {project.content?.substring(0, 60) || 'Proyecto sin título'}...
            </h3>
            
            <div className="mt-2 flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarImage src={project.profiles?.avatar_url} />
                <AvatarFallback className="text-xs bg-gray-700 text-white">
                  {project.profiles?.username?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-gray-400 truncate">
                @{project.profiles?.username || 'usuario'}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
