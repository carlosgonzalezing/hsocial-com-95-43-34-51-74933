import { Heart, Star, Lightbulb, GraduationCap, Handshake } from "lucide-react";

export const reactionIcons = {
  awesome: {
    icon: Star,
    color: "text-yellow-400",
    label: "Genial",
    emoji: "⭐",
    animationClass: "reaction-awesome",
    size: "text-2xl"
  },
  love: { 
    icon: Heart, 
    color: "text-red-500", 
    label: "Me encanta",
    emoji: "❤️",
    animationClass: "reaction-love",
    size: "text-2xl"
  },
  interesting: {
    icon: Lightbulb,
    color: "text-orange-500",
    label: "Interesante",
    emoji: "💡",
    animationClass: "reaction-interesting",
    size: "text-2xl"
  },
  success: {
    icon: GraduationCap,
    color: "text-blue-600",
    label: "Éxito",
    emoji: "🎓",
    animationClass: "reaction-success",
    size: "text-2xl"
  },
  join: {
    icon: Handshake,
    color: "text-green-500",
    label: "Me uno",
    emoji: "🤝",
    animationClass: "reaction-join",
    size: "text-2xl"
  }
} as const;

export type ReactionType = keyof typeof reactionIcons;
