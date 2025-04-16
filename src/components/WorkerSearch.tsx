
import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { WorkerFilter } from "@/components/WorkerFilter";

interface WorkerSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function WorkerSearch({ searchQuery, setSearchQuery }: WorkerSearchProps) {
  return (
    <Card className="mb-6 p-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search workers..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <WorkerFilter 
          onFilterChange={() => console.log("Filter clicked")}
          onSortChange={() => console.log("Sort clicked")}
        />
      </div>
    </Card>
  );
}
