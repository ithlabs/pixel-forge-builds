
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkerForm, WorkerFormValues } from "@/components/WorkerForm";
import { supabase } from "@/integrations/supabase/client";
import { toast as sonnerToast } from "sonner";

interface AddWorkerDialogProps {
  onWorkerAdded: () => void;
}

export function AddWorkerDialog({ onWorkerAdded }: AddWorkerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleSubmit = async (data: WorkerFormValues) => {
    setIsAdding(true);
    try {
      console.log("Adding worker:", {
        name: data.name,
        role: data.role,
        phone: data.phone || null,
        rate_per_day: parseFloat(data.ratePerDay),
        type: data.type,
      });
      
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
      setOpen(false);
      onWorkerAdded();
      return true;
    } catch (error) {
      console.error("Error adding worker:", error);
      sonnerToast.error("Failed to add worker");
      return false;
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-construction-orange hover:bg-construction-orange/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Worker
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Worker</DialogTitle>
          <DialogDescription>
            Enter the worker details below to add them to your workforce.
          </DialogDescription>
        </DialogHeader>
        <WorkerForm onSubmit={handleSubmit} isLoading={isAdding} />
      </DialogContent>
    </Dialog>
  );
}
