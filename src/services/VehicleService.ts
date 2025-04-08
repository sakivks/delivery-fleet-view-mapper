
import { supabase } from "@/integrations/supabase/client";
import { Vehicle, mapDbVehicleToAppVehicle } from "@/data/mock-data";
import { Database } from "@/integrations/supabase/types";

// Define types based on your database schema
type DbVehicle = Database['public']['Tables']['vehicles']['Row'];
type DbDriver = Database['public']['Tables']['drivers']['Row'];
type DbTrip = Database['public']['Tables']['trips']['Row'];
type DbOrderTrip = Database['public']['Tables']['order_trips']['Row'];

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  try {
    // Fetch vehicles
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('*');
    
    if (vehiclesError) throw vehiclesError;
    if (!vehicles) return [];
    
    // Fetch drivers to join with vehicles
    const { data: drivers, error: driversError } = await supabase
      .from('drivers')
      .select('*');
    
    if (driversError) throw driversError;
    
    // Fetch active trips
    const { data: trips, error: tripsError } = await supabase
      .from('trips')
      .select('*');
    
    if (tripsError) throw tripsError;
    
    // Fetch order counts
    const { data: orderTrips, error: orderTripsError } = await supabase
      .from('order_trips')
      .select('trip_id, completed_at');
    
    if (orderTripsError) throw orderTripsError;
    
    // Map database entities to our application model
    return vehicles.map(vehicle => {
      const driver = drivers?.find(d => d.id === vehicle.driver_id);
      const trip = trips?.find(t => t.vehicle_id === vehicle.id);
      
      // Calculate order counts
      const tripOrders = orderTrips?.filter(ot => ot.trip_id === trip?.id) || [];
      const completedOrders = tripOrders.filter(to => to.completed_at).length;
      const totalOrders = tripOrders.length;
      
      const orderCount = {
        completed: completedOrders,
        total: totalOrders || 5 // Fallback to 5 if no orders found
      };
      
      return mapDbVehicleToAppVehicle(vehicle, driver, trip, orderCount);
    });
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return [];
  }
};
