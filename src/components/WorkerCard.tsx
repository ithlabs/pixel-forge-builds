
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, CreditCard } from "lucide-react";

interface WorkerCardProps {
  id: number;
  name: string;
  role: string;
  phone: string;
  ratePerDay: string;
  projectName?: string;
  type: "daily" | "contract" | "permanent";
}

export const WorkerCard = ({
  id,
  name,
  role,
  phone,
  ratePerDay,
  projectName,
  type,
}: WorkerCardProps) => {
  return (
    <Card>
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-construction-navy text-white flex items-center justify-center font-bold text-lg">
              {name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <div className="ml-3">
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>
          <Badge
            className={
              type === "daily" 
                ? "bg-amber-500" 
                : type === "contract" 
                ? "bg-blue-500" 
                : "bg-green-500"
            }
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        <div className="flex items-center text-sm">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span>{phone}</span>
        </div>
        <div className="flex items-center text-sm">
          <CreditCard className="h-4 w-4 mr-2 text-gray-500" />
          <span>{ratePerDay} per day</span>
        </div>
        {projectName && (
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-gray-500" />
            <span>Assigned to: {projectName}</span>
          </div>
        )}
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" size="sm">Details</Button>
          <Button variant="default" size="sm" className="bg-construction-navy hover:bg-construction-navy/90">
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
