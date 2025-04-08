
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Vehicle } from "@/data/mock-data";

interface DeliveryMapProps {
  vehicles: Vehicle[];
  selectedVehicle: Vehicle | null;
  onVehicleSelect: (vehicle: Vehicle) => void;
}

const DeliveryMap = ({ vehicles, selectedVehicle, onVehicleSelect }: DeliveryMapProps) => {
  const [mapboxToken, setMapboxToken] = useState<string>("");
  const [mapInitialized, setMapInitialized] = useState(false);
  
  // For demo purposes, we'll allow users to input their Mapbox token
  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMapInitialized(true);
  };

  // This is just a placeholder - in a real app, we would initialize the map here
  // and display the vehicles on it using the Mapbox GL JS API
  return (
    <Card className="h-full p-4 flex flex-col">
      {!mapInitialized ? (
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-lg font-semibold mb-4">Enter your Mapbox API Token</h2>
          <p className="text-sm text-muted-foreground mb-6 text-center max-w-md">
            To view the interactive map, please enter your Mapbox public token.
            You can get one for free at <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
          </p>
          <form onSubmit={handleTokenSubmit} className="w-full max-w-md">
            <div className="flex gap-2">
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1IjoieW91..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground h-10 px-4 py-2 rounded-md text-sm font-medium"
              >
                Initialize Map
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-gray-100 h-full rounded-lg relative flex-1">
          {/* This would be replaced by the actual Mapbox map */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            <div className="mb-4 text-lg font-semibold">Map Simulation</div>
            <div className="w-full max-w-md grid grid-cols-4 gap-4">
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => onVehicleSelect(vehicle)}
                  className={`p-2 rounded-md border transition-all
                    ${selectedVehicle?.id === vehicle.id ? 'border-primary bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`w-4 h-4 rounded-full mb-1 mx-auto vehicle-marker ${vehicle.status}`} />
                  <div className="text-xs truncate">{vehicle.name}</div>
                </button>
              ))}
            </div>
            <p className="mt-6 text-sm text-center text-muted-foreground">
              In a production environment, this would be replaced by an interactive Mapbox map
              showing the real-time location of each vehicle with color-coded markers.
            </p>
          </div>
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold">Legend</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-active"></div>
                <span className="text-xs">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-paused"></div>
                <span className="text-xs">Paused</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-delayed"></div>
                <span className="text-xs">Delayed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-completed"></div>
                <span className="text-xs">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-status-maintenance"></div>
                <span className="text-xs">Maintenance</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DeliveryMap;
