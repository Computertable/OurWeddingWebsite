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
    guest.names.reduce((acc, name) => ({ ...acc, [name]: true }), {})
  );

  const [songRequest, setSongRequest] = useState("");
  const [dietary, setDietary] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggleAttendance = (
    name: string,
    attending: boolean
  ) => {
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
      dietary,
    });

    setIsSubmitted(true);
  };


  if (isSubmitted) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#EFEFE7] px-6 text-center text-[#2C2B29]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2
            className="text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Thank You
          </h2>

          <p
            className="mt-6 text-base text-[#6B705C]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We cannot wait to celebrate
            <br />
            this beautiful day with you.
          </p>
        </motion.div>
      </section>
    );
  }


  return (
    <section
      id="rsvp"
      className="bg-[#EFEFE7] px-6 py-24 text-[#2C2B29] md:py-32"
    >
      <div className="mx-auto max-w-xl">

        <div className="text-center">

          <p
            className="text-[10px] uppercase tracking-[0.45em] text-[#A8A696]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            RSVP
          </p>

          <h2
            className="mt-6 text-5xl leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Will You Join Us?
          </h2>

          <p
            className="mt-6 text-xl leading-relaxed text-[#6B705C] md:text-xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            We would be delighted to celebrate
            <br />
            this special day with you.
          </p>

          <p
            className="mt-8 text-sm uppercase tracking-[0.25em] text-[#A8A696]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Kindly reply by December 1, 2026
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="mt-16 space-y-14"
        >


          <div>

            <div className="space-y-8">

              {guest.names.map((name) => (

                <motion.div
                  key={name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="border-b border-[#2C2B29]/10 pb-6"
                >

                  <h3
                    className="text-2xl"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {name}
                  </h3>


                  <div className="mt-4 flex gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        handleToggleAttendance(name, true)
                      }
                      className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all
                      ${
                        attendance[name]
                          ? "border-[#6B705C] bg-[#6B705C] text-[#EFEFE7]"
                          : "border-[#6B705C]/30 text-[#6B705C]"
                      }`}
                    >
                      Joyfully Accept
                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        handleToggleAttendance(name, false)
                      }
                      className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition-all
                      ${
                        !attendance[name]
                          ? "border-[#6B705C] bg-[#6B705C] text-[#EFEFE7]"
                          : "border-[#6B705C]/30 text-[#6B705C]"
                      }`}
                    >
                      Decline
                    </button>

                  </div>

                </motion.div>

              ))}

            </div>

          </div>



          <div>

            <label
              className="text-[10px] uppercase tracking-[0.4em] text-[#A8A696]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              Our evening's soundtrack
            </label>


            <p
              className="mt-4 text-sm leading-relaxed text-[#6B705C]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Our special day will be accompanied by a live ensemble of strings and saxophone, creating the soundtrack to our celebration. Have a song that holds a special place in your heart?
Share it with us, and it may become part of our evening's soundtrack.
            </p>


            <input
              value={songRequest}
              onChange={(e)=>setSongRequest(e.target.value)}
              placeholder="Song title & artist"
              className="mt-6 w-full border-b border-[#2C2B29]/30 bg-transparent py-3 text-base outline-none placeholder:text-[#A8A696]"
              style={{fontFamily:"var(--font-display)"}}
            />

          </div>


          <div className="flex justify-center pt-6">

            <button
              type="submit"
              className="rounded-full bg-[#6B705C] px-12 py-4 text-xs uppercase tracking-[0.35em] text-[#EFEFE7] transition hover:bg-[#4A3B33]"
            >
              Send With Love
            </button>

          </div>


        </form>

      </div>

    </section>
  );
}