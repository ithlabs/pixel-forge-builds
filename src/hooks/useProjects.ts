
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from '@/integrations/supabase/types';

export interface Project {
  id: string;
  name: string;
  location: string | null;
  start_date: string | null;
  end_date: string | null;
  budget: number | null;
  status: "planned" | "in_progress" | "completed" | "on_hold";
  client: string;
  created_at: string;
  updated_at: string;
}

// Demo data for when no projects exist in the database
const demoProjects: Project[] = [
  {
    id: "1",
    name: "Addis Heights Apartments",
    location: "Addis Ababa, Ethiopia",
    start_date: "2024-12-01",
    end_date: "2025-09-30",
    budget: 5500000,
    status: "in_progress",
    client: "Addis Development Corp",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Mekelle Office Complex",
    location: "Mekelle, Tigray",
    start_date: "2025-05-15",
    end_date: null,
    budget: 3200000,
    status: "planned",
    client: "Tigray Business Group",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "3", 
    name: "Hawassa Resort Extension",
    location: "Hawassa, SNNPR",
    start_date: "2024-08-10",
    end_date: "2025-02-28",
    budget: 1800000,
    status: "completed",
    client: "Southern Tourism Ltd",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "4",
    name: "Blue Nile Bridge Repair",
    location: "Bahir Dar, Amhara",
    start_date: "2024-11-15",
    end_date: "2025-06-30",
    budget: 850000,
    status: "on_hold",
    client: "Ethiopian Roads Authority",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "5",
    name: "Dire Dawa Commercial Center",
    location: "Dire Dawa",
    start_date: "2025-03-01",
    end_date: "2026-04-30",
    budget: 4100000,
    status: "planned",
    client: "Eastern Developers Ltd",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      // If no data is returned, use demo data
      if (!data || data.length === 0) {
        console.log("No projects found in the database. Using demo data.");
        setProjects(demoProjects);
        return;
      }
      
      // Map the data from Supabase to ensure the status matches our Project interface
      const typedProjects: Project[] = (data || []).map(project => {
        // Validate and convert the status to our expected type
        let status: "planned" | "in_progress" | "completed" | "on_hold";
        
        switch (project.status) {
          case "planned":
            status = "planned";
            break;
          case "in_progress":
            status = "in_progress";
            break;
          case "completed":
            status = "completed";
            break;
          case "on_hold":
            status = "on_hold";
            break;
          default:
            // Default to "planned" if we get an unexpected status
            status = "planned";
            console.warn(`Unexpected project status: ${project.status}`);
        }
        
        return {
          ...project,
          status: status
        };
      });
      
      setProjects(typedProjects);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err);
      toast({
        title: "Error fetching projects",
        description: err.message || "An unexpected error occurred",
        variant: "destructive",
      });
      
      // Use demo data as fallback
      setProjects(demoProjects);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchProjects();
    
    // Set up a real-time subscription for projects table
    const projectsSubscription = supabase
      .channel('projects-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'projects' 
      }, () => {
        console.log('Projects table changed, refreshing data...');
        fetchProjects();
      })
      .subscribe();
    
    // Clean up subscription when component unmounts
    return () => {
      supabase.removeChannel(projectsSubscription);
    };
  }, [fetchProjects]);
  
  return { projects, loading, error, refetch: fetchProjects };
}
