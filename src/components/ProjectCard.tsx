
import { Building, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: string;
  status: "ongoing" | "completed" | "planned" | "on_hold";
  progress: number;
}

export const ProjectCard = ({
  id,
  name,
  location,
  startDate,
  endDate,
  budget,
  status,
  progress,
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/20 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Building className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          </div>
          <Badge
            className={
              status === "ongoing" 
                ? "bg-blue-500" 
                : status === "completed" 
                ? "bg-green-500" 
                : status === "on_hold"
                ? "bg-amber-500"
                : "bg-amber-500"
            }
          >
            {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-500">Timeline</span>
          </div>
          <span className="font-medium">
            {startDate} - {endDate}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Budget</span>
          <span className="font-medium">{budget}</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="border-t p-3 flex justify-end gap-2 bg-muted/20">
        <Button variant="outline" size="sm">Details</Button>
        <Button variant="default" size="sm" className="bg-construction-navy hover:bg-construction-navy/90">
          Manage
        </Button>
      </CardFooter>
    </Card>
  );
}
