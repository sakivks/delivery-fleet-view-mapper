import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  event: string;
  created_at: Date;
}

export class EventService {
  // Add a planned event
  static async addPlannedEvent(
    eventName: string,
    sequence: number,
    time: number
  ) {
    const { data, error } = await supabase
      .from("planned_schedule")
      .insert([
        {
          event: eventName,
          sequence: sequence,
          time: time,
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
    // Get all planned events ordered by sequence
    const { data: plannedEvents, error: plannedError } = await supabase
      .from("planned_schedule")
      .select("*")
      .order("sequence", { ascending: true });

    if (plannedError) throw plannedError;

    // Get all actual events ordered by time
    const { data: actualEvents, error: actualError } = await supabase
      .from("event_timeline")
      .select("*")
      .order("created_at", { ascending: true });

    if (actualError) throw actualError;

    // Create a map of actual events by event name
    const actualEventsMap = new Map(
      actualEvents.map((event) => [event.event, event])
    );

    // Check time gaps between consecutive events
    for (let i = 0; i < plannedEvents.length - 1; i++) {
      const currentPlanned = plannedEvents[i];
      const nextPlanned = plannedEvents[i + 1];

      const currentActual = actualEventsMap.get(currentPlanned.event);
      const nextActual = actualEventsMap.get(nextPlanned.event);

      if (currentActual && nextActual) {
        const plannedTimeGap = nextPlanned.time; // in minutes
        const actualTimeGap =
          (new Date(nextActual.created_at).getTime() -
            new Date(currentActual.created_at).getTime()) /
          (1000 * 60); // in minutes

        if (actualTimeGap > plannedTimeGap) {
          const delayDuration = Math.round(actualTimeGap - plannedTimeGap);

          // Create notification message
          const message = `Time gap between "${currentPlanned.event}" and "${
            nextPlanned.event
          }" exceeded planned duration. Planned: ${plannedTimeGap} minutes, Actual: ${Math.round(
            actualTimeGap
          )} minutes (${delayDuration} minutes delay)`;

          // Check if notification already exists
          const { data: existingNotification, error: notificationError } =
            await supabase
              .from("notification")
              .select("*")
              .eq(
                "title",
                `Delayed Event: ${currentPlanned.event} -> ${nextPlanned.event}`
              )
              .eq("read", false)
              .limit(1);

          if (notificationError) throw notificationError;

          // Create notification if it doesn't exist
          if (!existingNotification || existingNotification.length === 0) {
            const { error: insertError } = await supabase
              .from("notification")
              .insert([
                {
                  title: `Delayed Event: ${currentPlanned.event} -> ${nextPlanned.event}`,
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
}
