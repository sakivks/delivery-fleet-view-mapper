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

    // Check for delayed events after recording
    try {
      await this.checkForDelayedEvents();
    } catch (error) {
      console.error("Error checking delayed events:", error);
    }

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

  // Check for delayed events and create notifications
  static async checkForDelayedEvents() {
    // Get all planned events
    const { data: plannedEvents, error: plannedError } = await supabase
      .from("planned_schedule")
      .select("*")
      .order("created_at", { ascending: false });

    if (plannedError) throw plannedError;

    // For each planned event, check if it's delayed
    for (const plannedEvent of plannedEvents) {
      if (!plannedEvent.event) continue;

      // Get the latest actual event
      const { data: actualEvent, error: actualError } = await supabase
        .from("event_timeline")
        .select("*")
        .eq("event", plannedEvent.event)
        .order("created_at", { ascending: false })
        .limit(1);

      if (actualError) throw actualError;

      const plannedTime = new Date(plannedEvent.created_at);
      const actualTime = actualEvent?.[0]?.created_at
        ? new Date(actualEvent[0].created_at)
        : null;

      // If no actual event exists or it's delayed compared to planned
      if (
        !actualEvent ||
        actualEvent.length === 0 ||
        (actualTime && actualTime > plannedTime)
      ) {
        // Calculate delay duration
        const delayDuration = actualTime
          ? Math.round(
              (actualTime.getTime() - plannedTime.getTime()) / (1000 * 60)
            ) // in minutes
          : null;

        // Create notification message
        const message = actualTime
          ? `Event "${
              plannedEvent.event
            }" is delayed by ${delayDuration} minutes. Planned: ${plannedTime.toLocaleString()}, Actual: ${actualTime.toLocaleString()}`
          : `Event "${
              plannedEvent.event
            }" is missing. It was planned for ${plannedTime.toLocaleString()}`;

        // Check if notification already exists
        const { data: existingNotification, error: notificationError } =
          await supabase
            .from("notification")
            .select("*")
            .eq("title", `Delayed Event: ${plannedEvent.event}`)
            .eq("read", false)
            .limit(1);

        if (notificationError) throw notificationError;

        // Create notification if it doesn't exist
        if (!existingNotification || existingNotification.length === 0) {
          const { error: insertError } = await supabase
            .from("notification")
            .insert([
              {
                title: `Delayed Event: ${plannedEvent.event}`,
                message: message,
                read: false,
              },
            ]);

          if (insertError) throw insertError;
        }
      }
    }
  }
}
