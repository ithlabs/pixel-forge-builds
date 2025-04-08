
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, FileText, Plus } from "lucide-react";
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

const Finance = () => {
  // Mock data for expenses chart
  const expensesData = [
    { month: "Jan", materials: 35000, labor: 25000, equipment: 15000 },
    { month: "Feb", materials: 42000, labor: 28000, equipment: 12000 },
    { month: "Mar", materials: 38000, labor: 30000, equipment: 18000 },
    { month: "Apr", materials: 45000, labor: 32000, equipment: 20000 },
    { month: "May", materials: 50000, labor: 35000, equipment: 22000 },
    { month: "Jun", materials: 48000, labor: 33000, equipment: 19000 },
  ];

  // Mock data for expenses by category
  const expensesByCategory = [
    { name: "Materials", value: 258000, color: "#1a365d" },
    { name: "Labor", value: 183000, color: "#ed8936" },
    { name: "Equipment", value: 106000, color: "#ecc94b" },
    { name: "Others", value: 42000, color: "#4a5568" },
  ];

  // Mock data for recent expenses
  const recentExpenses = [
    { id: 1, project: "Addis Heights Apartments", category: "Materials", amount: 15000, date: "Apr 05, 2025", description: "Cement purchase" },
    { id: 2, project: "Mekelle Office Complex", category: "Labor", amount: 8500, date: "Apr 04, 2025", description: "Weekly labor payment" },
    { id: 3, project: "Dire Dawa Bridge", category: "Equipment", amount: 12000, date: "Apr 03, 2025", description: "Excavator rental" },
    { id: 4, project: "Addis Heights Apartments", category: "Materials", amount: 6500, date: "Apr 02, 2025", description: "Steel reinforcement" },
    { id: 5, project: "Mekelle Office Complex", category: "Others", amount: 3200, date: "Apr 01, 2025", description: "Site security expenses" },
  ];

  // Mock data for invoices
  const invoices = [
    { id: 1, project: "Addis Heights Apartments", client: "Addis Development Corp", amount: 250000, dueDate: "Apr 15, 2025", status: "pending" },
    { id: 2, project: "Mekelle Office Complex", client: "Tigray Business Group", amount: 180000, dueDate: "Apr 20, 2025", status: "pending" },
    { id: 3, project: "Bahir Dar Community Center", client: "Amhara Region Council", amount: 120000, dueDate: "Apr 10, 2025", status: "paid" },
    { id: 4, project: "Dire Dawa Bridge", client: "Ethiopian Roads Authority", amount: 350000, dueDate: "Apr 30, 2025", status: "pending" },
    { id: 5, project: "Hawassa Resort", client: "Southern Tourism Ltd", amount: 280000, dueDate: "Apr 25, 2025", status: "overdue" },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Finance & Accounting" 
          description="Manage your financial records and accounting"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button className="bg-construction-orange hover:bg-construction-orange/90">
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
                        formatter={(value) => [`$${value}`, ""]}
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
                      <Tooltip formatter={(value) => `$${value}`} />
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
                    {recentExpenses.map((expense, index) => (
                      <tr 
                        key={expense.id}
                        className={`border-t ${index % 2 === 0 ? 'bg-white' : 'bg-muted/20'}`}
                      >
                        <td className="p-3">{expense.project}</td>
                        <td className="p-3">{expense.category}</td>
                        <td className="p-3 font-medium">${expense.amount.toLocaleString()}</td>
                        <td className="p-3">{expense.date}</td>
                        <td className="p-3">{expense.description}</td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View</Button>
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
                        <td className="p-3">{invoice.project}</td>
                        <td className="p-3">{invoice.client}</td>
                        <td className="p-3 font-medium">${invoice.amount.toLocaleString()}</td>
                        <td className="p-3">{invoice.dueDate}</td>
                        <td className="p-3">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                            invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                            invoice.status === 'overdue' ? 'bg-red-100 text-red-800' : 
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm">View</Button>
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
                  <Button className="mt-4">Add Payment</Button>
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
                    <Button variant="outline" className="mt-4 w-full">Generate</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Project P&L Statement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Profit & loss breakdown for each project</p>
                    <Button variant="outline" className="mt-4 w-full">Generate</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Invoice Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">Summary of all invoices by status and date</p>
                    <Button variant="outline" className="mt-4 w-full">Generate</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finance;
