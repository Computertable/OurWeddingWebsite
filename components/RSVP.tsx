"use client";

import { useState } from "react";
import { createClient } from "../utils/supabase/client";

type Guest = {
    first_name: string | null;
    last_name: string | null;
    rsvp_status: boolean | null;
};

const TABLE_NAME = "WEDDING_RSVP";

const getCheckedState = (status: Guest["rsvp_status"]) => {
    return (
        status === true
    );
};

export default function RSVP() {
    const [uniqueCode, setUniqueCode] = useState("");
    const [guests, setGuests] = useState<Guest[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        const code = uniqueCode.trim();
        if (!code) {
            setError("Please enter your unique invitation code.");
            setGuests(null);
            return;
        }

        setLoading(true);
        setError(null);
        setGuests(null);

        console.log("RSVP submitting code:", code);

        try {

            const response = await fetch("/api/guest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    unique_code: code,
                }),
            });

            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                setError(data.message);
                setGuests([]);
            } else {
                setGuests(data);
            }

        } catch (caught) {
            setError("An unexpected error occurred while loading RSVP details.");
            setGuests(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-[#F5F3EC] py-16 px-6 text-[#2C2B29] sm:px-10">
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#D8D5C8] bg-white/90 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.08)] sm:p-10">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-display)" }}>
                    RSVP
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5B5240] sm:text-base">
                    Enter your invitation code below to load the guest list for your reservation. Each guest will show a read-only checkbox based on the current RSVP status.
                </p>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        handleSubmit(event.nativeEvent as unknown as SubmitEvent);
                    }}
                    className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto]"
                >
                    <label className="sr-only" htmlFor="uniqueCode">
                        Invitation code
                    </label>
                    <input
                        id="uniqueCode"
                        value={uniqueCode}
                        onChange={(event) => {
                            setUniqueCode(event.target.value);
                            console.log("RSVP code input:", event.target.value);
                        }}
                        placeholder="Enter your unique code"
                        className="w-full rounded-2xl border border-[#D8D5C8] bg-[#F7F5EF] px-4 py-3 text-sm text-[#2C2B29] outline-none transition focus:border-[#A8A696] focus:ring-2 focus:ring-[#A8A696]/20"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-2xl bg-[#A8A696] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8a7f63] disabled:cursor-not-allowed disabled:bg-[#c2bfae]"
                    >
                        {loading ? "Searching…" : "Find guests"}
                    </button>
                </form>

                {error ? (
                    <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </p>
                ) : null}

                {guests && guests.length > 0 ? (
                    <div className="mt-8 space-y-4">
                        {guests.map((guest, index) => {
                            const checked = getCheckedState(guest.rsvp_status);
                            const name = [guest.first_name, guest.last_name].filter(Boolean).join(" ") || "Guest";

                            return (
                                <div key={`${guest.first_name}-${guest.last_name}-${index}`} className="flex items-center justify-between rounded-2xl border border-[#E1DBC8] bg-[#FAF7EE] px-5 py-4">
                                    <div>
                                        <p className="text-base font-medium text-[#2C2B29]">{name}</p>
                                        <p className="text-xs uppercase tracking-[0.3em] text-[#7C7664]">Status: {checked ? "Attending" : "Not attending"}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        readOnly
                                        className="h-5 w-5 rounded border-[#C3BFAF] text-[#A8A696] focus:ring-[#A8A696]"
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : guests && guests.length === 0 ? (
                    <p className="mt-8 rounded-2xl border border-[#D8D5C8] bg-[#FCFBF7] px-4 py-4 text-sm text-[#5B5240]">
                        No guest items were found for that code.
                    </p>
                ) : null}
            </div>
        </section>
    );
}
