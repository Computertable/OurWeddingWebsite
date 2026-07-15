import { NextResponse } from "next/server";
import { supabaseService } from "../../../utils/supabase/service";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const unique_code =
      typeof body?.unique_code === "string" ? body.unique_code.trim() : "";

    if (!unique_code) {
      return NextResponse.json(
        { message: "Please provide a valid invitation code." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseService
      .from("WEDDING_RSVP")
      .select("first_name, last_name, rsvp_status")
      .eq("unique_code", unique_code)
      .order("first_name", { ascending: true });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json(data ?? []);
  } catch {
    return NextResponse.json(
      { message: "Unable to load RSVP details." },
      { status: 500 }
    );
  }
}