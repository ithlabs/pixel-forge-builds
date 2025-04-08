
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const Projects = () => {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      name: "Addis Heights Apartments",
      location: "Bole, Addis Ababa",
      startDate: "Jan 12, 2025",
      endDate: "Nov 30, 2025",
      budget: "$1.2M",
      status: "ongoing" as const,
      progress: 45,
    },
    {
      id: 2,
      name: "Mekelle Office Complex",
      location: "Mekelle, Tigray",
      startDate: "Mar 01, 2025",
      endDate: "Aug 15, 2025",
      budget: "$650K",
      status: "ongoing" as const,
      progress: 28,
    },
    {
      id: 3,
      name: "Hawassa Resort",
      location: "Hawassa, SNNPR",
      startDate: "May 15, 2025",
      endDate: "Jun 01, 2026",
      budget: "$3.5M",
      status: "planned" as const,
      progress: 0,
    },
    {
      id: 4,
      name: "Bahir Dar Community Center",
      location: "Bahir Dar, Amhara",
      startDate: "Sep 05, 2024",
      endDate: "Dec 15, 2024",
      budget: "$450K",
      status: "completed" as const,
      progress: 100,
    },
    {
      id: 5,
      name: "Dire Dawa Bridge",
      location: "Dire Dawa",
      startDate: "Feb 20, 2025",
      endDate: "Oct 10, 2025",
      budget: "$1.8M",
      status: "ongoing" as const,
      progress: 15,
    },
    {
      id: 6,
      name: "Adama Shopping Mall",
      location: "Adama, Oromia",
      startDate: "Jun 10, 2025",
      endDate: "Jul 25, 2026",
      budget: "$2.5M",
      status: "planned" as const,
      progress: 0,
    },
  ];

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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
