import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { StoryCircle } from "./StoryCircle";
import { useStories } from "@/hooks/stories/use-stories";
import { useState } from "react";
import { StoryViewer } from "./StoryViewer";
import { StoryCreator } from "./StoryCreator";
import { useAuth } from "@/hooks/use-auth";

export function StoriesBar() {
  const { user } = useAuth();
  const { stories, isLoading } = useStories();
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [showCreator, setShowCreator] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full border-b bg-card">
        <div className="flex gap-3 overflow-x-auto py-4 px-4 scrollbar-hide">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-muted animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!stories.length && !user) return null;

  return (
    <>
      {/* Stories Bar - Estilo Instagram Dark Mode */}
      <div className="w-full border-b border-white/10 bg-black">
        <ScrollArea className="w-full">
          <div className="flex gap-4 py-3 px-4">
            {/* Create Story Button - Primer círculo con + */}
            {user && (
              <StoryCircle
                isCreate
                onClick={() => setShowCreator(true)}
              />
            )}

            {/* Story Circles */}
            {stories.map((story) => (
              <StoryCircle
                key={story.id}
                story={story}
                onClick={() => setSelectedStoryId(story.id)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryId && (
        <StoryViewer
          storyId={selectedStoryId}
          allStories={stories}
          onClose={() => setSelectedStoryId(null)}
          onNavigate={setSelectedStoryId}
        />
      )}

      {/* Story Creator Modal */}
      <StoryCreator
        open={showCreator}
        onOpenChange={setShowCreator}
      />
    </>
  );
}
