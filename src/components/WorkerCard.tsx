import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, CreditCard, Trash2, Edit } from "lucide-react";
import { EditWorkerDialog } from "./EditWorkerDialog";
import { WorkerDetailsDialog } from "./WorkerDetailsDialog";
import { useProjectOperations } from "@/hooks/useProjectOperations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface WorkerCardProps {
  id: string;
  name: string;
  role: string;
  phone: string;
  ratePerDay: string;
  projectName?: string;
  type: "daily" | "contract" | "permanent";
  onWorkerUpdated: () => void;
}

export const WorkerCard = ({
  id,
  name,
  role,
  phone,
  ratePerDay,
  projectName,
  type,
  onWorkerUpdated
}: WorkerCardProps) => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  const { deleteTeamMember, loading } = useProjectOperations();

  const handleDelete = async () => {
    const success = await deleteTeamMember(id);
    if (success) {
      setDeleteDialogOpen(false);
      onWorkerUpdated();
    }
  };

  return (
    <>
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
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setDetailsDialogOpen(true)}
            >
              Details
            </Button>
            <div className="flex gap-1">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 hover:text-blue-700" 
                onClick={() => setEditDialogOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 hover:text-red-700"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <WorkerDetailsDialog
        worker={{ id, name, role, phone, ratePerDay, projectName, type }}
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
      />

      <EditWorkerDialog
        worker={{ id, name, role, phone, ratePerDay, projectName, type }}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onWorkerUpdated={onWorkerUpdated}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {name} from your workforce. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
