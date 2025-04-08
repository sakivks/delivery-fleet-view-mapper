import { EventService } from "@/services/eventService";
import { supabase } from "@/integrations/supabase/client";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

export async function OPTIONS() {
  return new Response("ok", { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    // Handle CORS preflight requests
    if (request.method === "OPTIONS") {
      return new Response("ok", { headers: corsHeaders });
    }

    // Get the authorization header
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify the token with Supabase
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(authHeader);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid authorization token" }),
        {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const { eventName, actualTimestamp } = await request.json();

    if (!eventName || !actualTimestamp) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Record the actual event and check for delays
    const result = await EventService.recordActualEvent(
      eventName,
      new Date(actualTimestamp)
    );

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error recording event:", error);
    return new Response(JSON.stringify({ error: "Failed to record event" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
}
