
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";
import { AddMaterialDialog } from "@/components/AddMaterialDialog";
import { RestockDialog } from "@/components/RestockDialog";
import { HistoryDialog } from "@/components/HistoryDialog";
import { Tables } from "@/integrations/supabase/types";

const Inventory = () => {
  const materialOps = useMaterialOperations();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Tables['inventory_items'] | null>(null);
  const [isRestockDialogOpen, setIsRestockDialogOpen] = useState(false);
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);

  const filteredMaterials = materialOps.materials.filter((material) =>
    material.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRestock = (material: Tables['inventory_items']) => {
    setSelectedMaterial(material);
    setIsRestockDialogOpen(true);
  };

  const handleViewHistory = (material: Tables['inventory_items']) => {
    setSelectedMaterial(material);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Inventory Management" 
          description="Track and manage construction materials"
          className="mb-4 md:mb-0"
        />
        <div className="flex w-full md:w-auto space-x-3">
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[220px]"
          />
          <Button 
            className="bg-construction-orange hover:bg-construction-orange/90 whitespace-nowrap"
            onClick={() => setIsAddDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Material
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {materialOps.loading ? (
          // Placeholders for loading state
          Array(8).fill(0).map((_, index) => (
            <div 
              key={index}
              className="h-[320px] rounded-lg border border-border bg-card animate-pulse"
            />
          ))
        ) : filteredMaterials.length === 0 ? (
          <div className="col-span-full p-8 text-center">
            <h3 className="text-xl font-medium">No materials found</h3>
            <p className="text-muted-foreground mt-1">Try adjusting your search or add new materials.</p>
          </div>
        ) : (
          filteredMaterials.map((material) => (
            <MaterialCard 
              key={material.id} 
              material={material} 
              onRestock={() => handleRestock(material)}
              onViewHistory={() => handleViewHistory(material)}
              isLowStock={material.quantity <= 10} // Set a default low stock threshold
            />
          ))
        )}
      </div>

      <AddMaterialDialog 
        open={isAddDialogOpen} 
        onOpenChange={setIsAddDialogOpen}
        onAddMaterial={materialOps.addMaterial}
      />

      {selectedMaterial && (
        <RestockDialog
          open={isRestockDialogOpen}
          onOpenChange={setIsRestockDialogOpen}
          materialId={selectedMaterial.id}
        />
      )}

      {selectedMaterial && (
        <HistoryDialog
          open={isHistoryDialogOpen}
          onOpenChange={setIsHistoryDialogOpen}
          materialId={selectedMaterial.id}
        />
      )}
    </div>
  );
};

export default Inventory;
