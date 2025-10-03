import { PostCardWithTracking } from "./PostCardWithTracking";
import { UnifiedPostCard } from "@/components/UnifiedPostCard";
import { PeopleYouMayKnow } from "@/components/friends/PeopleYouMayKnow";
import { useIsMobile } from "@/hooks/use-mobile";
import type { Post } from "@/types/post";
import { getDemoPostsForFeed } from "@/data/demo-posts";

interface FeedContentProps {
  posts: Post[];
  trackPostView?: (postId: string, duration?: number) => void;
  trackPostInteraction?: (postId: string, type: 'like' | 'comment' | 'share') => void;
}

export function FeedContent({ 
  posts,
  trackPostView,
  trackPostInteraction
}: FeedContentProps) {
  const isMobile = useIsMobile();
  
  // Mezclar posts reales con posts de demostración
  const allPosts = getDemoPostsForFeed(posts);
  
  const renderFeedPosts = () => {
    const feedContent = [];
    
    // Distribute posts with ads and recommendations
    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      
      // Verificar si es un post de demo (no enviar tracking)
      const isDemo = post.id.startsWith('demo-');
      
      // Add a post with tracking (no tracking para posts demo)
      feedContent.push(
        <div key={post.id} className="mb-0 w-full">
          <UnifiedPostCard 
            post={post} 
            isInFeed={true}
            trackPostView={isDemo ? undefined : trackPostView}
            trackPostInteraction={isDemo ? undefined : trackPostInteraction}
          />
        </div>
      );
      
      // Add People You May Know after 5 posts on desktop, after 6 on mobile
      if ((isMobile ? i === 6 : i === 4) && !feedContent.some(item => item.key === "people-you-may-know")) {
        feedContent.push(
          <div key="people-you-may-know" className="mb-0 w-full px-0 md:px-4">
            <PeopleYouMayKnow />
          </div>
        );
      }

      // Ad slots removed for better performance
    }
    
    return feedContent;
  };

  return (
    <div className="space-y-0 w-full">
      {renderFeedPosts()}
    </div>
  );
}
