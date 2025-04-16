
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkerForm, WorkerFormValues } from "@/components/WorkerForm";
import { useWorkerOperations } from "@/hooks/useWorkerOperations";
import { toast } from "sonner";

interface AddWorkerDialogProps {
  onWorkerAdded: () => void;
}

export function AddWorkerDialog({ onWorkerAdded }: AddWorkerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { addWorker, loading } = useWorkerOperations();

  const handleSubmit = async (data: WorkerFormValues) => {
    try {
      const success = await addWorker(data);
      if (success) {
        setOpen(false);
        onWorkerAdded();
      }
      return success;
    } catch (error) {
      console.error("Error in AddWorkerDialog:", error);
      toast.error("Failed to add worker. Please try again.");
      return false;
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
        <WorkerForm onSubmit={handleSubmit} isLoading={loading} />
      </DialogContent>
    </Dialog>
  );
}
