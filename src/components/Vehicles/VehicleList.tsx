
import React from "react";
import VehicleCard from "./VehicleCard";
import VehicleFilter from "./VehicleFilter";
import { Vehicle, VehicleStatus } from "@/data/mock-data";

interface VehicleListProps {
  vehicles: Vehicle[];
  selectedFilters: VehicleStatus[];
  onFilterChange: (filters: VehicleStatus[]) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

const VehicleList = ({
  vehicles,
  selectedFilters,
  onFilterChange,
  onSelectVehicle
}: VehicleListProps) => {
  const filteredVehicles = selectedFilters.length > 0
    ? vehicles.filter(vehicle => selectedFilters.includes(vehicle.status))
    : vehicles;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2">
        <h2 className="text-lg font-semibold mb-2">Fleet Status</h2>
        <VehicleFilter 
          selectedFilters={selectedFilters} 
          onFilterChange={onFilterChange} 
        />
      </div>
      
      <div className="overflow-y-auto flex-1 pr-2 -mr-2">
        <div className="space-y-3">
          {filteredVehicles.length > 0 ? (
            filteredVehicles.map(vehicle => (
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
