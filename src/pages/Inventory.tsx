
import { PageHeader } from "@/components/PageHeader";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { AddMaterialDialog } from "@/components/AddMaterialDialog";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const Inventory = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      // Transform the data to include criticalLevel (mimicking the mock data)
      const transformedData = data.map(item => ({
        ...item,
        id: item.id,
        name: item.name,
        unit: item.unit,
        currentStock: item.quantity,
        criticalLevel: Math.floor(item.quantity * 0.3), // Setting critical level to 30% of current for demo
        unitPrice: item.unit_price
      }));
      
      setMaterials(transformedData);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleMaterialAdded = () => {
    fetchMaterials();
  };

  const filteredMaterials = materials.filter(material => 
    material.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Inventory & Procurement" 
          description="Manage materials, supplies, and procurement"
          className="mb-4 md:mb-0"
        />
        <AddMaterialDialog onMaterialAdded={handleMaterialAdded} />
      </div>
      
      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search materials..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="whitespace-nowrap">
              Filter
            </Button>
            <Button variant="outline" className="whitespace-nowrap">
              Sort
            </Button>
          </div>
        </div>
      </Card>
      
      {loading ? (
        <div className="text-center py-8">Loading materials...</div>
      ) : materials.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No materials found. Add your first material to get started.</p>
          <AddMaterialDialog onMaterialAdded={handleMaterialAdded} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMaterials.map(material => (
            <MaterialCard key={material.id} {...material} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
