import React from "react";
import VehicleCard from "./VehicleCard";
import VehicleFilter from "./VehicleFilter";
import { Vehicle, VehicleStatus } from "@/data/mock-data";
import { Skeleton } from "@/components/ui/skeleton";

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedFilters: VehicleStatus[];
  onFilterChange: (filters: VehicleStatus[]) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  isLoading?: boolean;
}

const VehicleList = ({
  vehicles,
  selectedFilters,
  onFilterChange,
  onSelectVehicle,
}: VehicleListProps) => {
  const filteredVehicles =
    selectedFilters.length > 0
      ? vehicles.filter((vehicle) => selectedFilters.includes(vehicle.status))
      : vehicles;

  // Calculate counts for each status
  const vehicleCounts: Record<VehicleStatus | "all", number> = {
    all: vehicles.length,
    active: vehicles.filter((v) => v.status === "active").length,
    paused: vehicles.filter((v) => v.status === "paused").length,
    delayed: vehicles.filter((v) => v.status === "delayed").length,
    completed: vehicles.filter((v) => v.status === "completed").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
  };

  return (
    <div className="h-full flex flex-col">
      <VehicleFilter
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
        vehicleCounts={vehicleCounts}
      />

      <div className="flex-1 pr-2 -mr-2">
        <div className="space-y-3 overflow-auto">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                onClick={onSelectVehicle}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No vehicles match the selected filters
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;
