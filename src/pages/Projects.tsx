import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectCreatorModal } from '@/components/projects/ProjectCreatorModal';
import { ProjectModal } from '@/components/projects/ProjectModal';
import { Layout } from '@/components/layout';
import { PROJECT_CATEGORIES, type Project } from '@/types/project';

export default function Projects() {
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Sin datos de demostración - solo proyectos reales de la BD
  const isLoading = false;
  const projects: Project[] = [];

  const filteredProjects = projects?.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Proyectos Universitarios - HSocial</title>
          <meta name="description" content="Explora e inspírate con ideas innovadoras de proyectos universitarios" />
        </Helmet>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                  Proyectos Universitarios
                </h1>
                <p className="text-lg opacity-90">
                  Explora e inspírate con ideas innovadoras
                </p>
              </div>
              <Button
                onClick={() => setIsCreatorModalOpen(true)}
                className="bg-white text-primary hover:bg-gray-100 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 self-center lg:self-auto"
              >
                <Plus size={20} />
                Crear
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Buscar proyectos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 rounded-lg border-2 focus:border-primary"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex items-center gap-2 md:w-64">
                <Filter className="text-muted-foreground" size={20} />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="rounded-lg border-2">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {PROJECT_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Projects Grid - Better responsive layout */}
        <div className="container mx-auto px-4 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted rounded-xl h-96"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron proyectos
              </h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Intenta ajustar tus filtros de búsqueda'
                  : 'Sé el primero en compartir un proyecto innovador'
                }
              </p>
            </div>
          )}
        </div>

        {/* Modals */}
        <ProjectCreatorModal
          open={isCreatorModalOpen}
          onOpenChange={setIsCreatorModalOpen}
        />
        
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            open={!!selectedProject}
            onOpenChange={(open) => !open && setSelectedProject(null)}
          />
        )}
      </div>
    </Layout>
  );
}