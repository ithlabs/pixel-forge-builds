
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { WorkerForm, WorkerFormValues } from "@/components/WorkerForm";
import { useProjectOperations } from "@/hooks/useProjectOperations";

interface EditWorkerDialogProps {
  worker: {
    id: number;
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

  const handleSubmit = async (data: WorkerFormValues) => {
    const success = await updateTeamMember(worker.id.toString(), {
      name: data.name,
      role: data.role,
      phone: data.phone || null,
      rate_per_day: parseFloat(data.ratePerDay),
      type: data.type,
    });

    if (success) {
      onOpenChange(false);
      onWorkerUpdated();
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
          isLoading={loading}
        />
      </DialogContent>
    </Dialog>
  );
}
