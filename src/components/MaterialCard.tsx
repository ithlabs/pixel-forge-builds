
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CircleAlert, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MaterialCardProps {
  id: number;
  name: string;
  unit: string;
  currentStock: number;
  criticalLevel: number;
}

export const MaterialCard = ({
  id,
  name,
  unit,
  currentStock,
  criticalLevel,
}: MaterialCardProps) => {
  const isLow = currentStock <= criticalLevel;

  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className={`h-10 w-10 rounded-full ${isLow ? 'bg-red-100' : 'bg-green-100'} flex items-center justify-center`}>
              <Package className={`h-5 w-5 ${isLow ? 'text-red-700' : 'text-green-700'}`} />
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">{unit}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">Current Stock:</span>
          <span className="font-medium">{currentStock} {unit}</span>
        </div>
        
        {isLow && (
          <div className="bg-red-50 p-2 rounded-md flex items-center text-sm text-red-700 mb-3">
            <CircleAlert className="h-4 w-4 mr-1" />
            <span>Low stock alert</span>
          </div>
        )}
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm">History</Button>
          <Button variant="default" size="sm" className="bg-construction-navy hover:bg-construction-navy/90">
            Restock
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
