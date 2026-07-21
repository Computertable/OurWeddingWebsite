"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface RSVPSectionProps {
  guest: {
    id: string;
    names: string[];
  };
}

export default function RSVPSection({ guest }: RSVPSectionProps) {
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    guest.names.reduce(
      (acc, name) => ({
        ...acc,
        [name]: true,
      }),
      {}
    )
  );
  
  const [songRequest, setSongRequest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleAttendance = (name: string, attending: boolean) => {
    setAttendance((prev) => ({
      ...prev,
      [name]: attending,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      guestId: guest.id,
      attendance,
      songRequest,
    });

    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="flex min-h-[50vh] items-center justify-center px-4 py-24 sm:py-32">
        {/* Decorative background */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-lg text-center"
        >
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#A8A696] sm:text-[10px] sm:tracking-[0.45em]">
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

          <p className="mt-7 font-sans text-[9px] uppercase tracking-[0.25em] text-[#A8A696] sm:mt-8 sm:text-[10px] sm:tracking-[0.3em]">
            With love, Sofia & JJ
          </p>
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
          <p className="font-sans text-[9px] uppercase tracking-[0.4em] text-[#A8A696] sm:text-[10px] sm:tracking-[0.5em]">
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

          {/* Reply Date */}
          <div className="mx-auto mt-7 flex items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <span className="hidden h-px w-8 bg-[#A8A696]/40 sm:block sm:w-10" />

            <p className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#A8A696] sm:text-[10px] sm:tracking-[0.3em]">
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
          {/* Guest Attendance */}
          <div>
            <div className="mb-5 flex items-center justify-between sm:mb-6">
              <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-[#A8A696] sm:text-[10px] sm:tracking-[0.4em]">
                Your Attendance
              </p>

              <span className="font-serif text-sm italic text-[#6B705C]">
                {guest.names.length}{" "}
                {guest.names.length === 1 ? "guest" : "guests"}
              </span>
            </div>

            {/* Guest Card */}
            <div className="overflow-hidden rounded-2xl border border-[#2C2B29]/10 bg-[#F8F4EE]/50">
              {guest.names.map((name, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className={`px-5 py-6 sm:px-8 sm:py-7 ${
                    index !== guest.names.length - 1
                      ? "border-b border-[#2C2B29]/10"
                      : ""
                  }`}
                >
                  {/* Mobile: Stack | Desktop: Row */}
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <p className="break-words font-serif text-2xl leading-tight text-[#2C2B29] sm:text-2xl">
                        {name}
                      </p>

                      <p className="mt-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#A8A696] sm:text-[9px] sm:tracking-[0.25em]">
                        Kindly select your response
                      </p>
                    </div>

                    <div className="flex w-full rounded-full border border-[#6B705C]/20 bg-[#EFEFE7] p-1 sm:w-auto sm:shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(name, true)}
                        className={`min-h-11 flex-1 rounded-full px-5 py-2.5 font-sans text-[9px] uppercase tracking-[0.15em] transition-all duration-300 sm:min-h-0 sm:flex-none sm:px-4 sm:tracking-[0.18em] ${
                          attendance[name]
                            ? "bg-[#6B705C] text-[#F8F4EE] shadow-sm"
                            : "text-[#6B705C] hover:bg-[#6B705C]/10"
                        }`}
                      >
                        Accept
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleAttendance(name, false)}
                        className={`min-h-11 flex-1 rounded-full px-5 py-2.5 font-sans text-[9px] uppercase tracking-[0.15em] transition-all duration-300 sm:min-h-0 sm:flex-none sm:px-4 sm:tracking-[0.18em] ${
                          !attendance[name]
                            ? "bg-[#4A3B33] text-[#F8F4EE] shadow-sm"
                            : "text-[#6B705C] hover:bg-[#6B705C]/10"
                        }`}
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-12 sm:mt-14">
            <div className="border-t border-[#2C2B29]/10 pt-9 sm:pt-10">
              <h3 className="mt-4 font-serif text-2xl leading-tight sm:text-2xl">
               Our evening's soundtrack
              </h3>

              <p className="mt-3 max-w-lg font-serif text-sm leading-relaxed text-[#6B705C]">
                Our special day will be accompanied by live strings and
                saxophone. If there's a song that holds a special place in
                your heart, share it with us, and it may become part of our evening's soundtrack.
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

          <div className="mt-12 flex justify-center sm:mt-14">
            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="min-h-12 w-full max-w-xs rounded-full bg-[#6B705C] px-8 py-4 font-sans text-[9px] uppercase tracking-[0.3em] text-[#F8F4EE] transition-colors duration-300 hover:bg-[#4A3B33] sm:w-auto sm:px-10 sm:text-[10px] sm:tracking-[0.35em]"
            >
              Send With Love
            </motion.button>
          </div>

          <p className="mt-5 text-center font-serif text-sm italic text-[#A8A696]">
            We look forward to celebrating with you.
          </p>
        </motion.form>
      </div>
    </section>
  );
}