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
  isLoading = false,
}: VehicleListProps) => {
  // Filter vehicles based on selectedFilters
  const filteredVehicles =
    selectedFilters.length > 0
      ? vehicles.filter((v) => selectedFilters.includes(v.status))
      : vehicles;

  // Count vehicles by status
  const vehicleCounts = {
    active: vehicles.filter((v) => v.status === "active").length,
    paused: vehicles.filter((v) => v.status === "paused").length,
    delayed: vehicles.filter((v) => v.status === "delayed").length,
    completed: vehicles.filter((v) => v.status === "completed").length,
    maintenance: vehicles.filter((v) => v.status === "maintenance").length,
    all: vehicles.length,
  };

  const renderSkeletons = () => {
    return Array(3)
      .fill(0)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="mb-4">
          <Skeleton className="h-36 w-full rounded-lg" />
        </div>
      ));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Vehicles</h2>

      <VehicleFilter
        selectedFilters={selectedFilters}
        onFilterChange={onFilterChange}
        vehicleCounts={vehicleCounts}
      />

      <div className="space-y-4">
        {isLoading ? (
          renderSkeletons()
        ) : filteredVehicles.length > 0 ? (
          filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onClick={onSelectVehicle}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No vehicles found matching the selected filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleList;
