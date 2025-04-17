
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, BarChart, PieChart } from "lucide-react";

interface ReportsCardProps {
  onGenerateReport: (reportType?: string) => void;
}

export function ReportsCard({ onGenerateReport }: ReportsCardProps) {
  const reports = [
    { id: "expense", name: "Monthly Expense Report", icon: FileText, description: "Generate a detailed report of all expenses by month" },
    { id: "pl", name: "Project P&L Statement", icon: BarChart, description: "Profit & loss breakdown for each project" },
    { id: "invoice", name: "Invoice Summary", icon: PieChart, description: "Summary of all invoices by status and date" }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Reports</CardTitle>
        <CardDescription>Generate and download financial reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map(report => (
            <Card key={report.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  <report.icon className="h-4 w-4" />
                  {report.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <Button 
                  variant="outline" 
                  className="mt-4 w-full"
                  onClick={() => onGenerateReport(report.id)}
                >
                  Generate
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
