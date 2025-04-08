
import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Vehicle } from "@/data/mock-data";
import { MapPin } from "lucide-react";

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

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {!mapInitialized ? (
        <div className="flex flex-col items-center justify-center h-full p-4">
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
        <div className="relative flex-1">
          {/* This would be replaced by the actual Mapbox map */}
          <div className="absolute inset-0 bg-gray-100">
            <div className="absolute inset-0" style={{ 
              backgroundImage: "url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-71.090,42.360,12,0/1200x800?access_token=" + mapboxToken + "')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: mapboxToken ? 1 : 0
            }}>
              {/* Vehicle markers that would be positioned on the map */}
              {vehicles.map((vehicle) => (
                <button
                  key={vehicle.id}
                  onClick={() => onVehicleSelect(vehicle)}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all
                    ${selectedVehicle?.id === vehicle.id ? 'z-10 scale-125' : 'z-0'}`}
                  style={{
                    // Random positions for demo
                    left: `${(Math.abs(vehicle.id.charCodeAt(2)) % 80) + 10}%`,
                    top: `${(Math.abs(vehicle.id.charCodeAt(3)) % 80) + 10}%`
                  }}
                >
                  <div className="relative">
                    <div 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white"
                      style={{
                        backgroundColor: vehicle.status === 'active' ? '#10b981' : 
                                        vehicle.status === 'paused' ? '#f59e0b' :
                                        vehicle.status === 'delayed' ? '#ef4444' : 
                                        vehicle.status === 'maintenance' ? '#6366f1' : '#94a3b8'
                      }}
                    >
                      {vehicle.name.substring(0, 2)}
                    </div>
                    {selectedVehicle?.id === vehicle.id && (
                      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-md shadow-lg text-xs whitespace-nowrap">
                        <div className="font-medium">{vehicle.name}</div>
                        <div>{vehicle.driver}</div>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-white p-2 rounded-md shadow-md z-10">
            <div className="flex flex-col gap-2">
              <div className="text-xs font-semibold">Legend</div>
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
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
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
