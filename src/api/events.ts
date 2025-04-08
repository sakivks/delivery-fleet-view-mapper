import { EventService } from "@/services/eventService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, timestamp } = body;

    if (!eventName || !timestamp) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: eventName and timestamp",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await EventService.recordActualEvent(
      eventName,
      new Date(timestamp)
    );

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error recording event:", error);
    return new Response(JSON.stringify({ error: "Failed to record event" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  try {
    const notifications = await EventService.getNotifications();
    return new Response(JSON.stringify(notifications), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch notifications" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
