
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Vehicle, getStatusColor } from "@/data/mock-data";
import { Car, Truck } from "lucide-react";

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick: (vehicle: Vehicle) => void;
}

const VehicleCard = ({ vehicle, onClick }: VehicleCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md"
      onClick={() => onClick(vehicle)}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className={`p-2 rounded-full ${getStatusColor(vehicle.status)} flex items-center justify-center`}>
          {vehicle.vehicleType === "truck" || vehicle.vehicleType === "van" ? (
            <Truck size={18} className="text-white" />
          ) : (
            <Car size={18} className="text-white" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="font-medium">{vehicle.name}</h3>
          <p className="text-sm text-muted-foreground">{vehicle.driver}</p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium">
            {vehicle.deliveries.completed}/{vehicle.deliveries.total} Completed
          </p>
          <p className="text-xs text-muted-foreground">
            Updated {vehicle.lastUpdated}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
