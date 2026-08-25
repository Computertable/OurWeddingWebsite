import { NextResponse } from "next/server";
import { supabaseService } from "../../../utils/supabase/service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (Array.isArray(body?.responses)) {
      if (body.responses.length === 0) {
        return NextResponse.json(
          { message: "At least one guest response is required." },
          { status: 400 }
        );
      }

      for (const response of body.responses) {
        if (
          (typeof response?.id !== "number" &&
            typeof response?.id !== "string") ||
          typeof response?.attending !== "boolean"
        ) {
          return NextResponse.json(
            { message: "Invalid guest response." },
            { status: 400 }
          );
        }
      }

      const songRequest =
        typeof body.songRequest === "string"
          ? body.songRequest.trim() || null
          : null;

      const updates = await Promise.all(
        body.responses.map(
          (response: { id: number | string; attending: boolean }) =>
            supabaseService
              .from("WEDDING_RSVP")
              .update({
                rsvp_status: response.attending
                  ? "attending"
                  : "not_attending",
                song_request: songRequest,
              })
              .eq("id", response.id)
              .select("id")
              .single()
        )
      );

      const failedUpdate = updates.find(({ error }) => error);

      if (failedUpdate?.error) {
        console.error("Supabase RSVP update error:", failedUpdate.error);
        return NextResponse.json(
          { message: "Unable to save your RSVP." },
          { status: 500 }
        );
      }

      return NextResponse.json({ message: "RSVP saved." });
    }

    const uniqueCode = body?.unique_code?.trim();

    if (!uniqueCode) {
      return NextResponse.json(
        { message: "Invitation code is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseService
      .from("WEDDING_RSVP")
      .select(
        "id, first_name, last_name, rsvp_status, song_request"
      )
      .eq("unique_code", uniqueCode);

    if (error) {
      console.error(
        "Supabase guest lookup error:",
        error
      );

      return NextResponse.json(
        { message: "Unable to verify invitation." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { message: "Invalid invitation code." },
        { status: 404 }
      );
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error(
      "Invitation verification error:",
      error
    );

    return NextResponse.json(
      {
        message:
          error?.message ||
          "Unable to verify invitation.",
      },
      { status: 500 }
    );
  }
}