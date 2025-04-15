
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, CreditCard, Building, Calendar, Briefcase } from "lucide-react";

interface WorkerDetailsDialogProps {
  worker: {
    id: number;
    name: string;
    role: string;
    phone: string;
    ratePerDay: string;
    projectName?: string;
    type: "daily" | "contract" | "permanent";
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkerDetailsDialog({ worker, open, onOpenChange }: WorkerDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Worker Details</DialogTitle>
          <DialogDescription>
            Detailed information about {worker.name}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-construction-navy text-white flex items-center justify-center font-bold text-lg">
              {worker.name.split(" ").map(n => n[0]).join("").toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-bold">{worker.name}</h2>
              <p className="text-gray-500">{worker.role}</p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-3 text-gray-500" />
              <span>{worker.phone}</span>
            </div>
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
              <span>{worker.ratePerDay} per day</span>
            </div>
            <div className="flex items-center">
              <Briefcase className="h-5 w-5 mr-3 text-gray-500" />
              <span>Employment: 
                <span className={
                  worker.type === "daily" 
                    ? "text-amber-500 ml-2 font-medium" 
                    : worker.type === "contract" 
                    ? "text-blue-500 ml-2 font-medium" 
                    : "text-green-500 ml-2 font-medium"
                }>
                  {worker.type.charAt(0).toUpperCase() + worker.type.slice(1)}
                </span>
              </span>
            </div>
            {worker.projectName && (
              <div className="flex items-center">
                <Building className="h-5 w-5 mr-3 text-gray-500" />
                <span>Assigned to: {worker.projectName}</span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Recent Activity</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>{new Date().toLocaleDateString()}</TableCell>
                  <TableCell>Profile viewed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>{new Date(Date.now() - 86400000).toLocaleDateString()}</TableCell>
                  <TableCell>Attendance recorded</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
