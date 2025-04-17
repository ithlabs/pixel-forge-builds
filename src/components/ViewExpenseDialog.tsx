
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface ViewExpenseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: {
    id: string;
    project_id: string;
    project_name: string;
    category: string;
    amount: number;
    date: string;
    description: string;
    created_at: string;
  } | null;
}

export function ViewExpenseDialog({
  open,
  onOpenChange,
  expense
}: ViewExpenseDialogProps) {
  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
          <DialogDescription>
            View detailed information about this expense
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Project</Label>
              <p className="font-medium">{expense.project_name}</p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Category</Label>
              <p className="font-medium">{expense.category}</p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Amount</Label>
              <p className="font-medium text-lg">{formatCurrency(expense.amount)}</p>
            </div>
            
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground">Date</Label>
              <p className="font-medium">{formatDate(expense.date)}</p>
            </div>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <p className="font-medium">{expense.description || "No description provided"}</p>
          </div>
          
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Created</Label>
            <p className="text-sm text-muted-foreground">{formatDate(expense.created_at)}</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
