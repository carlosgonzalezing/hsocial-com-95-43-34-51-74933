import { useState } from "react";
import { FeedSkeleton } from "./FeedSkeleton";
import { EmptyFeed } from "./EmptyFeed";
import { Post } from "@/types/post";
import { FeedContent } from "./FeedContent";
import { usePersonalizedFeed } from "@/hooks/feed/use-personalized-feed";
import { useRealtimeFeedSimple } from "@/hooks/feed/hooks/use-realtime-feed-simple";
import { PersonalizedFeedToggle, FeedModeExplanation } from "./PersonalizedFeedToggle";
import { FeedFilters, type PostType } from "./FeedFilters";

interface FeedProps {
  userId?: string;
}

export function Feed({ userId }: FeedProps) {
  const [selectedTypes, setSelectedTypes] = useState<PostType[]>([]);

  const {
    posts,
    isLoading,
    isPersonalized,
    setIsPersonalized,
    trackPostView,
    trackPostInteraction,
    rawPostsCount,
    personalizedPostsCount
  } = usePersonalizedFeed(userId);

  // Set up real-time subscriptions for feed, reactions and comments
  useRealtimeFeedSimple(userId);

  if (isLoading) {
    return <FeedSkeleton />;
  }

  if (posts.length === 0) {
    return <EmptyFeed />;
  }

  // Filtrar posts por tipo
  const filteredPosts = selectedTypes.length > 0 
    ? posts.filter(post => selectedTypes.includes(post.post_type as PostType))
    : posts;

  if (filteredPosts.length === 0 && selectedTypes.length > 0) {
    return (
      <div className="space-y-4">
        <FeedFilters selectedTypes={selectedTypes} onTypeChange={setSelectedTypes} />
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay publicaciones que coincidan con los filtros seleccionados</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-0 feed-container mx-auto w-full">
      {/* Feed Mode Toggle */}
      <PersonalizedFeedToggle 
        isPersonalized={isPersonalized}
        onToggle={setIsPersonalized}
        stats={{ rawPostsCount, personalizedPostsCount }}
      />
      
      {/* Explanation */}
      <FeedModeExplanation isPersonalized={isPersonalized} />

      {/* Feed Filters */}
      <FeedFilters selectedTypes={selectedTypes} onTypeChange={setSelectedTypes} />

      {/* Feed Content */}
      <FeedContent 
        posts={filteredPosts as Post[]}
        trackPostView={trackPostView}
        trackPostInteraction={trackPostInteraction}
      />
    </div>
  );
}