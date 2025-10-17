import { useState } from "react";
import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Lightbulb, FolderOpen, Users } from "lucide-react";
import { IdeaGrid } from "@/components/explore/IdeaGrid";
import { ProjectGrid } from "@/components/explore/ProjectGrid";
import { UserGrid } from "@/components/explore/UserGrid";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("ideas");

  return (
    <Layout hideLeftSidebar hideRightSidebar>
      <div className="min-h-screen bg-background pb-20">
        {/* Sticky search bar */}
        <div className="sticky top-14 z-40 bg-background border-b px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar usuarios, ideas, proyectos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 rounded-full"
            />
          </div>
        </div>

        {/* Content tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-around h-12 rounded-none border-b bg-background sticky top-[120px] z-30">
            <TabsTrigger value="ideas" className="flex-1 gap-2">
              <Lightbulb className="h-4 w-4" />
              Ideas
            </TabsTrigger>
            <TabsTrigger value="proyectos" className="flex-1 gap-2">
              <FolderOpen className="h-4 w-4" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="usuarios" className="flex-1 gap-2">
              <Users className="h-4 w-4" />
              Usuarios
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ideas" className="p-4 mt-0">
            <IdeaGrid searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="proyectos" className="p-4 mt-0">
            <ProjectGrid searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="usuarios" className="p-4 mt-0">
            <UserGrid searchQuery={searchQuery} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
