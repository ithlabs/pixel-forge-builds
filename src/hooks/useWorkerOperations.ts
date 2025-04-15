
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

export function useWorkerOperations() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Team member operations
  const updateTeamMember = async (id: string, data: any) => {
    setLoading(true);
    try {
      console.log("Updating team member:", id, data);
      
      // Update directly in Supabase
      const { error } = await supabase
        .from('workers')
        .update({
          name: data.name,
          role: data.role,
          phone: data.phone || null,
          rate_per_day: parseFloat(data.rate_per_day),
          type: data.type,
        })
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      sonnerToast.success("Worker updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error updating team member:", error);
      toast({
        title: "Error updating worker",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteTeamMember = async (id: string) => {
    setLoading(true);
    try {
      console.log("Deleting team member:", id);
      
      // Delete directly from Supabase
      const { error } = await supabase
        .from('workers')
        .delete()
        .eq('id', id);
        
      if (error) {
        throw error;
      }
      
      sonnerToast.success("Worker removed successfully");
      return true;
    } catch (error: any) {
      console.error("Error deleting team member:", error);
      toast({
        title: "Error removing worker",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Worker operations
  const addWorker = async (data: any) => {
    setLoading(true);
    try {
      console.log("Adding worker:", data);
      
      // Insert directly to Supabase
      const { data: workerData, error } = await supabase
        .from('workers')
        .insert({
          name: data.name,
          role: data.role,
          phone: data.phone || null,
          rate_per_day: parseFloat(data.ratePerDay),
          type: data.type,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      sonnerToast.success("Worker added successfully");
      return true;
    } catch (error: any) {
      console.error("Error adding worker:", error);
      toast({
        title: "Error adding worker",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    updateTeamMember,
    deleteTeamMember,
    addWorker,
  };
}
