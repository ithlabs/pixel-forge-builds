
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useProjects } from "@/hooks/useProjects";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function TransactionDialog({
  open,
  onOpenChange,
  onSuccess
}: TransactionDialogProps) {
  const [loading, setLoading] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "invoice">("expense");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [projectId, setProjectId] = useState<string>("");
  const [category, setCategory] = useState<string>(transactionType === "expense" ? "Materials" : "");
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const { projects } = useProjects();

  const expenseCategories = ["Materials", "Labor", "Equipment", "Others"];
  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      if (!projectId) {
        toast.error("Please select a project");
        return;
      }
      
      if (amount <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }
      
      // Find the project name for the selected project
      const project = projects.find(p => p.id === projectId);
      const projectName = project?.name || "";
      
      if (transactionType === "expense") {
        // Create a mock expense record
        const mockExpense = {
          id: `exp-${Date.now()}`,
          project_id: projectId,
          project_name: projectName,
          category: category,
          amount: amount,
          date: date,
          description: description,
          created_at: new Date().toISOString()
        };
        
        // Store in localStorage as a mock database
        const existingExpenses = JSON.parse(localStorage.getItem('expenses') || '[]');
        const newExpenses = [mockExpense, ...existingExpenses];
        localStorage.setItem('expenses', JSON.stringify(newExpenses));
        
        toast.success("Expense added successfully");
      } else {
        // Create a mock invoice
        const mockInvoice = {
          id: `inv-${Date.now()}`,
          project_id: projectId,
          project_name: projectName,
          client: project?.client || "Client",
          amount: amount,
          due_date: date,
          status: "pending",
          created_at: new Date().toISOString()
        };
        
        // Store in localStorage as a mock database
        const existingInvoices = JSON.parse(localStorage.getItem('invoices') || '[]');
        const newInvoices = [mockInvoice, ...existingInvoices];
        localStorage.setItem('invoices', JSON.stringify(newInvoices));
        
        toast.success("Invoice added successfully");
      }
      
      onSuccess();
      onOpenChange(false);
      
      // Reset form
      setAmount(0);
      setDescription("");
      setCategory(transactionType === "expense" ? "Materials" : "");
      setDate(new Date().toISOString().split('T')[0]);
    } catch (error) {
      console.error("Error adding transaction:", error);
      toast.error("Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Transaction</DialogTitle>
          <DialogDescription>
            Create a new financial transaction record
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Transaction Type</Label>
            <Select 
              value={transactionType} 
              onValueChange={(value) => {
                setTransactionType(value as "expense" | "invoice");
                if (value === "expense") {
                  setCategory("Materials");
                } else {
                  setCategory("");
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select transaction type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expense">Expense</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Project</Label>
            <Select value={projectId} onValueChange={setProjectId}>
              <SelectTrigger>
                <SelectValue placeholder="Select project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map(project => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {transactionType === "expense" && (
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">{transactionType === "expense" ? "Date" : "Due Date"}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="bg-construction-orange hover:bg-construction-orange/90"
          >
            {loading ? "Processing..." : "Save Transaction"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
