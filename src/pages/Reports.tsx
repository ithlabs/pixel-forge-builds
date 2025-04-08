
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Reports = () => {
  // Mock data for project progress
  const projectProgressData = [
    { month: "Jan", planned: 10, actual: 8 },
    { month: "Feb", planned: 20, actual: 18 },
    { month: "Mar", planned: 35, actual: 30 },
    { month: "Apr", planned: 50, actual: 45 },
    { month: "May", planned: 65, actual: 60 },
    { month: "Jun", planned: 80, actual: 75 },
    { month: "Jul", planned: 95, actual: 85 },
    { month: "Aug", planned: 100, actual: 90 },
  ];

  // Mock data for material usage
  const materialUsageData = [
    { month: "Jan", cement: 120, steel: 45, timber: 60 },
    { month: "Feb", cement: 132, steel: 54, timber: 42 },
    { month: "Mar", cement: 145, steel: 65, timber: 53 },
    { month: "Apr", cement: 150, steel: 75, timber: 58 },
    { month: "May", cement: 165, steel: 70, timber: 65 },
    { month: "Jun", cement: 180, steel: 85, timber: 70 },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Reports & Dashboard" 
          description="Generate and view reports for your construction projects"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="project" className="space-y-4">
        <TabsList>
          <TabsTrigger value="project">Project Reports</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
          <TabsTrigger value="workforce">Workforce Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="project" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectProgressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, ""]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Legend />
                      <Line type="monotone" dataKey="planned" stroke="#1a365d" strokeWidth={2} name="Planned %" />
                      <Line type="monotone" dataKey="actual" stroke="#ed8936" strokeWidth={2} name="Actual %" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Material Usage by Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={materialUsageData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} units`, ""]} />
                      <Legend />
                      <Bar dataKey="cement" name="Cement" fill="#1a365d" />
                      <Bar dataKey="steel" name="Steel" fill="#ed8936" />
                      <Bar dataKey="timber" name="Timber" fill="#ecc94b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Project Timeline Report",
                  "Milestone Status Report",
                  "Project Budget vs Actual",
                  "Contractor Performance Report",
                  "Project Risk Assessment",
                  "Site Inspection Report"
                ].map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Monthly Expense Summary",
                  "Project Cost Analysis",
                  "Cash Flow Statement",
                  "Profit & Loss Report",
                  "Budget Variance Analysis",
                  "Payroll Summary Report",
                  "Invoice Status Report",
                  "Vendor Payment History",
                  "Tax Documentation"
                ].map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Current Stock Summary",
                  "Material Usage by Project",
                  "Low Stock Alert Report",
                  "Material Cost Analysis",
                  "Procurement History",
                  "Supplier Performance Report"
                ].map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="workforce">
          <Card>
            <CardHeader>
              <CardTitle>Workforce Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  "Employee Directory",
                  "Attendance & Time Tracking",
                  "Worker Assignment by Project",
                  "Labor Cost Analysis",
                  "Contractor Performance Report",
                  "Skill & Certification Report"
                ].map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="p-0 h-auto">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
