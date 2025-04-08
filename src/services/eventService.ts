import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  event: string;
  created_at: Date;
}

export class EventService {
  // Add a planned event
  static async addPlannedEvent(eventName: string, plannedTimestamp: Date) {
    const { data, error } = await supabase
      .from("planned_schedule")
      .insert([
        {
          event: eventName,
          created_at: plannedTimestamp.toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  // Record an actual event
  static async recordActualEvent(eventName: string, actualTimestamp: Date) {
    const { data, error } = await supabase
      .from("event_timeline")
      .insert([
        {
          event: eventName,
          created_at: actualTimestamp.toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return data[0];
  }

  // Get the latest event for a given event name
  static async getLatestEvent(eventName: string) {
    const { data, error } = await supabase
      .from("event_timeline")
      .select("*")
      .eq("event", eventName)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  }

  // Get planned schedule for an event
  static async getPlannedSchedule(eventName: string) {
    const { data, error } = await supabase
      .from("planned_schedule")
      .select("*")
      .eq("event", eventName)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) throw error;
    return data[0];
  }

  // Get all notifications
  static async getNotifications() {
    const { data, error } = await supabase
      .from("notification")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  }

  // Mark notification as read
  static async markNotificationAsRead(notificationId: string) {
    const { data, error } = await supabase
      .from("notification")
      .update({ read: true })
      .eq("id", notificationId)
      .select();

    if (error) throw error;
    return data[0];
  }
}
