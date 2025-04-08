
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle, getStatusColor } from "@/data/mock-data";
import { Car, Truck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  const completionPercentage = Math.round((vehicle.deliveries.completed / vehicle.deliveries.total) * 100);
  
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md border-l-4"
      style={{ borderLeftColor: vehicle.status === 'active' ? '#10b981' : 
                               vehicle.status === 'paused' ? '#f59e0b' :
                               vehicle.status === 'delayed' ? '#ef4444' : 
                               vehicle.status === 'maintenance' ? '#6366f1' : '#94a3b8' }}
      onClick={() => onClick(vehicle)}
    >
      <CardContent className="p-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-600">
            {vehicle.name.substring(0, 2)}
          </div>

          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-medium">{vehicle.name} - {vehicle.driver}</h3>
              <p className="text-xs text-muted-foreground">Finish {vehicle.eta}</p>
            </div>
            
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <span>{vehicle.deliveries.completed} of {vehicle.deliveries.total}</span>
            </div>
            
            <div className="mt-2">
              <Progress value={completionPercentage} className="h-1.5" />
              <div className="flex justify-between mt-1">
                <div className="w-full bg-gray-100 h-1">
                  {Array(5).fill(0).map((_, i) => (
                    <div 
                      key={i} 
                      className="inline-block w-[20%] border-r border-white h-full"
                      style={{
                        backgroundColor: i * 20 < completionPercentage ? 
                          (vehicle.status === 'delayed' ? '#fecaca' : '#dcfce7') : 'transparent'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
