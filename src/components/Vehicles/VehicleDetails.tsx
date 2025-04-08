
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Vehicle, getStatusColor, getStatusText } from "@/data/mock-data";
import { Car, MapPin, Truck, Fuel, Clock, Package } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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
        <div 
          className="absolute top-0 left-0 h-1.5 w-full"
          style={{
            backgroundColor: vehicle.status === 'active' ? '#22C55E' : 
                           vehicle.status === 'paused' ? '#F59E0B' :
                           vehicle.status === 'delayed' ? '#EF4444' : 
                           vehicle.status === 'maintenance' ? '#6B7280' : '#3B82F6'
          }}
        />
        <DialogHeader className="pb-2">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-base font-medium text-gray-700">
                {vehicle.name.substring(0, 2)}
              </div>
              <div>
                <div>{vehicle.name}</div>
                <div className="text-sm font-normal text-gray-500">{vehicle.driver}</div>
              </div>
            </DialogTitle>
            <div 
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{ 
                backgroundColor: vehicle.status === 'active' ? '#DCFCE7' : 
                                vehicle.status === 'paused' ? '#FEF3C7' :
                                vehicle.status === 'delayed' ? '#FEE2E2' : 
                                vehicle.status === 'maintenance' ? '#F3F4F6' : '#DBEAFE',
                color: vehicle.status === 'active' ? '#15803D' : 
                        vehicle.status === 'paused' ? '#B45309' :
                        vehicle.status === 'delayed' ? '#B91C1C' : 
                        vehicle.status === 'maintenance' ? '#4B5563' : '#1D4ED8'
              }}
            >
              {vehicle.status === 'active' ? 'Active' : 
               vehicle.status === 'paused' ? 'Paused' :
               vehicle.status === 'delayed' ? 'Delayed' : 
               vehicle.status === 'maintenance' ? 'Maintenance' : 'Completed'}
            </div>
          </div>
        </DialogHeader>
        
        <Separator />
        
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">Vehicle Type</div>
              <div className="flex items-center gap-2">
                {vehicle.vehicleType === "truck" || vehicle.vehicleType === "van" ? (
                  <Truck size={16} className="text-gray-700" />
                ) : (
                  <Car size={16} className="text-gray-700" />
                )}
                <span className="capitalize">{vehicle.vehicleType}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 mb-1">ETA</div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-gray-700" />
                <span>{vehicle.eta}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500 mb-1">Destination</div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="shrink-0 mt-0.5 text-gray-700" />
              <span>{vehicle.destination}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package size={16} className="text-gray-700" />
                <span className="font-medium">Deliveries</span>
              </div>
              <div className="text-sm font-medium">
                {Math.round((vehicle.deliveries.completed / vehicle.deliveries.total) * 100)}%
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full"
                style={{
                  width: `${(vehicle.deliveries.completed / vehicle.deliveries.total) * 100}%`,
                  backgroundColor: vehicle.status === 'active' ? '#22C55E' : 
                                  vehicle.status === 'paused' ? '#F59E0B' :
                                  vehicle.status === 'delayed' ? '#EF4444' : '#3B82F6'
                }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{vehicle.deliveries.completed} completed</span>
              <span>{vehicle.deliveries.total - vehicle.deliveries.completed} remaining</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fuel size={16} className="text-gray-700" />
                <span className="font-medium">Fuel Level</span>
              </div>
              <div className="text-sm font-medium">{vehicle.fuelLevel}%</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  vehicle.fuelLevel > 70 ? 'bg-green-500' : 
                  vehicle.fuelLevel > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${vehicle.fuelLevel}%` }}
              />
            </div>
          </div>
          
          <div className="text-xs text-gray-400 text-right pt-2">
            Last updated: {vehicle.lastUpdated}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDetails;
