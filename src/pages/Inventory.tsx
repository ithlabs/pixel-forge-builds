
import { PageHeader } from "@/components/PageHeader";
import { MaterialCard } from "@/components/MaterialCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";

const Inventory = () => {
  // Mock data for materials
  const materials = [
    {
      id: 1,
      name: "Cement",
      unit: "Bags",
      currentStock: 150,
      criticalLevel: 50,
    },
    {
      id: 2,
      name: "Sand",
      unit: "Cubic Meters",
      currentStock: 35,
      criticalLevel: 20,
    },
    {
      id: 3,
      name: "Gravel",
      unit: "Cubic Meters",
      currentStock: 45,
      criticalLevel: 15,
    },
    {
      id: 4,
      name: "Reinforcement Bars",
      unit: "Tons",
      currentStock: 8,
      criticalLevel: 5,
    },
    {
      id: 5,
      name: "Bricks",
      unit: "Pieces",
      currentStock: 5000,
      criticalLevel: 1000,
    },
    {
      id: 6,
      name: "Paint",
      unit: "Gallons",
      currentStock: 25,
      criticalLevel: 30,
    },
    {
      id: 7,
      name: "Electrical Wire",
      unit: "Rolls",
      currentStock: 10,
      criticalLevel: 15,
    },
    {
      id: 8,
      name: "PVC Pipes",
      unit: "Pieces",
      currentStock: 120,
      criticalLevel: 50,
    },
    {
      id: 9,
      name: "Timber",
      unit: "Cubic Meters",
      currentStock: 12,
      criticalLevel: 15,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Inventory & Procurement" 
          description="Manage materials, supplies, and procurement"
          className="mb-4 md:mb-0"
        />
        <Button className="bg-construction-orange hover:bg-construction-orange/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Material
        </Button>
      </div>
      
      <Card className="mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search materials..." 
              className="pl-10"
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {materials.map(material => (
          <MaterialCard key={material.id} {...material} />
        ))}
      </div>
    </div>
  );
};

export default Inventory;
