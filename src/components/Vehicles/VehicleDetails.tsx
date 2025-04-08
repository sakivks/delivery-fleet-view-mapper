
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Vehicle, getStatusColor, getStatusText } from "@/data/mock-data";
import { Car, MapPin, Truck, Fuel, Clock } from "lucide-react";

interface VehicleDetailsProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
}

const VehicleDetails = ({ vehicle, isOpen, onClose }: VehicleDetailsProps) => {
  if (!vehicle) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(vehicle.status)}`} />
            <span>{vehicle.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {vehicle.vehicleType === "truck" || vehicle.vehicleType === "van" ? (
                <Truck size={18} className="text-gray-500" />
              ) : (
                <Car size={18} className="text-gray-500" />
              )}
              <span className="text-sm font-medium">{vehicle.vehicleType}</span>
            </div>
            <div className="bg-gray-100 px-2 py-1 rounded-full text-xs font-medium">
              {getStatusText(vehicle.status)}
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Driver</h3>
            <p>{vehicle.driver}</p>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Destination</h3>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{vehicle.destination}</span>
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">ETA</h3>
              <p className="flex items-center gap-2">
                <Clock size={16} />
                <span>{vehicle.eta}</span>
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Fuel Level</h3>
              <div className="flex items-center gap-2">
                <Fuel size={16} />
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className={`h-2.5 rounded-full ${
                      vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                      vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${vehicle.fuelLevel}%` }}
                  />
                </div>
                <span className="text-xs">{vehicle.fuelLevel}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-500">Deliveries</h3>
            <div className="flex items-center justify-between">
              <span>{vehicle.deliveries.completed} completed of {vehicle.deliveries.total} total</span>
              <span className="text-sm">{Math.round((vehicle.deliveries.completed / vehicle.deliveries.total) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full"
                style={{ width: `${(vehicle.deliveries.completed / vehicle.deliveries.total) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-500 text-right">
            Last updated: {vehicle.lastUpdated}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetails;
