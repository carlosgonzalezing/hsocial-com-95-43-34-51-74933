// src/components/navigation/MobileBottomNavigation.tsx

import { Home, Search, Plus, PlaySquare, User } from "lucide-react"; // 👈 Íconos de Instagram
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
  pendingRequestsCount,
}: MobileBottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 👈 MODIFICACIÓN CLAVE: Ocultar solo en mensajes
  const hideOnPaths = ["/messages"];
  const shouldHide = hideOnPaths.some((path) => location.pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }

  // 👈 MODIFICACIÓN CLAVE: El nuevo array con 5 items
  const navItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/",
      badge: newPosts > 0 ? newPosts : null,
    },

    {
      icon: Search,
      label: "Buscar",
      path: "/search",
      badge: null,
    },

    {
      icon: Plus,
      label: "Crear",
      path: "/create", // Idealmente un modal
      badge: null,
      isCreate: true, // Para hacer el ícono + más grande
    },

    {
      icon: PlaySquare,
      label: "Reels",
      path: "/reels",
      badge: null,
    },

    {
      icon: User,
      label: "Perfil",
      path: currentUserId ? `/profile/${currentUserId}` : "/auth",
      badge: null,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t z-50 md:hidden">
      {/* 👈 MODIFICACIÓN CLAVE: grid-cols-5 para los 5 íconos */}
      <div className="grid grid-cols-5 items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            location.pathname === item.path || (item.label === "Perfil" && location.pathname.startsWith("/profile"));

          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative w-full",
                isActive ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon
                className={cn(
                  "h-6 w-6 mb-1",
                  item.isCreate && "h-7 w-7", // Ícono "+" más grande
                )}
              />
              <span className="text-xs font-medium">{item.label}</span>

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
