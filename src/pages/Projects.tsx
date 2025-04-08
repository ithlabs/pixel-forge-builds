
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects } from "@/hooks/useProjects";
import { formatCurrency } from "@/lib/formatters";
import { Plus, Search } from "lucide-react";

const Projects = () => {
  const { projects, loading } = useProjects();

  // Map project statuses to the expected ProjectCard status type
  const mapStatusToProjectCardStatus = (status: string): "completed" | "planned" | "on_hold" | "ongoing" => {
    switch (status) {
      case "completed":
        return "completed";
      case "in_progress":
        return "ongoing";
      case "on_hold":
        return "on_hold";
      case "planned":
      default:
        return "planned";
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Projects" 
          description="Manage your construction projects"
          className="mb-4 md:mb-0"
        />
        <Button className="bg-construction-orange hover:bg-construction-orange/90">
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search projects..." 
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="whitespace-nowrap">
              Filter
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              Sort
            </Button>
          </div>
        </div>
      </Card>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="p-4 space-y-3">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              name={project.name}
              location={project.location || ""}
              startDate={project.start_date ? new Date(project.start_date).toLocaleDateString() : "TBD"}
              endDate={project.end_date ? new Date(project.end_date).toLocaleDateString() : "TBD"}
              budget={project.budget ? formatCurrency(project.budget) : "Not set"}
              status={mapStatusToProjectCardStatus(project.status)}
              progress={project.status === "completed" ? 100 : project.status === "planned" ? 0 : 50}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
