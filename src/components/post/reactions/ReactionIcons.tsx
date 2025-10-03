
import { Heart, ThumbsUp, Laugh, Zap, Angry, Handshake } from "lucide-react";

export const reactionIcons = {
  love: { 
    icon: Heart, 
    color: "text-red-500", 
    label: "Me encanta",
    emoji: "❤️",
    animationClass: "reaction-love",
    size: "text-2xl"
  }
} as const;

export type ReactionType = keyof typeof reactionIcons;
