
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle, getStatusColor } from "@/data/mock-data";
import { Car, Truck, MapPin, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const completionPercentage = Math.round((vehicle.deliveries.completed / vehicle.deliveries.total) * 100);
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md border-0 overflow-hidden"
      onClick={() => onClick(vehicle)}
    >
      <div 
        className="h-1" 
        style={{ 
          backgroundColor: vehicle.status === 'active' ? '#22C55E' : 
                          vehicle.status === 'paused' ? '#F59E0B' :
                          vehicle.status === 'delayed' ? '#EF4444' : 
                          vehicle.status === 'maintenance' ? '#6B7280' : '#3B82F6'
        }}
      />
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 shadow-sm">
            {vehicle.name.substring(0, 2)}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{vehicle.name}</h3>
              <div 
                className="text-xs px-2 py-1 rounded-full font-medium"
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
            
            <div className="text-sm text-gray-600 mt-1">{vehicle.driver}</div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin size={14} className="shrink-0" />
                  <span className="truncate max-w-[120px]">{vehicle.destination}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Clock size={14} />
                  <span>{vehicle.eta}</span>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-xs">
                  <span className="text-gray-600">{vehicle.deliveries.completed} of {vehicle.deliveries.total}</span>
                  <span className="font-medium">{completionPercentage}%</span>
                </div>
                <Progress value={completionPercentage} className="h-1.5" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
