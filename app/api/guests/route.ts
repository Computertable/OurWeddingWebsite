import { NextResponse } from "next/server";
import { supabaseService } from "../../../utils/supabase/service";

export async function POST(request: Request) {
  const { unique_code } = await request.json();

  const { data, error } = await supabaseService
    .from("WEDDING_RSVP")
    .select("first_name, last_name, rsvp_status")
    .eq("unique_code", unique_code);

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}