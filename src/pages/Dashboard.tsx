
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Building2, CircleDollarSign, Clock, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";

const Dashboard = () => {
  // Mock data for the dashboard
  const stats = [
    {
      title: "Active Projects",
      value: 8,
      description: "Total ongoing construction projects",
      icon: Building2,
      trend: "up" as const,
      trendValue: "+2 this month",
    },
    {
      title: "Workers",
      value: 124,
      description: "Total workers across all sites",
      icon: Users,
      trend: "up" as const, 
      trendValue: "+15 this month",
    },
    {
      title: "Low Materials",
      value: 3,
      description: "Materials need restocking",
      icon: ShoppingCart,
      trend: "down" as const,
      trendValue: "-2 from last week",
    },
    {
      title: "Monthly Budget",
      value: "$284,500",
      description: "Total budget for active projects",
      icon: CircleDollarSign,
      trend: "neutral" as const,
      trendValue: "On target",
    },
  ];

  const recentProjects = [
    {
      id: "1", // Changed from number to string
      name: "Addis Heights Apartments",
      location: "Bole, Addis Ababa",
      startDate: "Jan 12, 2025",
      endDate: "Nov 30, 2025",
      budget: "$1.2M",
      status: "ongoing" as const,
      progress: 45,
    },
    {
      id: "2", // Changed from number to string
      name: "Mekelle Office Complex",
      location: "Mekelle, Tigray",
      startDate: "Mar 01, 2025",
      endDate: "Aug 15, 2025",
      budget: "$650K",
      status: "ongoing" as const,
      progress: 28,
    },
    {
      id: "3", // Changed from number to string
      name: "Hawassa Resort",
      location: "Hawassa, SNNPR",
      startDate: "May 15, 2025",
      endDate: "Jun 01, 2026",
      budget: "$3.5M",
      status: "planned" as const,
      progress: 0,
    },
  ];

  const upcomingTasks = [
    { task: "Site inspection at Addis Heights", date: "Today, 2:00 PM", project: "Addis Heights Apartments" },
    { task: "Material delivery for foundation", date: "Tomorrow, 9:00 AM", project: "Mekelle Office Complex" },
    { task: "Worker payroll processing", date: "Apr 10, 2025", project: "All Projects" },
    { task: "Concrete pouring - Building A", date: "Apr 12, 2025", project: "Addis Heights Apartments" },
    { task: "Safety equipment inspection", date: "Apr 15, 2025", project: "All Sites" },
  ];

  return (
    <div>
      <PageHeader 
        title="Dashboard" 
        description="Overview of your construction projects and activities" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            trendValue={stat.trendValue}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardHeader className="border-b">
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {recentProjects.map(project => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="h-full">
            <CardHeader className="border-b">
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ul>
                {upcomingTasks.map((task, index) => (
                  <li 
                    key={index} 
                    className={`p-4 flex flex-col space-y-1 ${index < upcomingTasks.length - 1 ? 'border-b' : ''}`}
                  >
                    <span className="font-medium">{task.task}</span>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{task.project}</span>
                      <span className="text-construction-orange font-medium">{task.date}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
