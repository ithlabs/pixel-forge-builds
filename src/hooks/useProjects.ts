
import { useState, useEffect } from "react";
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

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });
          
        if (error) {
          throw error;
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
        setError(err);
        toast({
          title: "Error fetching projects",
          description: err.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);
  
  return { projects, loading, error };
}
