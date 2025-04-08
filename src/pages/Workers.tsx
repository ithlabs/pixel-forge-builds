
import { PageHeader } from "@/components/PageHeader";
import { WorkerCard } from "@/components/WorkerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const Workers = () => {
  // Mock data for workers
  const workers = [
    {
      id: 1,
      name: "Abebe Kebede",
      role: "Site Engineer",
      phone: "+251 91 234 5678",
      ratePerDay: "$45",
      projectName: "Addis Heights Apartments",
      type: "permanent" as const,
    },
    {
      id: 2,
      name: "Sara Haile",
      role: "Foreman",
      phone: "+251 92 345 6789",
      ratePerDay: "$35",
      projectName: "Mekelle Office Complex",
      type: "permanent" as const,
    },
    {
      id: 3,
      name: "Dawit Teshome",
      role: "Electrician",
      phone: "+251 93 456 7890",
      ratePerDay: "$28",
      projectName: "Addis Heights Apartments",
      type: "contract" as const,
    },
    {
      id: 4,
      name: "Tigist Alemu",
      role: "Plumber",
      phone: "+251 94 567 8901",
      ratePerDay: "$25",
      projectName: "Mekelle Office Complex",
      type: "contract" as const,
    },
    {
      id: 5,
      name: "Haile Gebrselassie",
      role: "Laborer",
      phone: "+251 95 678 9012",
      ratePerDay: "$15",
      projectName: "Addis Heights Apartments",
      type: "daily" as const,
    },
    {
      id: 6,
      name: "Meron Bekele",
      role: "Painter",
      phone: "+251 96 789 0123",
      ratePerDay: "$20",
      projectName: "Dire Dawa Bridge",
      type: "daily" as const,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Workers / HR" 
          description="Manage your workforce and human resources"
          className="mb-4 md:mb-0"
        />
        <Button className="bg-construction-orange hover:bg-construction-orange/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Worker
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search workers..." 
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
        {workers.map(worker => (
          <WorkerCard key={worker.id} {...worker} />
        ))}
      </div>
    </div>
  );
};

export default Workers;
