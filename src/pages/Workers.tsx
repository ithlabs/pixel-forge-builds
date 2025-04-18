
import React, { useState, useEffect } from "react";
import { PageHeader } from "@/components/PageHeader";
import { AddWorkerDialog } from "@/components/AddWorkerDialog";
import { WorkerSearch } from "@/components/WorkerSearch";
import { WorkerGrid } from "@/components/WorkerGrid";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Worker = {
  id: string;
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
      // Fetch workers from Supabase
      const { data, error } = await supabase
        .from('workers')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      // Transform the workers data to match our UI format
      const transformedWorkers = data.map(worker => ({
        id: worker.id,
        name: worker.name,
        role: worker.role,
        phone: worker.phone || "",
        ratePerDay: `$${worker.rate_per_day}`,
        type: worker.type as "daily" | "contract" | "permanent",
      }));
      
      console.log("Fetched workers:", transformedWorkers);
      setWorkers(transformedWorkers);
    } catch (error: any) {
      console.error("Error fetching workers:", error);
      toast.error("Failed to load workers: " + (error.message || "Unknown error"));
      
      // Fallback to mock data when in development
      if (process.env.NODE_ENV === 'development') {
        const mockWorkers: Worker[] = [
          {
            id: "1",
            name: "Abebe Kebede",
            role: "Site Engineer",
            phone: "+251 91 234 5678",
            ratePerDay: "$45",
            projectName: "Addis Heights Apartments",
            type: "permanent",
          },
          {
            id: "2",
            name: "Sara Haile",
            role: "Foreman",
            phone: "+251 92 345 6789",
            ratePerDay: "$35",
            projectName: "Mekelle Office Complex",
            type: "permanent",
          },
          {
            id: "3",
            name: "Dawit Teshome",
            role: "Electrician",
            phone: "+251 93 456 7890",
            ratePerDay: "$28",
            projectName: "Addis Heights Apartments",
            type: "contract",
          },
          {
            id: "4",
            name: "Tigist Alemu",
            role: "Plumber",
            phone: "+251 94 567 8901",
            ratePerDay: "$25",
            projectName: "Mekelle Office Complex",
            type: "contract",
          },
          {
            id: "5",
            name: "Haile Gebrselassie",
            role: "Laborer",
            phone: "+251 95 678 9012",
            ratePerDay: "$15",
            projectName: "Addis Heights Apartments",
            type: "daily",
          },
          {
            id: "6",
            name: "Meron Bekele",
            role: "Painter",
            phone: "+251 96 789 0123",
            ratePerDay: "$20",
            projectName: "Dire Dawa Bridge",
            type: "daily",
          },
        ];
        
        setWorkers(mockWorkers);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    
    // Set up a real-time subscription for workers table
    const workersSubscription = supabase
      .channel('workers-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'workers' 
      }, () => {
        console.log('Workers table changed, refreshing data...');
        fetchWorkers();
      })
      .subscribe();
    
    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(workersSubscription);
    };
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
      
      <WorkerSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <WorkerGrid 
        workers={filteredWorkers}
        isLoading={isLoading}
        onWorkerUpdated={fetchWorkers}
      />
    </div>
  );
};

export default Workers;
