import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Layout } from '@/components/layout';
import { ReelsInfiniteViewer } from '@/components/reels/ReelsInfiniteViewer';
import { useReelsFeed } from '@/hooks/reels/use-reels-feed';

export default function Reels() {
  const { 
    videosPosts, 
    isLoading, 
    trackReelView, 
    trackReelInteraction,
    hasVideos 
  } = useReelsFeed();

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Reels - HSocial</title>
          <meta name="description" content="Descubre videos cortos y creativos de la comunidad universitaria" />
        </Helmet>

        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-center">
              Reels
            </h1>
            <p className="text-center opacity-90 mt-2">
              Videos creativos de la comunidad
            </p>
          </div>
        </div>

        {/* Content - Fullscreen Reels */}
        {isLoading ? (
          <div className="flex justify-center items-center h-screen bg-background">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : hasVideos ? (
          <ReelsInfiniteViewer 
            posts={videosPosts} 
            onReaction={trackReelInteraction}
            onViewTracked={trackReelView}
          />
        ) : (
          <div className="flex items-center justify-center h-screen bg-background">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No hay videos disponibles
              </h3>
              <p className="text-muted-foreground">
                Sé el primero en compartir un video creativo
              </p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}