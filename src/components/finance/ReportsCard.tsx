
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ReportsCardProps {
  onGenerateReport: () => void;
}

export function ReportsCard({ onGenerateReport }: ReportsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Reports</CardTitle>
        <CardDescription>Generate and download financial reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Monthly Expense Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Generate a detailed report of all expenses by month</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={onGenerateReport}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Project P&L Statement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Profit & loss breakdown for each project</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={onGenerateReport}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Summary of all invoices by status and date</p>
              <Button 
                variant="outline" 
                className="mt-4 w-full"
                onClick={onGenerateReport}
              >
                Generate
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}
