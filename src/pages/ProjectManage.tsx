
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock, Users, Package, DollarSign, FileEdit } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectManage = () => {
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
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title={`Manage: ${project.name}`}
          description="Control and oversee all aspects of your project"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate(`/projects/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Button>
          <Button 
            variant="outline"
            className="bg-construction-navy text-white hover:bg-construction-navy/90"
            onClick={() => {/* Edit project function - future implementation */}}
          >
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="schedule" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-0">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Project Schedule</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-10">
                Schedule management features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Project Tasks</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-10">
                Task management features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Project Team</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-10">
                Team management features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-0">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Project Materials</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-10">
                Materials management features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="mt-0">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Project Budget</h3>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-10">
                Budget management features coming soon.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectManage;
