
import React from "react";
import { Button } from "@/components/ui/button";
import { Filter, SortAsc } from "lucide-react";

interface WorkerFilterProps {
  onFilterChange?: () => void;
  onSortChange?: () => void;
}

export function WorkerFilter({ onFilterChange, onSortChange }: WorkerFilterProps) {
  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        className="whitespace-nowrap"
        onClick={onFilterChange}
      >
        <Filter className="h-4 w-4 mr-2" />
        Filter
      </Button>
      <Button 
        variant="outline" 
        className="whitespace-nowrap"
        onClick={onSortChange}
      >
        <SortAsc className="h-4 w-4 mr-2" />
        Sort
      </Button>
    </div>
  );
}
