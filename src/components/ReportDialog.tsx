
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileDown, Loader2 } from "lucide-react";

interface ReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportType?: string;
}

export function ReportDialog({
  open,
  onOpenChange,
  reportType = "expense"
}: ReportDialogProps) {
  const [selectedReportType, setSelectedReportType] = useState(reportType);
  const [startDate, setStartDate] = useState<string>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [loading, setLoading] = useState(false);

  const reportTypes = [
    { id: "expense", name: "Monthly Expense Report" },
    { id: "pl", name: "Project P&L Statement" },
    { id: "invoice", name: "Invoice Summary" },
    { id: "budget", name: "Budget Variance Analysis" },
    { id: "inventory", name: "Inventory Status Report" },
    { id: "workforce", name: "Workforce Allocation Report" }
  ];

  const handleGenerateReport = () => {
    setLoading(true);
    
    // Simulate report generation with a delay
    setTimeout(() => {
      setLoading(false);
      
      // Create a simple mock CSV data for download based on report type
      let csvData = "";
      const filename = `${selectedReportType}-report-${startDate}-to-${endDate}.csv`;
      
      switch (selectedReportType) {
        case "expense":
          csvData = "Date,Project,Category,Amount,Description\n2023-01-15,Addis Heights,Materials,15000,Cement purchases\n2023-01-20,Mekelle Tower,Labor,12500,Contractor payments\n2023-02-05,Hawassa Resort,Equipment,8750,Equipment rental";
          break;
        case "pl":
          csvData = "Project,Revenue,Expenses,Profit\nAddis Heights,450000,325000,125000\nMekelle Tower,380000,295000,85000\nHawassa Resort,520000,390000,130000";
          break;
        case "invoice":
          csvData = "Invoice ID,Client,Amount,Status,Due Date\nINV-001,Addis Development Corp,180000,Paid,2023-02-15\nINV-002,Tigray Business Group,125000,Pending,2023-03-01\nINV-003,Southern Tourism Ltd,95000,Overdue,2023-01-30";
          break;
        default:
          csvData = "Date,Category,Value\n2023-01-15,Category A,15000\n2023-01-20,Category B,12500\n2023-02-05,Category C,8750";
      }
      
      // Create and trigger download
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`${reportTypes.find(r => r.id === selectedReportType)?.name} downloaded successfully`);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Report</DialogTitle>
          <DialogDescription>
            Configure your report parameters
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger>
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {reportTypes.map(report => (
                  <SelectItem key={report.id} value={report.id}>
                    {report.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateReport} 
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileDown className="h-4 w-4 mr-2" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
