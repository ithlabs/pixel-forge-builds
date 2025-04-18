
import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMaterialDialog } from "@/components/AddMaterialDialog";
import { RestockDialog } from "@/components/RestockDialog";
import { HistoryDialog } from "@/components/HistoryDialog";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";
import { MaterialCardProps } from "@/components/MaterialCard";
import { AddMaterialDialogProps } from "@/components/AddMaterialDialog";
import { HistoryDialogProps } from "@/components/HistoryDialog";

interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  unit_price: number;
  initial_quantity?: number;
  category: string;
  supplier?: string;
}

const Inventory: React.FC = () => {
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showRestockDialog, setShowRestockDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  
  const { 
    loading, 
    materials = [], 
    addMaterial, 
    updateMaterial, 
    deleteMaterial 
  } = useMaterialOperations();

  const selectedMaterial = materials.find(
    (material) => material.id === selectedMaterialId
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading materials...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <PageHeader
          title="Inventory Management"
          description="Manage your construction materials inventory"
        />
        <Button 
          className="bg-construction-orange" 
          onClick={() => setShowAddMaterial(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Material
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {materials.map((material) => {
          const lowStock = material.quantity < 10 || material.quantity < (material.initial_quantity ? material.initial_quantity * 0.2 : 10);
          
          const materialCardProps: MaterialCardProps = {
            materialData: material,
            isLowStock: lowStock,
            onRestock: () => {
              setSelectedMaterialId(material.id);
              setShowRestockDialog(true);
            },
            onViewHistory: () => {
              setSelectedMaterialId(material.id);
              setShowHistoryDialog(true);
            }
          };
          
          return (
            <MaterialCard
              key={material.id}
              {...materialCardProps}
            />
          );
        })}
      </div>

      {showAddMaterial && (
        <AddMaterialDialog
          open={true}
          onClose={() => setShowAddMaterial(false)}
          onSubmit={addMaterial}
        />
      )}

      {showRestockDialog && selectedMaterial && (
        <RestockDialog
          open={true}
          onClose={() => setShowRestockDialog(false)}
          materialId={selectedMaterial.id}
          materialName={selectedMaterial.name}
          currentStock={selectedMaterial.quantity}
          unit={selectedMaterial.unit}
          onRestock={(quantity: number) => {
            updateMaterial(selectedMaterial.id, {
              quantity: selectedMaterial.quantity + quantity
            });
            setShowRestockDialog(false);
          }}
        />
      )}

      {showHistoryDialog && selectedMaterial && (
        <HistoryDialog
          open={true}
          materialId={selectedMaterial.id}
          materialName={selectedMaterial.name}
          onClose={() => setShowHistoryDialog(false)}
        />
      )}
    </div>
  );
};

export default Inventory;
