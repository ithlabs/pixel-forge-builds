
import React, { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AddMaterialDialog } from "@/components/AddMaterialDialog";
import { RestockDialog } from "@/components/RestockDialog";
import { HistoryDialog } from "@/components/HistoryDialog";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";

const Inventory: React.FC = () => {
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [showRestockDialog, setShowRestockDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  
  const { 
    loading, 
    materials, 
    addMaterial, 
    updateMaterial, 
    deleteMaterial 
  } = useMaterialOperations();

  const selectedMaterial = materials?.find(
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
        {materials && materials.map((material) => {
          const lowStock = material.quantity < 10 || material.quantity < (material.initial_quantity * 0.2);
          
          return (
            <MaterialCard
              key={material.id}
              material={material}
              isLowStock={lowStock}
              onRestock={() => {
                setSelectedMaterialId(material.id);
                setShowRestockDialog(true);
              }}
              onViewHistory={() => {
                setSelectedMaterialId(material.id);
                setShowHistoryDialog(true);
              }}
            />
          );
        })}
      </div>

      {showAddMaterial && (
        <AddMaterialDialog
          open={showAddMaterial}
          onClose={() => setShowAddMaterial(false)}
          onSubmit={addMaterial}
        />
      )}

      {showRestockDialog && selectedMaterial && (
        <RestockDialog
          open={showRestockDialog}
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
          open={showHistoryDialog}
          onClose={() => setShowHistoryDialog(false)}
          materialId={selectedMaterial.id}
          materialName={selectedMaterial.name}
        />
      )}
    </div>
  );
};

export default Inventory;
