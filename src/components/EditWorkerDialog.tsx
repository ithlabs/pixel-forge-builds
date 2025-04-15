
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WorkerForm, WorkerFormValues } from "@/components/WorkerForm";
import { useProjectOperations } from "@/hooks/useProjectOperations";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";

interface EditWorkerDialogProps {
  worker: {
    id: string;
    name: string;
    role: string;
    phone: string;
    ratePerDay: string;
    projectName?: string;
    type: "daily" | "contract" | "permanent";
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onWorkerUpdated: () => void;
}

export function EditWorkerDialog({ worker, open, onOpenChange, onWorkerUpdated }: EditWorkerDialogProps) {
  const { updateTeamMember, loading } = useProjectOperations();
  const [isUpdating, setIsUpdating] = React.useState(false);

  const handleSubmit = async (data: WorkerFormValues) => {
    setIsUpdating(true);
    try {
      console.log("Updating worker:", worker.id, {
        name: data.name,
        role: data.role,
        phone: data.phone || null,
        rate_per_day: parseFloat(data.ratePerDay),
        type: data.type,
      });
      
      // Update directly in Supabase
      const { error } = await supabase
        .from('workers')
        .update({
          name: data.name,
          role: data.role,
          phone: data.phone || null,
          rate_per_day: parseFloat(data.ratePerDay),
          type: data.type,
        })
        .eq('id', worker.id);
        
      if (error) {
        throw error;
      }
      
      sonnerToast.success("Worker updated successfully");
      onOpenChange(false);
      onWorkerUpdated();
      return true;
    } catch (error) {
      console.error("Error updating worker:", error);
      sonnerToast.error("Failed to update worker");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Worker</DialogTitle>
          <DialogDescription>
            Make changes to the worker's information below.
          </DialogDescription>
        </DialogHeader>
        <WorkerForm 
          defaultValues={{
            name: worker.name,
            role: worker.role,
            phone: worker.phone,
            ratePerDay: worker.ratePerDay.replace("$", ""),
            type: worker.type,
            projectName: worker.projectName,
          }}
          onSubmit={handleSubmit}
          isLoading={isUpdating}
        />
      </DialogContent>
    </Dialog>
  );
}
