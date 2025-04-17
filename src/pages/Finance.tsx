
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { useFinance } from "@/hooks/useFinance";
import { TransactionDialog } from "@/components/TransactionDialog";
import { ReportDialog } from "@/components/ReportDialog";
import { ViewExpenseDialog } from "@/components/ViewExpenseDialog";
import { ExpensesCharts } from "@/components/finance/ExpensesCharts";
import { ExpensesTable } from "@/components/finance/ExpensesTable";
import { InvoicesTable } from "@/components/finance/InvoicesTable";
import { PaymentsCard } from "@/components/finance/PaymentsCard";
import { ReportsCard } from "@/components/finance/ReportsCard";
import { FinanceLoadingSkeleton } from "@/components/finance/FinanceLoadingSkeleton";

const Finance = () => {
  const { expenses, invoices, expensesData, expensesByCategory, loading, refreshData } = useFinance();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<typeof expenses[0] | null>(null);
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);

  // Render loading skeletons if data is still loading
  if (loading) {
    return <FinanceLoadingSkeleton />;
  }

  const handleViewExpense = (expense: typeof expenses[0]) => {
    setSelectedExpense(expense);
    setIsViewExpenseDialogOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Finance & Accounting" 
          description="Manage your financial records and accounting"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={() => setIsReportDialogOpen(true)}
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button 
            className="bg-construction-orange hover:bg-construction-orange/90"
            onClick={() => setIsTransactionDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="expenses" className="space-y-4">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="expenses" className="space-y-4">
          <ExpensesCharts 
            expensesData={expensesData} 
            expensesByCategory={expensesByCategory} 
          />
          <ExpensesTable 
            expenses={expenses} 
            onViewExpense={handleViewExpense} 
          />
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <InvoicesTable invoices={invoices} />
        </TabsContent>
        
        <TabsContent value="payments">
          <PaymentsCard onAddPayment={() => setIsTransactionDialogOpen(true)} />
        </TabsContent>
        
        <TabsContent value="reports">
          <ReportsCard onGenerateReport={() => setIsReportDialogOpen(true)} />
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      <TransactionDialog 
        open={isTransactionDialogOpen} 
        onOpenChange={setIsTransactionDialogOpen}
        onSuccess={refreshData}
      />
      
      <ReportDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
      />
      
      <ViewExpenseDialog
        open={isViewExpenseDialogOpen}
        onOpenChange={setIsViewExpenseDialogOpen}
        expense={selectedExpense}
      />
    </div>
  );
};

export default Finance;
