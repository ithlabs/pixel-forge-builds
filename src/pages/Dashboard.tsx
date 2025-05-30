
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Building2, CircleDollarSign, ShoppingCart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects } from "@/hooks/useProjects";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency, mapProjectStatusToCardStatus } from "@/lib/formatters";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { projects, loading, refetch: refetchProjects } = useProjects();
  const [workers, setWorkers] = useState<any[]>([]);
  const [lowMaterials, setLowMaterials] = useState<number>(0);
  const [workersLoading, setWorkersLoading] = useState(true);
  const [materialsLoading, setMaterialsLoading] = useState(true);
  const [upcomingTasks, setUpcomingTasks] = useState([
    { task: "Site inspection at Addis Heights", date: "Today, 2:00 PM", project: "Addis Heights Apartments" },
    { task: "Material delivery for foundation", date: "Tomorrow, 9:00 AM", project: "Mekelle Office Complex" },
    { task: "Worker payroll processing", date: "Apr 10, 2025", project: "All Projects" },
    { task: "Concrete pouring - Building A", date: "Apr 12, 2025", project: "Addis Heights Apartments" },
    { task: "Safety equipment inspection", date: "Apr 15, 2025", project: "All Sites" },
  ]);

  // Fetch workers data
  const fetchWorkers = async () => {
    try {
      setWorkersLoading(true);
      const { data, error } = await supabase
        .from('workers')
        .select('*');
        
      if (error) {
        throw error;
      }
      
      setWorkers(data || []);
      console.log("Workers fetched:", data);
    } catch (err) {
      console.error("Error fetching workers:", err);
      setWorkers([]);
    } finally {
      setWorkersLoading(false);
    }
  };

  // Fetch low materials data
  const fetchLowMaterials = async () => {
    try {
      setMaterialsLoading(true);
      const { data, error } = await supabase
        .from('inventory_items')
        .select('*')
        .lt('quantity', 10);
        
      if (error) {
        throw error;
      }
      
      setLowMaterials(data?.length || 0);
    } catch (err) {
      console.error("Error fetching low materials:", err);
      setLowMaterials(0);
    } finally {
      setMaterialsLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
    fetchLowMaterials();
    
    // Set up Supabase realtime subscriptions
    const workersSubscription = supabase
      .channel('workers-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'workers' 
      }, () => {
        console.log('Workers table changed, refreshing data...');
        fetchWorkers();
      })
      .subscribe();
      
    const materialsSubscription = supabase
      .channel('materials-changes')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'inventory_items' 
      }, () => {
        console.log('Inventory items changed, refreshing data...');
        fetchLowMaterials();
      })
      .subscribe();

    // Clean up subscriptions
    return () => {
      supabase.removeChannel(workersSubscription);
      supabase.removeChannel(materialsSubscription);
    };
  }, []);
  
  // Calculate statistics based on real data
  const stats = [
    {
      title: "Active Projects",
      value: projects.filter(p => p.status === "in_progress").length,
      description: "Total ongoing construction projects",
      icon: Building2,
      trend: "up" as const,
      trendValue: "+2 this month",
    },
    {
      title: "Workers",
      value: workersLoading ? "..." : workers.length,
      description: "Total workers across all sites",
      icon: Users,
      trend: "up" as const, 
      trendValue: "+15 this month",
    },
    {
      title: "Low Materials",
      value: materialsLoading ? "..." : lowMaterials,
      description: "Materials need restocking",
      icon: ShoppingCart,
      trend: "down" as const,
      trendValue: "-2 from last week",
    },
    {
      title: "Monthly Budget",
      value: formatCurrency(projects
        .filter(p => p.status === "in_progress" && p.budget)
        .reduce((sum, project) => sum + (project.budget || 0), 0)),
      description: "Total budget for active projects",
      icon: CircleDollarSign,
      trend: "neutral" as const,
      trendValue: "On target",
    },
  ];

  // Show skeletons while loading
  if (loading || workersLoading || materialsLoading) {
    return (
      <div>
        <PageHeader 
          title="Dashboard" 
          description="Overview of your construction projects and activities" 
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
            </Card>
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
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="space-y-3">
                        <Skeleton className="h-5 w-[200px]" />
                        <Skeleton className="h-4 w-[150px]" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[60px]" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    </Card>
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
                <ul className="space-y-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i} className="p-4 border-b">
                      <div className="space-y-2">
                        <Skeleton className="h-5 w-[200px]" />
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-[100px]" />
                          <Skeleton className="h-4 w-[80px]" />
                        </div>
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
  }

  // Format projects for display
  const activeProjects = projects
    .filter(project => project.status === "in_progress")
    .slice(0, 3)
    .map(project => ({
      id: project.id, 
      name: project.name,
      location: project.location || "Unknown",
      startDate: project.start_date ? new Date(project.start_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : "Not set",
      endDate: project.end_date ? new Date(project.end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) : "Not set",
      budget: project.budget ? formatCurrency(project.budget) : "Not set",
      status: mapProjectStatusToCardStatus(project.status),
      progress: project.status === "in_progress" ? Math.floor(Math.random() * 80) + 10 : 
               project.status === "completed" ? 100 : 0
    }));

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
                {activeProjects.map(project => (
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
