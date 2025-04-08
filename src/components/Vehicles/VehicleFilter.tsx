
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
    <div className="mb-4">
      <Tabs defaultValue={currentTab} value={currentTab} onValueChange={handleFilterChange} className="w-full">
        <TabsList className="w-full grid grid-cols-3 h-auto p-1">
          <TabsTrigger value="all" className="py-2 relative">
            Planned
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5">{vehicleCounts.all}</Badge>
          </TabsTrigger>
          <TabsTrigger value="active" className="py-2 relative">
            Dispatched
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5">{vehicleCounts.active}</Badge>
          </TabsTrigger>
          <TabsTrigger value="completed" className="py-2 relative">
            Completed
            <Badge variant="outline" className="ml-2 py-0 px-1.5 h-5">{vehicleCounts.completed}</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-4 text-sm text-muted-foreground">
        Viewing {vehicleCounts[currentTab === "all" ? "all" : currentTab]} routes
      </div>
    </div>
  );
};

export default VehicleFilter;
