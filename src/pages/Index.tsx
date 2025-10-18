import React from "react";
import { PostCreatorModal } from "@/components/PostCreatorModal";
import { Feed } from "@/components/feed/Feed";
import { FacebookLayout } from "@/components/layout/FacebookLayout";
import { useAuth } from "@/hooks/use-auth";
import { SimpleOnboardingModal } from "@/components/onboarding/SimpleOnboardingModal";
import { useOnboarding } from "@/hooks/use-onboarding";
import { StoriesBar } from "@/components/stories/StoriesBar";


export default function Index() {
  const { user } = useAuth();
  const [isPostModalOpen, setIsPostModalOpen] = React.useState(false);
  const [openWithMedia, setOpenWithMedia] = React.useState(false);
  const [selectedMood, setSelectedMood] = React.useState<any>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const { showOnboarding, completeOnboarding } = useOnboarding();

  const handleOpenModal = () => {
    setOpenWithMedia(false);
    setSelectedMood(null);
    setSelectedFile(null);
    setIsPostModalOpen(true);
  };

  const handleOpenModalWithMedia = () => {
    setOpenWithMedia(true);
    setSelectedMood(null);
    setSelectedFile(null);
    setIsPostModalOpen(true);
  };

  const handleFileDrop = (file: File) => {
    setSelectedFile(file);
    setOpenWithMedia(true);
    setSelectedMood(null);
    setIsPostModalOpen(true);
  };

  const handleMoodSelect = (type: 'mood' | 'activity', item: any) => {
    setSelectedMood({ ...item, type });
    setOpenWithMedia(false);
    setSelectedFile(null);
    setIsPostModalOpen(true);
  };

  return (
    <FacebookLayout>
      <div className="w-full space-y-0">
        {/* Stories Bar - Estilo Instagram */}
        <StoriesBar />
        
        {/* Feed Principal - Sin campo de texto */}
        <Feed />
      </div>

      <PostCreatorModal
        open={isPostModalOpen}
        onOpenChange={setIsPostModalOpen}
        focusOnOpen={!openWithMedia && !selectedMood}
        openWithMedia={openWithMedia}
        selectedMood={selectedMood}
        selectedFile={selectedFile}
      />

      <SimpleOnboardingModal
        isOpen={showOnboarding}
        onClose={completeOnboarding}
      />
    </FacebookLayout>
  );
}