
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, mapProjectStatusToCardStatus } from "@/lib/formatters";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  
  const project = projects.find(p => p.id === id);
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 ml-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Skeleton className="h-[100px]" />
          <Skeleton className="h-[100px]" />
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">The project you are looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }

  const projectStatus = mapProjectStatusToCardStatus(project.status);
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title={project.name}
          description={`Client: ${project.client}`}
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate('/projects')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button 
            className="bg-construction-orange hover:bg-construction-orange/90"
            onClick={() => navigate(`/projects/${id}/manage`)}
          >
            Manage Project
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="border-b">
            <h3 className="text-lg font-semibold">Project Overview</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                <p>{project.location || "No location set"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Timeline</h4>
                <p>
                  {project.start_date ? new Date(project.start_date).toLocaleDateString() : "TBD"} - 
                  {project.end_date ? new Date(project.end_date).toLocaleDateString() : "TBD"}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Budget</h4>
                <p>{project.budget ? formatCurrency(project.budget) : "Not set"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Status</h4>
                <Badge
                  className={
                    projectStatus === "ongoing" 
                      ? "bg-blue-500" 
                      : projectStatus === "completed" 
                      ? "bg-green-500" 
                      : projectStatus === "on_hold"
                      ? "bg-amber-500"
                      : "bg-amber-500"
                  }
                >
                  {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1).replace('_', ' ')}
                </Badge>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-2">Progress</h4>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ 
                    width: `${projectStatus === "completed" ? 100 : 
                    projectStatus === "planned" ? 0 : 
                    projectStatus === "ongoing" ? 65 :
                    projectStatus === "on_hold" ? 30 : 50}%` 
                  }}
                ></div>
              </div>
              <p className="text-sm text-right">{
                projectStatus === "completed" ? 100 : 
                projectStatus === "planned" ? 0 : 
                projectStatus === "ongoing" ? 65 :
                projectStatus === "on_hold" ? 30 : 50
              }%</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="border-b">
            <h3 className="text-lg font-semibold">Project Info</h3>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Client</h4>
              <p>{project.client}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Created</h4>
              <p>{new Date(project.created_at).toLocaleDateString()}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Updated</h4>
              <p>{new Date(project.updated_at).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDetails;
