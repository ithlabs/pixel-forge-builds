
import React from "react";
import { WorkerCard } from "@/components/WorkerCard";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

type Worker = {
  id: string;
  name: string;
  role: string;
  phone: string;
  ratePerDay: string;
  projectName?: string;
  type: "daily" | "contract" | "permanent";
};

interface WorkerGridProps {
  workers: Worker[];
  isLoading: boolean;
  onWorkerUpdated: () => void;
}

export function WorkerGrid({ workers, isLoading, onWorkerUpdated }: WorkerGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Card key={n} className="w-full h-[200px] animate-pulse bg-gray-100"></Card>
        ))}
      </div>
    );
  }

  if (workers.length === 0) {
    return (
      <div className="col-span-3 py-8 text-center text-gray-500">
        No workers found matching your search criteria
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {workers.map(worker => (
        <WorkerCard 
          key={worker.id} 
          {...worker} 
          onWorkerUpdated={onWorkerUpdated}
        />
      ))}
    </div>
  );
}
