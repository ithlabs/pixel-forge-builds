
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MaterialForm } from "@/components/MaterialForm";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";
import { toast } from "sonner";

interface AddMaterialDialogProps {
  onMaterialAdded: () => void;
}

export function AddMaterialDialog({ onMaterialAdded }: AddMaterialDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { addMaterial, loading } = useMaterialOperations();

  const handleSubmit = async (data: any) => {
    try {
      console.log("Submitting material form with data:", data);
      
      // Validate price before submitting
      if (isNaN(parseFloat(data.unitPrice.replace(/[^0-9.-]+/g, '')))) {
        toast.error("Please enter a valid price");
        return false;
      }
      
      const success = await addMaterial(data);
      if (success) {
        setOpen(false);
        onMaterialAdded();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error in AddMaterialDialog:", error);
      toast.error("Failed to add material. Please try again.");
      return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-construction-orange hover:bg-construction-orange/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>
            Enter the material details below to add it to your inventory.
          </DialogDescription>
        </DialogHeader>
        <MaterialForm onSubmit={handleSubmit} isLoading={loading} />
      </DialogContent>
    </Dialog>
  );
}
