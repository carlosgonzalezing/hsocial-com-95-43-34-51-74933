import { Home, Search, Plus, PlaySquare, User } from "lucide-react"; // 👈 MODIFICADO: Solo se importan los 5 íconos necesarios (Home, Search, Plus, PlaySquare, User)
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MobileBottomNavigationProps {
  currentUserId: string | null;
  unreadNotifications: number; // Mantenemos para 'Home' si deseas mostrar notificaciones de nuevos posts
  newPosts: number;
  pendingRequestsCount: number; // Mantenemos aunque no se use en esta barra
}

export function MobileBottomNavigation({
  currentUserId,
  unreadNotifications, // No se usa directamente, pero se mantiene en props
  newPosts,
  pendingRequestsCount,
}: MobileBottomNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // 👈 MODIFICADO: Solo se oculta en mensajes
  const hideOnPaths = ["/messages"];
  const shouldHide = hideOnPaths.some((path) => location.pathname.startsWith(path));

  if (shouldHide) {
    return null;
  }

  // 👈 MODIFICADO: Nuevo array de 5 íconos estilo Instagram
  const navItems = [
    {
      icon: Home,
      label: "Inicio",
      path: "/",
      // Usamos newPosts para el badge de inicio (como nuevos feeds)
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
      path: "/create",
      badge: null,
      isCreate: true, // Para aplicar estilos de icono más grande
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
      {/* 👈 MODIFICADO: grid-cols-5 para los 5 íconos */}
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
                // Mantenemos el estilo de activación de tu código original, pero lo simplificamos a solo texto para ser más "Instagram-like"
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {/* 👈 MODIFICADO: Ajuste condicional del tamaño del ícono */}
              <Icon
                className={cn(
                  "h-6 w-6", // Ícono base ligeramente más grande
                  item.isCreate && "h-7 w-7", // Ícono "+" (Crear) más grande
                  !item.label && "mb-0", // Si no hay label, quitar margen
                  item.label && "mb-0", // Quitamos el margin-bottom para un look más limpio, pero lo mantenemos si quieres el texto abajo.
                )}
              />
              {/* Quitamos la etiqueta de texto para un look más minimalista (solo íconos) o la mantenemos si es necesaria para la UX */}
              {/* <span className="text-xs font-medium">{item.label}</span> */}

              {/* Mantenemos el badge para 'newPosts' en Home */}
              {item.badge && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {item.badge}
                </Badge>
              )}
              {/* Quitamos el punto rojo de notificaciones ya que no está en los 5 nuevos items, pero lo dejamos si lo usas en Home. */}
              {/* {item.showRedDot && (
                <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
              )} */}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
