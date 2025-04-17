
import { useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileSpreadsheet } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ReportDialog } from "@/components/ReportDialog";
import { toast } from "sonner";
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
  const [activeTab, setActiveTab] = useState("project");
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState<string>("expense");

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

  const handleDownloadReport = (reportName: string) => {
    // Generate simple CSV data based on the report
    let csvData = "";
    const filename = `${reportName.toLowerCase().replace(/\s+/g, '-')}.csv`;
    
    if (reportName.includes("Timeline")) {
      csvData = "Task,Start Date,End Date,Status\nFoundation,2023-01-01,2023-01-15,Completed\nFraming,2023-01-16,2023-02-10,Completed\nRoofing,2023-02-11,2023-03-01,In Progress";
    } else if (reportName.includes("Budget")) {
      csvData = "Category,Budgeted,Actual,Variance\nMaterials,150000,145000,5000\nLabor,200000,215000,-15000\nEquipment,75000,72000,3000";
    } else {
      csvData = "Date,Item,Value\n2023-01-15,Item A,12500\n2023-01-20,Item B,8750\n2023-02-05,Item C,15000";
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
    
    toast.success(`${reportName} downloaded successfully`);
  };

  const handleExportAll = () => {
    // Create a zip file simulation with a small delay
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 1500)),
      {
        loading: "Preparing export...",
        success: "All reports exported successfully",
        error: "Failed to export reports"
      }
    );
  };

  const handleGenerateCustomReport = (reportType?: string) => {
    if (reportType) {
      setSelectedReportType(reportType);
    }
    setIsReportDialogOpen(true);
  };

  // Define report categories and their reports
  const reportCategories = {
    project: [
      "Project Timeline Report",
      "Milestone Status Report",
      "Project Budget vs Actual",
      "Contractor Performance Report",
      "Project Risk Assessment",
      "Site Inspection Report"
    ],
    financial: [
      "Monthly Expense Summary",
      "Project Cost Analysis",
      "Cash Flow Statement",
      "Profit & Loss Report",
      "Budget Variance Analysis",
      "Payroll Summary Report",
      "Invoice Status Report",
      "Vendor Payment History",
      "Tax Documentation"
    ],
    inventory: [
      "Current Stock Summary",
      "Material Usage by Project",
      "Low Stock Alert Report",
      "Material Cost Analysis",
      "Procurement History",
      "Supplier Performance Report"
    ],
    workforce: [
      "Employee Directory",
      "Attendance & Time Tracking",
      "Worker Assignment by Project",
      "Labor Cost Analysis",
      "Contractor Performance Report",
      "Skill & Certification Report"
    ]
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title="Reports & Dashboard" 
          description="Generate and view reports for your construction projects"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline" onClick={handleExportAll}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          <Button onClick={() => handleGenerateCustomReport()}>
            Generate Custom Report
          </Button>
        </div>
      </div>

      <Tabs 
        defaultValue="project" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
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
                {reportCategories.project.map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto"
                          onClick={() => handleDownloadReport(report)}
                        >
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
                {reportCategories.financial.map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto"
                          onClick={() => handleDownloadReport(report)}
                        >
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
                {reportCategories.inventory.map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto"
                          onClick={() => handleDownloadReport(report)}
                        >
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
                {reportCategories.workforce.map((report, index) => (
                  <Card key={index} className="bg-muted/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <FileSpreadsheet className="h-5 w-5 mr-2 text-construction-navy" />
                          <span className="font-medium">{report}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 h-auto"
                          onClick={() => handleDownloadReport(report)}
                        >
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

      <ReportDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        reportType={selectedReportType}
      />
    </div>
  );
};

export default Reports;
