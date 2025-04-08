import { useState, useEffect } from "react";
import Header from "@/components/Layout/Header";
import VehicleList from "@/components/Vehicles/VehicleList";
import DeliveryMap from "@/components/Map/DeliveryMap";
import VehicleDetails from "@/components/Vehicles/VehicleDetails";
import { Vehicle, VehicleStatus, mockVehicles } from "@/data/mock-data";
import { fetchVehicles } from "@/services/VehicleService";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedFilters, setSelectedFilters] = useState<VehicleStatus[]>([
    "active",
    "paused",
    "delayed",
    "completed",
    "maintenance",
  ]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        setLoading(true);
        const data = await fetchVehicles();
        if (data.length > 0) {
          setVehicles(data);
        } else {
          // If no data from API, use mock data
          setVehicles(mockVehicles);
        }
      } catch (error) {
        console.error("Failed to load vehicles:", error);
        toast({
          title: "Error loading data",
          description: "Using mock data instead",
          variant: "destructive",
        });
        setVehicles(mockVehicles);
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, [toast]);

  const handleSelectVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setDetailsOpen(true);
  };

  const filteredVehicles = vehicles.filter((v) =>
    selectedFilters.includes(v.status)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 p-4 lg:p-6 container mx-auto flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
          <div className="lg:col-span-1 overflow-hidden">
            <VehicleList
              vehicles={mockVehicles}
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              onSelectVehicle={handleSelectVehicle}
              isLoading={loading}
            />
          </div>

          <div className="lg:col-span-2 h-[calc(100vh-8rem)]">
            <DeliveryMap
              vehicles={
                selectedFilters.length > 0
                  ? mockVehicles.filter((v) =>
                      selectedFilters.includes(v.status)
                    )
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
