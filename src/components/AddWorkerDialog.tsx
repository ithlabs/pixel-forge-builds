
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { WorkerForm, WorkerFormValues } from "@/components/WorkerForm";
import { useProjectOperations } from "@/hooks/useProjectOperations";

interface AddWorkerDialogProps {
  onWorkerAdded: () => void;
}

export function AddWorkerDialog({ onWorkerAdded }: AddWorkerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { addWorker, loading } = useProjectOperations();

  const handleSubmit = async (data: WorkerFormValues) => {
    const success = await addWorker({
      name: data.name,
      role: data.role,
      phone: data.phone || null,
      rate_per_day: parseFloat(data.ratePerDay),
      type: data.type,
    });

    if (success) {
      setOpen(false);
      onWorkerAdded();
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
