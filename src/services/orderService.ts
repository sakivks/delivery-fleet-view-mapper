import { supabase } from "@/integrations/supabase/client";

export async function getOrderTrips(tripId: string) {
  const { data, error } = await supabase
    .from("order_trips")
    .insert([
      {
        trip_id: tripId,
      },
    ])
    .select();
  if (error) throw error;
  return data;
}
