import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";

type InventoryItem = Tables<'inventory_items'>;
type MaterialInsert = TablesInsert<'inventory_items'>;
type MaterialUpdate = TablesUpdate<'inventory_items'>;

interface MaterialUpdate {
  name?: string;
  quantity?: number;
  unit?: string;
  unit_price?: number;
  category?: string;
  supplier?: string;
  critical_level?: number;
}

export function useMaterialOperations() {
  const [loading, setLoading] = useState(false);

  const addMaterial = async (newMaterial: MaterialInsert) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .insert([newMaterial])
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Material ${newMaterial.name} added successfully.`,
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateMaterial = async (materialId: string, updates: MaterialUpdate) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .update(updates)
        .eq('id', materialId)
        .select();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: `Material ${updates.name || 'item'} updated successfully.`,
      });
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (materialId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', materialId);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Material deleted successfully.",
      });
      return true;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, addMaterial, updateMaterial, deleteMaterial };
}
