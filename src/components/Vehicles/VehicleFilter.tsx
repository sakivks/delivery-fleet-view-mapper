
import React from "react";
import { VehicleStatus, getStatusText } from "@/data/mock-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface VehicleFilterProps {
  selectedFilters: VehicleStatus[];
  onFilterChange: (filters: VehicleStatus[]) => void;
  vehicleCounts: Record<VehicleStatus | 'all', number>;
}

const VehicleFilter = ({ selectedFilters, onFilterChange, vehicleCounts }: VehicleFilterProps) => {
  const handleFilterChange = (value: string) => {
    if (value === "all") {
      onFilterChange(['active', 'paused', 'delayed', 'completed', 'maintenance']);
    } else {
      onFilterChange([value as VehicleStatus]);
    }
  };
  
  // Determine which tab is currently selected
  const currentTab = selectedFilters.length === 5 ? "all" : 
                     selectedFilters.length === 1 ? selectedFilters[0] : "all";

  return (
    <div className="mb-6">
      <Tabs defaultValue={currentTab} value={currentTab} onValueChange={handleFilterChange} className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1 bg-gray-100 rounded-xl">
          <TabsTrigger value="all" className="py-2 relative rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            All
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5 bg-white/80">{vehicleCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="py-2 relative rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            Active
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5 bg-white/80">{vehicleCounts.active}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="py-2 relative rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm">
            Completed
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5 bg-white/80">{vehicleCounts.completed}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-4 text-sm text-gray-500 flex items-center">
        <span>Viewing {vehicleCounts[currentTab === "all" ? "all" : currentTab]} vehicles</span>
      </div>
    </div>
  );
};

export default VehicleFilter;
