import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface Story {
  id: string;
  user_id: string;
  username: string;
  avatar_url: string | null;
  has_viewed: boolean;
  story_count: number;
}

interface StoryCircleProps {
  story?: Story;
  isCreate?: boolean;
  onClick?: () => void;
}

export function StoryCircle({ story, isCreate, onClick }: StoryCircleProps) {
  if (isCreate) {
    return (
      <button
        onClick={onClick}
        className="flex-shrink-0 flex flex-col items-center gap-1 group"
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
            <Plus className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
        <span className="text-xs font-medium max-w-[64px] truncate">
          Tu historia
        </span>
      </button>
    );
  }

  const hasGradient = !story?.has_viewed;

  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 flex flex-col items-center gap-1 group"
    >
      <div className="relative">
        {/* Gradient border for unviewed stories */}
        <div
          className={cn(
            "w-[68px] h-[68px] rounded-full p-[2px] transition-all",
            hasGradient
              ? "bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500"
              : "bg-muted"
          )}
        >
          <div className="w-full h-full rounded-full bg-card flex items-center justify-center p-[3px]">
            <Avatar className="w-full h-full">
              <AvatarImage src={story?.avatar_url || undefined} />
              <AvatarFallback>
                {story?.username?.charAt(0).toUpperCase() || "?"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Story count badge */}
        {story && story.story_count > 1 && (
          <div className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-card">
            {story.story_count}
          </div>
        )}
      </div>
      <span className="text-xs font-medium max-w-[68px] truncate">
        {story?.username || "Usuario"}
      </span>
    </button>
  );
}
