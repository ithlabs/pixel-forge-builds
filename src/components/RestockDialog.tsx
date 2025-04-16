
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";

interface RestockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materialId: number | string;
  materialName: string;
  currentStock: number;
  unit: string;
  onRestock: () => void;
}

export function RestockDialog({
  open,
  onOpenChange,
  materialId,
  materialName,
  currentStock,
  unit,
  onRestock
}: RestockDialogProps) {
  const [quantity, setQuantity] = useState(0);
  const { updateMaterial, loading } = useMaterialOperations();

  const handleRestock = async () => {
    if (quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    try {
      const newQuantity = currentStock + Number(quantity);
      const success = await updateMaterial(materialId.toString(), { 
        quantity: newQuantity 
      });
      
      if (success) {
        toast.success(`Successfully restocked ${materialName}`);
        onOpenChange(false);
        onRestock();
      }
    } catch (error) {
      console.error("Error restocking material:", error);
      toast.error("Failed to restock material");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Restock {materialName}</DialogTitle>
          <DialogDescription>
            Add more units to the current inventory
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Current Stock</Label>
            <div className="px-3 py-2 bg-muted rounded-md">
              {currentStock} {unit}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity to Add</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label>New Total</Label>
            <div className="px-3 py-2 bg-muted rounded-md">
              {currentStock + Number(quantity)} {unit}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleRestock} 
            disabled={loading || quantity <= 0}
          >
            {loading ? "Processing..." : "Confirm Restock"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
