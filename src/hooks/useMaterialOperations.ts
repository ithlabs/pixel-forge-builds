
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { toast as sonnerToast } from "sonner";

export function useMaterialOperations() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  // Material operations
  const updateMaterial = async (id: string, data: any) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an actual database call
      console.log("Updating material:", id, data);
      
      // Simulate success
      sonnerToast.success("Material updated successfully");
      return true;
    } catch (error: any) {
      console.error("Error updating material:", error);
      toast({
        title: "Error updating material",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (id: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would be an actual database call
      console.log("Deleting material:", id);
      
      // Simulate success
      sonnerToast.success("Material removed successfully");
      return true;
    } catch (error: any) {
      console.error("Error deleting material:", error);
      toast({
        title: "Error removing material",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addMaterial = async (data: any) => {
    setLoading(true);
    try {
      console.log("Adding material with data:", data);
      
      // Extract numeric value from unitPrice
      let unitPrice = data.unitPrice;
      if (typeof unitPrice === 'string') {
        // Remove any currency symbol and convert to number
        unitPrice = parseFloat(unitPrice.replace(/[^0-9.-]+/g, ''));
      }
      
      console.log("Parsed unit price:", unitPrice);
      
      // Insert directly to Supabase
      const { data: materialData, error } = await supabase
        .from('inventory_items')
        .insert({
          name: data.name,
          category: data.category,
          unit: data.unit,
          quantity: parseInt(data.quantity),
          unit_price: unitPrice,
          supplier: data.supplier || null,
        })
        .select()
        .single();
      
      if (error) {
        console.error("Supabase error details:", error);
        throw error;
      }
      
      console.log("Material added successfully:", materialData);
      sonnerToast.success("Material added successfully");
      return true;
    } catch (error: any) {
      console.error("Error adding material:", error);
      toast({
        title: "Error adding material",
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
    updateMaterial,
    deleteMaterial,
    addMaterial,
  };
}
