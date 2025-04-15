
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { 
  ArrowLeft, Calendar, Clock, Users, Package, DollarSign, FileEdit, 
  Plus, Trash2, MoreHorizontal, Save
} from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/formatters";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { useProjectOperations } from "@/hooks/useProjectOperations";

const ProjectManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects, loading } = useProjects();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("schedule");
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [showTaskEditDialog, setShowTaskEditDialog] = useState(false);
  const [showMaterialDialog, setShowMaterialDialog] = useState(false);
  const [showMaterialEditDialog, setShowMaterialEditDialog] = useState(false);
  const [showTeamDialog, setShowTeamDialog] = useState(false);
  const [showTeamEditDialog, setShowTeamEditDialog] = useState(false);
  const [showProjectEditDialog, setShowProjectEditDialog] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<any>(null);
  
  const {
    loading: operationLoading,
    updateTask,
    deleteTask,
    updateMaterial,
    deleteMaterial,
    updateTeamMember,
    deleteTeamMember,
    updateProject,
    updateBudget
  } = useProjectOperations();
  
  const project = projects.find(p => p.id === id);
  
  // Sample data for demonstration purposes
  const [tasks, setTasks] = useState([
    { id: "1", name: "Site preparation", status: "completed", assignee: "Dawit Bekele", dueDate: "2024-05-15" },
    { id: "2", name: "Foundation work", status: "in_progress", assignee: "Eyob Mekonnen", dueDate: "2024-06-30" },
    { id: "3", name: "Framing", status: "planned", assignee: "Unassigned", dueDate: "2024-07-20" },
    { id: "4", name: "Electrical wiring", status: "planned", assignee: "Selam Tesfaye", dueDate: "2024-08-10" },
  ]);
  
  const [materials, setMaterials] = useState([
    { id: "1", name: "Cement", quantity: "250 bags", cost: 125000, status: "delivered" },
    { id: "2", name: "Steel bars", quantity: "2 tons", cost: 180000, status: "ordered" },
    { id: "3", name: "Timber", quantity: "50 pieces", cost: 75000, status: "pending" },
    { id: "4", name: "Bricks", quantity: "5000 units", cost: 50000, status: "delivered" },
  ]);
  
  const [team, setTeam] = useState([
    { id: "1", name: "Dawit Bekele", role: "Site Manager", type: "permanent", dailyRate: 1200 },
    { id: "2", name: "Eyob Mekonnen", role: "Civil Engineer", type: "contract", dailyRate: 1500 },
    { id: "3", name: "Selam Tesfaye", role: "Electrician", type: "daily", dailyRate: 800 },
    { id: "4", name: "Abebe Kebede", role: "Mason", type: "daily", dailyRate: 600 },
  ]);
  
  const [budgetData, setBudgetData] = useState({
    totalBudget: project?.budget || 0,
    spent: 650000,
    allocated: {
      materials: 430000,
      labor: 180000,
      equipment: 40000,
    },
    remaining: (project?.budget || 0) - 650000,
  });
  
  const taskForm = useForm({
    defaultValues: {
      name: "",
      assignee: "",
      dueDate: "",
      status: "planned",
    }
  });
  
  const taskEditForm = useForm({
    defaultValues: {
      name: "",
      assignee: "",
      dueDate: "",
      status: "planned",
    }
  });
  
  const materialForm = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      cost: "",
      status: "pending",
    }
  });
  
  const materialEditForm = useForm({
    defaultValues: {
      name: "",
      quantity: "",
      cost: "",
      status: "pending",
    }
  });
  
  const teamForm = useForm({
    defaultValues: {
      name: "",
      role: "",
      type: "daily",
      dailyRate: "",
    }
  });
  
  const teamEditForm = useForm({
    defaultValues: {
      name: "",
      role: "",
      type: "daily",
      dailyRate: "",
    }
  });
  
  const projectEditForm = useForm({
    defaultValues: {
      name: "",
      location: "",
      client: "",
      startDate: "",
      endDate: "",
      budget: "",
      status: "",
    }
  });
  
  // Add new item handlers
  const handleAddTask = (data) => {
    console.log("Adding new task:", data);
    const newTask = {
      id: `task-${Date.now()}`,
      name: data.name,
      assignee: data.assignee,
      dueDate: data.dueDate,
      status: data.status
    };
    
    setTasks(prev => [...prev, newTask]);
    
    toast({
      title: "Task added",
      description: `New task "${data.name}" has been added to the project.`,
    });
    setShowTaskDialog(false);
    taskForm.reset();
  };
  
  const handleAddMaterial = (data) => {
    console.log("Adding new material:", data);
    const newMaterial = {
      id: `material-${Date.now()}`,
      name: data.name,
      quantity: data.quantity,
      cost: parseInt(data.cost) || 0,
      status: data.status
    };
    
    setMaterials(prev => [...prev, newMaterial]);
    
    toast({
      title: "Material added",
      description: `${data.quantity} of ${data.name} added to the project.`,
    });
    setShowMaterialDialog(false);
    materialForm.reset();
  };
  
  const handleAddTeamMember = (data) => {
    console.log("Adding new team member:", data);
    const newTeamMember = {
      id: `team-${Date.now()}`,
      name: data.name,
      role: data.role,
      type: data.type,
      dailyRate: parseInt(data.dailyRate) || 0
    };
    
    setTeam(prev => [...prev, newTeamMember]);
    
    toast({
      title: "Team member added",
      description: `${data.name} (${data.role}) added to the project team.`,
    });
    setShowTeamDialog(false);
    teamForm.reset();
  };
  
  // Edit item handlers
  const handleEditTask = (task) => {
    setCurrentEditItem(task);
    taskEditForm.reset({
      name: task.name,
      assignee: task.assignee,
      dueDate: task.dueDate,
      status: task.status
    });
    setShowTaskEditDialog(true);
  };
  
  const handleSaveTaskEdit = async (data) => {
    if (!currentEditItem) return;
    
    const success = await updateTask(currentEditItem.id, data);
    
    if (success) {
      setTasks(prev => 
        prev.map(task => 
          task.id === currentEditItem.id ? { ...task, ...data } : task
        )
      );
      setShowTaskEditDialog(false);
    }
  };
  
  const handleRemoveTask = async (taskId) => {
    const success = await deleteTask(taskId);
    
    if (success) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
    }
  };
  
  const handleEditMaterial = (material) => {
    setCurrentEditItem(material);
    materialEditForm.reset({
      name: material.name,
      quantity: material.quantity,
      cost: material.cost.toString(),
      status: material.status
    });
    setShowMaterialEditDialog(true);
  };
  
  const handleSaveMaterialEdit = async (data) => {
    if (!currentEditItem) return;
    
    const formattedData = {
      ...data,
      cost: parseInt(data.cost) || 0
    };
    
    const success = await updateMaterial(currentEditItem.id, formattedData);
    
    if (success) {
      setMaterials(prev => 
        prev.map(material => 
          material.id === currentEditItem.id ? { ...material, ...formattedData } : material
        )
      );
      setShowMaterialEditDialog(false);
    }
  };
  
  const handleRemoveMaterial = async (materialId) => {
    const success = await deleteMaterial(materialId);
    
    if (success) {
      setMaterials(prev => prev.filter(material => material.id !== materialId));
    }
  };
  
  const handleEditTeamMember = (member) => {
    setCurrentEditItem(member);
    teamEditForm.reset({
      name: member.name,
      role: member.role,
      type: member.type,
      dailyRate: member.dailyRate.toString()
    });
    setShowTeamEditDialog(true);
  };
  
  const handleSaveTeamEdit = async (data) => {
    if (!currentEditItem) return;
    
    const formattedData = {
      ...data,
      dailyRate: parseInt(data.dailyRate) || 0
    };
    
    const success = await updateTeamMember(currentEditItem.id, formattedData);
    
    if (success) {
      setTeam(prev => 
        prev.map(member => 
          member.id === currentEditItem.id ? { ...member, ...formattedData } : member
        )
      );
      setShowTeamEditDialog(false);
    }
  };
  
  const handleRemoveTeamMember = async (memberId) => {
    const success = await deleteTeamMember(memberId);
    
    if (success) {
      setTeam(prev => prev.filter(member => member.id !== memberId));
    }
  };
  
  const handleEditProject = () => {
    if (!project) return;
    
    projectEditForm.reset({
      name: project.name,
      location: project.location || "",
      client: project.client,
      startDate: project.start_date || "",
      endDate: project.end_date || "",
      budget: project.budget ? project.budget.toString() : "",
      status: project.status
    });
    
    setShowProjectEditDialog(true);
  };
  
  const handleSaveProjectEdit = async (data) => {
    if (!project) return;
    
    const formattedData = {
      ...data,
      budget: data.budget ? parseInt(data.budget) : null
    };
    
    const success = await updateProject(project.id, formattedData);
    
    if (success) {
      setShowProjectEditDialog(false);
    }
  };
  
  const handleUpdateBudget = async () => {
    if (!project) return;
    
    const success = await updateBudget(project.id, budgetData);
    
    if (success) {
      toast({
        title: "Budget updated",
        description: "Project budget has been updated successfully.",
      });
    }
  };
  
  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 ml-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Project Not Found</h2>
        <p className="text-muted-foreground mb-6">The project you are looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <PageHeader 
          title={`Manage: ${project.name}`}
          description="Control and oversee all aspects of your project"
          className="mb-4 md:mb-0"
        />
        <div className="flex space-x-3">
          <Button variant="outline" onClick={() => navigate(`/projects/${id}`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Details
          </Button>
          <Button 
            variant="outline"
            className="bg-construction-navy text-white hover:bg-construction-navy/90"
            onClick={handleEditProject}
          >
            <FileEdit className="h-4 w-4 mr-2" />
            Edit Project
          </Button>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full mb-6">
          <TabsTrigger value="schedule" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </TabsTrigger>
          <TabsTrigger value="tasks" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center">
            <Users className="h-4 w-4 mr-2" />
            Team
          </TabsTrigger>
          <TabsTrigger value="materials" className="flex items-center">
            <Package className="h-4 w-4 mr-2" />
            Materials
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Budget
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Project Schedule</h3>
              <Button 
                className="bg-construction-orange hover:bg-construction-orange/90"
                onClick={handleEditProject}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Update Timeline
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="md:w-1/2">
                    <h4 className="font-medium mb-2">Project Timeline</h4>
                    <Card className="bg-background p-4">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Start Date</span>
                          <p className="font-medium">{project.start_date ? new Date(project.start_date).toLocaleDateString() : "Not set"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">End Date</span>
                          <p className="font-medium">{project.end_date ? new Date(project.end_date).toLocaleDateString() : "Not set"}</p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Duration</span>
                          <p className="font-medium">
                            {project.start_date && project.end_date
                              ? `${Math.ceil((new Date(project.end_date).getTime() - new Date(project.start_date).getTime()) / (1000 * 60 * 60 * 24))} days`
                              : "Unknown"}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div className="md:w-1/2">
                    <h4 className="font-medium mb-2">Current Phase</h4>
                    <Card className="bg-background p-4">
                      <div className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Phase</span>
                          <p className="font-medium">
                            {project.status === "planned" ? "Planning" : 
                             project.status === "in_progress" ? "Construction" : 
                             project.status === "completed" ? "Completed" : "On Hold"}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Status</span>
                          <div className="mt-1">
                            <Badge
                              className={
                                project.status === "in_progress" ? "bg-blue-500" : 
                                project.status === "completed" ? "bg-green-500" : 
                                project.status === "on_hold" ? "bg-amber-500" : "bg-amber-500"
                              }
                            >
                              {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div 
                              className="bg-green-600 h-2.5 rounded-full" 
                              style={{ 
                                width: `${
                                  project.status === "completed" ? 100 : 
                                  project.status === "planned" ? 0 : 
                                  project.status === "in_progress" ? 65 :
                                  project.status === "on_hold" ? 30 : 50
                                }%` 
                              }}
                            ></div>
                          </div>
                          <p className="text-sm mt-1 text-right">{
                            project.status === "completed" ? 100 : 
                            project.status === "planned" ? 0 : 
                            project.status === "in_progress" ? 65 :
                            project.status === "on_hold" ? 30 : 50
                          }%</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Milestones</h4>
                  <Card className="bg-background">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Project Initiation</TableCell>
                          <TableCell>{project.start_date ? new Date(project.start_date).toLocaleDateString() : "Not set"}</TableCell>
                          <TableCell><Badge className="bg-green-500">Completed</Badge></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast({
                              title: "Edit milestone",
                              description: "Milestone editing will be available in a future update.",
                            })}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Foundation Complete</TableCell>
                          <TableCell>2024-06-30</TableCell>
                          <TableCell><Badge className="bg-blue-500">In Progress</Badge></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast({
                              title: "Edit milestone",
                              description: "Milestone editing will be available in a future update.",
                            })}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Structure Complete</TableCell>
                          <TableCell>2024-08-15</TableCell>
                          <TableCell><Badge className="bg-amber-500">Planned</Badge></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast({
                              title: "Edit milestone",
                              description: "Milestone editing will be available in a future update.",
                            })}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Project Handover</TableCell>
                          <TableCell>{project.end_date ? new Date(project.end_date).toLocaleDateString() : "Not set"}</TableCell>
                          <TableCell><Badge className="bg-amber-500">Planned</Badge></TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => toast({
                              title: "Edit milestone",
                              description: "Milestone editing will be available in a future update.",
                            })}>
                              <FileEdit className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Project Tasks</h3>
              <Button 
                className="bg-construction-orange hover:bg-construction-orange/90"
                onClick={() => setShowTaskDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Task Name</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tasks.map(task => (
                      <TableRow key={task.id}>
                        <TableCell className="font-medium">{task.name}</TableCell>
                        <TableCell>{task.assignee}</TableCell>
                        <TableCell>{task.dueDate}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              task.status === "in_progress" ? "bg-blue-500" : 
                              task.status === "completed" ? "bg-green-500" : 
                              "bg-amber-500"
                            }
                          >
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditTask(task)}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveTask(task.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Project Team</h3>
              <Button 
                className="bg-construction-orange hover:bg-construction-orange/90"
                onClick={() => setShowTeamDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Daily Rate</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {team.map(member => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.role}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              member.type === "daily" ? "bg-amber-500" : 
                              member.type === "contract" ? "bg-blue-500" : 
                              "bg-green-500"
                            }
                          >
                            {member.type.charAt(0).toUpperCase() + member.type.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>{formatCurrency(member.dailyRate)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditTeamMember(member)}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveTeamMember(member.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="materials" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Project Materials</h3>
              <Button 
                className="bg-construction-orange hover:bg-construction-orange/90"
                onClick={() => setShowMaterialDialog(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Material
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {materials.map(material => (
                      <TableRow key={material.id}>
                        <TableCell className="font-medium">{material.name}</TableCell>
                        <TableCell>{material.quantity}</TableCell>
                        <TableCell>{formatCurrency(material.cost)}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              material.status === "delivered" ? "bg-green-500" : 
                              material.status === "ordered" ? "bg-blue-500" : 
                              "bg-amber-500"
                            }
                          >
                            {material.status.charAt(0).toUpperCase() + material.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleEditMaterial(material)}
                            >
                              <FileEdit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleRemoveMaterial(material.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="budget" className="mt-0">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <h3 className="text-lg font-semibold">Project Budget</h3>
              <Button 
                className="bg-construction-orange hover:bg-construction-orange/90"
                onClick={handleUpdateBudget}
              >
                <DollarSign className="h-4 w-4 mr-2" />
                Update Budget
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-background p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Budget</h4>
                    <p className="text-2xl font-bold">{formatCurrency(budgetData.totalBudget)}</p>
                  </Card>
                  <Card className="bg-background p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Spent</h4>
                    <p className="text-2xl font-bold">{formatCurrency(budgetData.spent)}</p>
                  </Card>
                  <Card className="bg-background p-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Remaining Budget</h4>
                    <p className={`text-2xl font-bold ${budgetData.remaining < 0 ? "text-red-500" : ""}`}>
                      {formatCurrency(budgetData.remaining)}
                    </p>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Budget Allocation</h4>
                  <Card className="bg-background">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Category</TableHead>
                          <TableHead>Allocated</TableHead>
                          <TableHead>Percentage</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Materials</TableCell>
                          <TableCell>{formatCurrency(budgetData.allocated.materials)}</TableCell>
                          <TableCell>{Math.round(budgetData.allocated.materials / budgetData.totalBudget * 100)}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Labor</TableCell>
                          <TableCell>{formatCurrency(budgetData.allocated.labor)}</TableCell>
                          <TableCell>{Math.round(budgetData.allocated.labor / budgetData.totalBudget * 100)}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Equipment</TableCell>
                          <TableCell>{formatCurrency(budgetData.allocated.equipment)}</TableCell>
                          <TableCell>{Math.round(budgetData.allocated.equipment / budgetData.totalBudget * 100)}%</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Unallocated</TableCell>
                          <TableCell>
                            {formatCurrency(budgetData.totalBudget - 
                              (budgetData.allocated.materials + budgetData.allocated.labor + budgetData.allocated.equipment))}
                          </TableCell>
                          <TableCell>
                            {Math.round((budgetData.totalBudget - 
                              (budgetData.allocated.materials + budgetData.allocated.labor + budgetData.allocated.equipment)) 
                              / budgetData.totalBudget * 100)}%
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recent Expenses</h4>
                  <Card className="bg-background">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Description</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Cement purchase</TableCell>
                          <TableCell>2024-05-05</TableCell>
                          <TableCell>Materials</TableCell>
                          <TableCell>{formatCurrency(125000)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Labor wages - Week 1</TableCell>
                          <TableCell>2024-05-12</TableCell>
                          <TableCell>Labor</TableCell>
                          <TableCell>{formatCurrency(85000)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Equipment rental</TableCell>
                          <TableCell>2024-05-15</TableCell>
                          <TableCell>Equipment</TableCell>
                          <TableCell>{formatCurrency(40000)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Add Task Dialog */}
      <Dialog open={showTaskDialog} onOpenChange={setShowTaskDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <Form {...taskForm}>
            <form onSubmit={taskForm.handleSubmit(handleAddTask)} className="space-y-4">
              <FormField
                control={taskForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskForm.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Who's responsible" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowTaskDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Task Dialog */}
      <Dialog open={showTaskEditDialog} onOpenChange={setShowTaskEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Form {...taskEditForm}>
            <form onSubmit={taskEditForm.handleSubmit(handleSaveTaskEdit)} className="space-y-4">
              <FormField
                control={taskEditForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter task name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskEditForm.control}
                name="assignee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignee</FormLabel>
                    <FormControl>
                      <Input placeholder="Who's responsible" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskEditForm.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Due Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={taskEditForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowTaskEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={operationLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add Material Dialog */}
      <Dialog open={showMaterialDialog} onOpenChange={setShowMaterialDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Material</DialogTitle>
          </DialogHeader>
          <Form {...materialForm}>
            <form onSubmit={materialForm.handleSubmit(handleAddMaterial)} className="space-y-4">
              <FormField
                control={materialForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter material name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 50 bags, 2 tons" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter cost" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="ordered">Ordered</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowMaterialDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Material
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Material Dialog */}
      <Dialog open={showMaterialEditDialog} onOpenChange={setShowMaterialEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Material</DialogTitle>
          </DialogHeader>
          <Form {...materialEditForm}>
            <form onSubmit={materialEditForm.handleSubmit(handleSaveMaterialEdit)} className="space-y-4">
              <FormField
                control={materialEditForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter material name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialEditForm.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. 50 bags, 2 tons" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialEditForm.control}
                name="cost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter cost" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={materialEditForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="ordered">Ordered</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowMaterialEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={operationLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Add Team Member Dialog */}
      <Dialog open={showTeamDialog} onOpenChange={setShowTeamDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <Form {...teamForm}>
            <form onSubmit={teamForm.handleSubmit(handleAddTeamMember)} className="space-y-4">
              <FormField
                control={teamForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={teamForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Site Manager, Engineer" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={teamForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={teamForm.control}
                name="dailyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Rate</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter daily rate" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowTeamDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Team Member
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Team Member Dialog */}
      <Dialog open={showTeamEditDialog} onOpenChange={setShowTeamEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Team Member</DialogTitle>
          </DialogHeader>
          <Form {...teamEditForm}>
            <form onSubmit={teamEditForm.handleSubmit(handleSaveTeamEdit)} className="space-y-4">
              <FormField
                control={teamEditForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={teamEditForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Site Manager, Engineer" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={teamEditForm.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="permanent">Permanent</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={teamEditForm.control}
                name="dailyRate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Rate</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Enter daily rate" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowTeamEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={operationLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Project Dialog */}
      <Dialog open={showProjectEditDialog} onOpenChange={setShowProjectEditDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          <Form {...projectEditForm}>
            <form onSubmit={projectEditForm.handleSubmit(handleSaveProjectEdit)} className="space-y-4">
              <FormField
                control={projectEditForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter project name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={projectEditForm.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter client name" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={projectEditForm.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Project location" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={projectEditForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={projectEditForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={projectEditForm.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Project budget" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={projectEditForm.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="planned">Planned</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="on_hold">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setShowProjectEditDialog(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={operationLoading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectManage;
