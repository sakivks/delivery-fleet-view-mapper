
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import VehicleList from "@/components/Vehicles/VehicleList";
import DeliveryMap from "@/components/Map/DeliveryMap";
import VehicleDetails from "@/components/Vehicles/VehicleDetails";
import { mockVehicles, Vehicle, VehicleStatus } from "@/data/mock-data";

const Index = () => {
  const [selectedFilters, setSelectedFilters] = useState<VehicleStatus[]>(['active', 'paused', 'delayed', 'completed', 'maintenance']);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailsOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 p-4 lg:p-6 container max-w-7xl mx-auto flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-1">
            <VehicleList 
              vehicles={mockVehicles}
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              onSelectVehicle={handleSelectVehicle}
            />
          </div>
          
          <div className="lg:col-span-2">
            <DeliveryMap 
              vehicles={
                selectedFilters.length > 0
                  ? mockVehicles.filter(v => selectedFilters.includes(v.status))
                  : mockVehicles
              }
              selectedVehicle={selectedVehicle}
              onVehicleSelect={handleSelectVehicle}
            />
          </div>
        </div>
      </main>
      
      <VehicleDetails
        vehicle={selectedVehicle}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </div>
  );
};

export default Index;
