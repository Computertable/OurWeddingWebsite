"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export interface GuestItem {
  id: number | string;
  name: string;
}

interface RSVPSectionProps {
  party: {
    code?: string;
    guests: GuestItem[];
  };
}

export default function RSVPSection({ party }: RSVPSectionProps) {
  // Track attendance by guest ID instead of string name
  const [attendance, setAttendance] = useState<Record<string | number, boolean>>(
    party.guests.reduce(
      (acc, guest) => ({
        ...acc,
        [guest.id]: true,
      }),
      {}
    )
  );

  const [songRequest, setSongRequest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleToggleAttendance = (id: number | string, attending: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: attending,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Format payload with exact IDs
    const responses = party.guests.map((g) => ({
      id: g.id,
      attending: attendance[g.id] ?? false,
    }));

    try {
      const response = await fetch("/api/guests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          responses,
          songRequest,
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to save your RSVP. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center px-4 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-lg text-center"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] sm:text-[10px] sm:tracking-[0.45em]">
            RSVP Received
          </p>

          <h2 className="mt-5 font-serif text-5xl leading-none sm:mt-6 sm:text-6xl">
            Thank You
          </h2>

          <div className="mx-auto my-7 h-px w-12 bg-[#6B705C]/40 sm:my-8 sm:w-16" />

          <p className="font-serif text-lg leading-relaxed text-[#6B705C]">
            We cannot wait to celebrate
            <br />
            this beautiful day with you.
          </p>

          <p className="mt-7 font-sans text-[9px] uppercase tracking-[0.25em] sm:mt-8 sm:text-[10px] sm:tracking-[0.3em]">
            With love, Sofia & JJ
          </p>

          <motion.button
            onClick={() => setIsSubmitted(false)}
            whileHover={{ y: -1 }}
            className="mt-10 font-sans text-[9px] uppercase tracking-[0.2em] text-[#6B705C] underline decoration-[#6B705C]/30 underline-offset-4 transition-colors hover:text-[#4A3B33]"
          >
            Edit Response
          </motion.button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] sm:text-[10px] sm:tracking-[0.5em]">
            Kindly Respond
          </p>

          <h2 className="mt-5 font-serif text-[2.8rem] leading-[0.95] sm:mt-6 sm:text-5xl md:text-6xl">
            Will You Join Us?
          </h2>

          <p className="mx-auto mt-6 max-w-sm font-serif text-lg leading-relaxed text-[#6B705C] sm:mt-7 sm:max-w-md">
            We would be delighted to celebrate
            <br className="hidden sm:block" />{" "}
            this special day with you.
          </p>

          <div className="mx-auto mt-7 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <span className="hidden h-px w-8 bg-[#A8A696]/40 sm:block sm:w-10" />

            <p className="font-sans text-[8px] uppercase tracking-[0.22em] sm:text-[10px] sm:tracking-[0.3em]">
              Reply by November 7, 2026
            </p>

            <span className="hidden h-px w-8 bg-[#A8A696]/40 sm:block sm:w-10" />
          </div>
        </motion.header>

        {/* RSVP Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-14 sm:mt-16"
        >
          <div>
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] sm:text-[10px] sm:tracking-[0.4em]">
                Your Attendance
              </p>

              <span className="font-serif text-sm italic text-[#6B705C]">
                {party.guests.length}{" "}
                {party.guests.length === 1 ? "guest" : "guests"}
              </span>
            </div>

            {/* Guest List */}
            <div className="overflow-hidden rounded-2xl border border-[#2C2B29]/10 bg-[#F8F4EE]/50">
              {party.guests.map((g, index) => (
                <motion.div
                  key={g.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`px-5 py-6 sm:px-8 sm:py-7 ${
                    index !== party.guests.length - 1
                      ? "border-b border-[#2C2B29]/10"
                      : ""
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="break-words font-sans text-2xl leading-tight text-[#2C2B29] sm:text-2xl">
                        {g.name}
                      </p>

                      <p className="mt-2 font-sans text-[8px] uppercase tracking-[0.2em] sm:text-[9px] sm:tracking-[0.25em]">
                        Kindly select your response
                      </p>
                    </div>

                    <div className="flex w-full rounded-full border border-[#6B705C]/20 bg-[#EFEFE7] p-1 sm:w-auto sm:shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(g.id, true)}
                        className={`min-h-11 flex-1 rounded-full px-5 py-2.5 font-sans text-[9px] uppercase tracking-[0.15em] transition-all duration-300 sm:min-h-0 sm:flex-none sm:px-4 sm:tracking-[0.18em] ${
                          attendance[g.id]
                            ? "bg-[#6B705C] text-[#F8F4EE] shadow-sm"
                            : "text-[#6B705C] hover:bg-[#6B705C]/10"
                        }`}
                      >
                        See You There!
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(g.id, false)}
                        className={`min-h-11 flex-1 rounded-full px-5 py-2.5 font-sans text-[9px] uppercase tracking-[0.15em] transition-all duration-300 sm:min-h-0 sm:flex-none sm:px-4 sm:tracking-[0.18em] ${
                          !attendance[g.id]
                            ? "bg-[#4A3B33] text-[#F8F4EE] shadow-sm"
                            : "text-[#6B705C] hover:bg-[#6B705C]/10"
                        }`}
                      >
                        Can't Make It
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Song Request */}
          <div className="mt-12 sm:mt-14">
            <div className="border-t border-[#2C2B29]/10 pt-9 sm:pt-10">
              <h3 className="mt-4 font-serif text-2xl leading-tight sm:text-2xl">
                Our evening's soundtrack
              </h3>

              <p className="mt-3 max-w-lg font-serif text-sm leading-relaxed text-[#6B705C]">
                Our special day will be accompanied by live strings and
                saxophone. If there's a song that holds a special place in
                your heart, share it with us, and it may become part of our
                evening's soundtrack.
              </p>

              <div className="relative mt-6 sm:mt-7">
                <input
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="Song title & artist"
                  className="w-full border-b border-[#2C2B29]/20 bg-transparent py-4 font-serif text-base text-[#2C2B29] outline-none transition-colors placeholder:text-[#A8A696]/60 focus:border-[#6B705C] sm:text-lg"
                />

                <div className="absolute bottom-0 left-0 h-px w-full bg-[#6B705C]/0 transition-colors focus-within:bg-[#6B705C]" />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="mt-6 text-center font-serif text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <div className="mt-12 flex justify-center sm:mt-14">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ y: isSubmitting ? 0 : -2 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              className="min-h-12 w-full max-w-xs rounded-full bg-[#6B705C] px-8 py-4 font-sans text-[9px] uppercase tracking-[0.3em] text-[#F8F4EE] transition-all duration-300 hover:bg-[#4A3B33] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10 sm:text-[10px] sm:tracking-[0.35em]"
            >
              {isSubmitting ? "Sending..." : "Send With Love"}
            </motion.button>
          </div>

          <p className="mt-5 text-center font-serif text-sm italic">
            We look forward to celebrating with you.
          </p>
        </motion.form>
      </div>
    </section>
  );
}