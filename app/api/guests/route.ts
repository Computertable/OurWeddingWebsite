import { NextResponse } from "next/server";
import { supabaseService } from "../../../utils/supabase/service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || !Array.isArray(body.responses)) {
      return NextResponse.json(
        { message: "Invalid payload format." },
        { status: 400 }
      );
    }

    const { responses, songRequest } = body;
    const now = new Date().toISOString();

    // Directly update each guest record by primary key 'id'
    const updatePromises = responses.map(
      async (item: { id: number | string; attending: boolean }) => {
        const { error } = await supabaseService
          .from("WEDDING_RSVP")
          .update({
            rsvp_status: item.attending ? "attending" : "declined",
            song_request: songRequest?.trim() || null,
            updated_at: now,
          })
          .eq("id", item.id);

        if (error) {
          throw new Error(`Failed to update guest #${item.id}: ${error.message}`);
        }
      }
    );

    await Promise.all(updatePromises);

    return NextResponse.json({
      success: true,
      message: "RSVP responses updated successfully.",
    });
  } catch (error: any) {
    console.error("Supabase RSVP save error:", error);

    return NextResponse.json(
      { message: error?.message || "Unable to save RSVP details." },
      { status: 500 }
    );
  }
}