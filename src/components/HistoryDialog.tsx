
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDate } from "@/lib/formatters";

interface HistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  materialId: number | string;
  materialName: string;
}

export function HistoryDialog({
  open,
  onOpenChange,
  materialId,
  materialName
}: HistoryDialogProps) {
  // Mock history data - in a real app, you would fetch this from your backend
  const historyItems = [
    { 
      id: 1, 
      date: new Date().toISOString(), 
      action: "Restock", 
      quantity: 50, 
      user: "Admin" 
    },
    { 
      id: 2, 
      date: new Date(Date.now() - 86400000).toISOString(), 
      action: "Allocated to Project", 
      quantity: -20, 
      project: "Downtown Skyscraper", 
      user: "Admin" 
    },
    { 
      id: 3, 
      date: new Date(Date.now() - 86400000 * 2).toISOString(), 
      action: "Initial Stock", 
      quantity: 100, 
      user: "System" 
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Material History: {materialName}</DialogTitle>
          <DialogDescription>
            View all inventory changes for this material
          </DialogDescription>
        </DialogHeader>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity Change</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{formatDate(item.date)}</TableCell>
                  <TableCell>{item.action}</TableCell>
                  <TableCell className={item.quantity >= 0 ? "text-green-600" : "text-red-600"}>
                    {item.quantity >= 0 ? `+${item.quantity}` : item.quantity}
                  </TableCell>
                  <TableCell>{item.project || "-"}</TableCell>
                  <TableCell>{item.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}
