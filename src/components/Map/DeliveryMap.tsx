import { Card } from "@/components/ui/card";
import { Vehicle } from "@/data/mock-data";
import { MapPin } from "lucide-react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface DeliveryMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

const DeliveryMap = ({
  vehicles,
  selectedVehicle,
  onVehicleSelect,
}: DeliveryMapProps) => {
  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyCMcRhutLKgufJEEGIW4l3W1TiDaf5li3w",
  });

  const center = {
    lat: 28.6139,
    lng: 77.209,
  };

  if (!isLoaded) return <div className="h-full">Loading...</div>;
  return (
    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-md">
      <div className="relative flex-1">
        <div className="absolute inset-0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={12}
          >
            <Marker position={center} />
          </GoogleMap>
          {/* Vehicle markers that would be positioned on the map */}

          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              onClick={() => onVehicleSelect(vehicle)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all
                    ${
                      selectedVehicle?.id === vehicle.id
                        ? "z-10 scale-125"
                        : "z-0"
                    }`}
              style={{
                // Random positions for demo
                left: `${(Math.abs(vehicle.id.charCodeAt(2)) % 80) + 10}%`,
                top: `${(Math.abs(vehicle.id.charCodeAt(3)) % 80) + 10}%`,
              }}
            >
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white shadow-lg
                        ${
                          selectedVehicle?.id === vehicle.id
                            ? "ring-2 ring-white ring-offset-2"
                            : ""
                        }`}
                  style={{
                    backgroundColor:
                      vehicle.status === "active"
                        ? "#22C55E"
                        : vehicle.status === "paused"
                        ? "#F59E0B"
                        : vehicle.status === "delayed"
                        ? "#EF4444"
                        : vehicle.status === "maintenance"
                        ? "#6B7280"
                        : "#3B82F6",
                  }}
                >
                  {vehicle.name.substring(0, 2)}
                </div>
                {selectedVehicle?.id === vehicle.id && (
                  <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg text-xs whitespace-nowrap w-36 z-20">
                    <div className="font-medium text-sm">{vehicle.name}</div>
                    <div className="text-gray-500">{vehicle.driver}</div>
                    <div className="mt-1 text-gray-600 flex items-center gap-1">
                      <MapPin size={12} />
                      <span className="truncate">{vehicle.destination}</span>
                    </div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-10">
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Legend
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs">Paused</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-xs">Delayed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span className="text-xs">Maintenance</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DeliveryMap;
