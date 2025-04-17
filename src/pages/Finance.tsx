
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, Eye, FileText, Plus, Loader2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useFinance } from "@/hooks/useFinance";
import { formatCurrency, formatDate, formatStatusColor } from "@/lib/formatters";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionDialog } from "@/components/TransactionDialog";
import { ReportDialog } from "@/components/ReportDialog";
import { ViewExpenseDialog } from "@/components/ViewExpenseDialog";

const Finance = () => {
  const { expenses, invoices, expensesData, expensesByCategory, loading, refreshData } = useFinance();
  const [isTransactionDialogOpen, setIsTransactionDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<typeof expenses[0] | null>(null);
  const [isViewExpenseDialogOpen, setIsViewExpenseDialogOpen] = useState(false);

  // Render loading skeletons if data is still loading
  if (loading) {
    return (
      <div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="mb-4 md:mb-0">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex space-x-3">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1 md:col-span-2">
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-60" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-20" />
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Array(5).fill(0).map((_, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border-b">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <Skeleton className="h-9 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Expenses Overview</CardTitle>
                <CardDescription>Monthly expenses breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={expensesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [formatCurrency(value as number), ""]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Bar dataKey="materials" name="Materials" fill="#1a365d" />
                      <Bar dataKey="labor" name="Labor" fill="#ed8936" />
                      <Bar dataKey="equipment" name="Equipment" fill="#ecc94b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expenses by Category</CardTitle>
                <CardDescription>Year to date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3">Project</th>
                      <th className="text-left p-3">Category</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Date</th>
                      <th className="text-left p-3">Description</th>
                      <th className="text-left p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.slice(0, 5).map((expense, index) => (
                      <tr 
                        key={expense.id}
                        className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                      >
                        <td className="p-3">{expense.project_name}</td>
                        <td className="p-3">{expense.category}</td>
                        <td className="p-3 font-medium">{formatCurrency(expense.amount)}</td>
                        <td className="p-3">{formatDate(expense.date)}</td>
                        <td className="p-3">{expense.description}</td>
                        <td className="p-3 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleViewExpense(expense)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="text-left p-3">Project</th>
                      <th className="text-left p-3">Client</th>
                      <th className="text-left p-3">Amount</th>
                      <th className="text-left p-3">Due Date</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice, index) => (
                      <tr 
                        key={invoice.id}
                        className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                      >
                        <td className="p-3">{invoice.project_name}</td>
                        <td className="p-3">{invoice.client}</td>
                        <td className="p-3 font-medium">{formatCurrency(invoice.amount)}</td>
                        <td className="p-3">{formatDate(invoice.due_date)}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            formatStatusColor(invoice.status)
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payments</CardTitle>
              <CardDescription>Manage payment records and transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border rounded-md bg-muted/20">
                <div className="text-center">
                  <CircleDollarSign className="mx-auto h-10 w-10 text-muted-foreground" />
                  <h3 className="mt-2 font-medium">No payment records yet</h3>
                  <p className="text-sm text-muted-foreground">Add a payment record to get started</p>
                  <Button 
                    className="mt-4"
                    onClick={() => setIsTransactionDialogOpen(true)}
                  >
                    Add Payment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
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
                      onClick={() => setIsReportDialogOpen(true)}
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
                      onClick={() => setIsReportDialogOpen(true)}
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
                      onClick={() => setIsReportDialogOpen(true)}
                    >
                      Generate
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
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
