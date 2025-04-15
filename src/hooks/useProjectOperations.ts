
import { useWorkerOperations } from "@/hooks/useWorkerOperations";
import { useTaskOperations } from "@/hooks/useTaskOperations";
import { useMaterialOperations } from "@/hooks/useMaterialOperations";
import { useProjectManagement } from "@/hooks/useProjectManagement";

// This is now a facade that combines all the domain-specific hooks
export function useProjectOperations() {
  const workerOps = useWorkerOperations();
  const taskOps = useTaskOperations();
  const materialOps = useMaterialOperations();
  const projectOps = useProjectManagement();

  return {
    // Return loading status from any of the hooks (they're independent)
    loading: workerOps.loading || taskOps.loading || materialOps.loading || projectOps.loading,
    
    // Task operations
    updateTask: taskOps.updateTask,
    deleteTask: taskOps.deleteTask,
    
    // Material operations
    updateMaterial: materialOps.updateMaterial,
    deleteMaterial: materialOps.deleteMaterial,
    
    // Worker operations
    updateTeamMember: workerOps.updateTeamMember,
    deleteTeamMember: workerOps.deleteTeamMember,
    addWorker: workerOps.addWorker,
    
    // Project operations
    updateProject: projectOps.updateProject,
    updateBudget: projectOps.updateBudget,
  };
}
