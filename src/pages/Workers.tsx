
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { WorkerCard } from "@/components/WorkerCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { AddWorkerDialog } from "@/components/AddWorkerDialog";
import { supabase } from "@/integrations/supabase/client";

type Worker = {
  id: number;
  name: string;
  role: string;
  phone: string;
  ratePerDay: string;
  projectName?: string;
  type: "daily" | "contract" | "permanent";
};

const Workers = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchWorkers = async () => {
    setIsLoading(true);
    try {
      // For now, we'll use mock data, but this would normally fetch from Supabase
      const mockWorkers = [
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
      
      setWorkers(mockWorkers);
    } catch (error) {
      console.error("Error fetching workers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const filteredWorkers = workers.filter(worker => 
    worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    worker.phone.includes(searchQuery) ||
    (worker.projectName && worker.projectName.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Workers / HR" 
          description="Manage your workforce and human resources"
          className="mb-4 md:mb-0"
        />
        <AddWorkerDialog onWorkerAdded={fetchWorkers} />
      </div>
      
      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search workers..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Card key={n} className="w-full h-[200px] animate-pulse bg-gray-100"></Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkers.length > 0 ? (
            filteredWorkers.map(worker => (
              <WorkerCard 
                key={worker.id} 
                {...worker} 
                onWorkerUpdated={fetchWorkers}
              />
            ))
          ) : (
            <div className="col-span-3 py-8 text-center text-gray-500">
              No workers found matching your search criteria
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Workers;
