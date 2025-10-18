import { Home, User, FolderOpen, PlaySquare, Search, PlusSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MobileBottomNavigationProps {
  currentUserId: string | null;
  unreadNotifications: number;
  newPosts: number;
  pendingRequestsCount: number;
}

export function MobileBottomNavigation({
  currentUserId,
  unreadNotifications,
  newPosts,
  pendingRequestsCount
}: MobileBottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/",
      badge: newPosts > 0 ? newPosts : null
    },
    {
      icon: Search,
      label: "Explorar",
      path: "/explore",
      badge: null
    },
    {
      icon: PlusSquare,
      label: "Crear",
      path: "/",
      badge: null,
      isAction: true
    },
    {
      icon: PlaySquare,
      label: "Reels",
      path: "/reels",
      badge: null
    },
    {
      icon: User,
      label: "Perfil",
      path: currentUserId ? `/profile/${currentUserId}` : "/auth",
      badge: null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-white/10 z-50 md:hidden">
      <div className="grid grid-cols-5 items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
            (item.label === "Perfil" && location.pathname.startsWith('/profile'));
          
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center h-full"
            >
              <Icon 
                className={cn(
                  "h-7 w-7",
                  isActive ? "text-[#0095f6]" : "text-white"
                )}
                strokeWidth={isActive ? 2 : 1.5}
              />
              
              {item.badge && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}