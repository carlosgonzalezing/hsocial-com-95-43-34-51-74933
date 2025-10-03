import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  UserCog, 
  Lock, 
  Mail, 
  Phone, 
  LogOut,
  Moon,
  Sun,
  UserPlus,
  Crown,
  Palette,
  Users,
  Settings,
  ChevronRight,
  Bookmark,
  Clock,
  Store,
  Calendar,
  HelpCircle,
  Bot,
  Camera,
  Building
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface MenuOptionsProps {
  userId: string | null;
  onClose: () => void;
  onCopyProfileLink: () => void;
}

export function MenuOptions({ userId, onClose, onCopyProfileLink }: MenuOptionsProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo cerrar sesión",
      });
    } else {
      onClose();
      navigate("/auth");
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión exitosamente",
      });
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="px-4 bg-background space-y-1">
      {/* HSocial AI Section */}
      <Button
        variant="ghost"
        className="w-full justify-start h-12 px-3 rounded-lg hover:bg-facebook-gray-100"
        onClick={() => toast({
          title: "HSocial AI",
          description: "Próximamente disponible"
        })}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mr-3">
          <Bot className="h-4 w-4 text-white" />
        </div>
        <span className="font-medium">HSocial AI</span>
        <span className="ml-auto text-xs text-muted-foreground">Próximamente</span>
      </Button>
      
      <Separator className="my-2" />
      
      {/* Tus accesos directos */}
      <div className="py-2">
        <h3 className="text-sm font-semibold text-facebook-gray-600 mb-2 px-3">Tus accesos directos</h3>
        
      </div>
      
      
      {/* Settings and Support */}
      <div className="py-2">
        <Button
          variant="ghost"
          className="w-full justify-start h-12 px-3 rounded-lg hover:bg-facebook-gray-100"
          onClick={() => handleNavigate("/settings")}
        >
          <Settings className="h-5 w-5 mr-3 text-facebook-gray-600" />
          <span>Configuración y privacidad</span>
        </Button>
        
        
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between h-12 px-3 rounded-lg hover:bg-facebook-gray-100 cursor-pointer">
          <div className="flex items-center">
            {theme === "dark" ? (
              <Moon className="h-5 w-5 mr-3 text-facebook-gray-600" />
            ) : (
              <Sun className="h-5 w-5 mr-3 text-facebook-gray-600" />
            )}
            <span>Modo oscuro</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              {theme === "dark" ? "Activado" : "Desactivado"}
            </span>
            <Switch 
              checked={theme === "dark"}
              onCheckedChange={toggleTheme}
            />
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start h-12 px-3 rounded-lg hover:bg-facebook-gray-100 text-facebook-gray-600"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>Cerrar sesión</span>
        </Button>
      </div>

    </div>
  );
}