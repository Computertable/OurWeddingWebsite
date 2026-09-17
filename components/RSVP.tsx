"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Button,
  DisplayHeading,
  ENTRANCE,
  Eyebrow,
  NotePanel,
  Reveal,
  TextField,
} from "./ds";

export interface GuestItem {
  id: number | string;
  name: string;
  rsvp_status?: string | null;
  song_request?: string | null;
}

interface RSVPSectionProps {
  party: {
    code?: string;
    guests: GuestItem[];
  };
}

/**
 * RSVP — visual refresh only.
 * Same fields (attendance per guest + one song request), same state, same POST to /api/guests
 * with the same payload, same thank-you → edit flow.
 */
export default function RSVPSection({ party }: RSVPSectionProps) {
  const [attendance, setAttendance] = useState<Record<string | number, boolean | null>>(
    party.guests.reduce((acc, guest) => {
      let initialStatus = null;
      if (guest.rsvp_status === "attending") {
        initialStatus = true;
      } else if (guest.rsvp_status === "not_attending") {
        initialStatus = false;
      }

      return {
        ...acc,
        [guest.id]: initialStatus,
      };
    }, {})
  );

  const [songRequest, setSongRequest] = useState(party.guests[0]?.song_request || "");
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
    const responses = party.guests
      .filter((g) => attendance[g.id] !== null)
      .map((g) => ({
        id: g.id,
        attending: attendance[g.id],
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
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const guests = [...party.guests].sort((a, b) => Number(a.id) - Number(b.id));

  // Move focus to the confirmation so screen-reader and keyboard users land on it.
  const confirmationRef = useRef<HTMLHeadingElement>(null);
  const formTopRef = useRef<HTMLDivElement>(null);
  const hasSubmittedOnce = useRef(false);
  useEffect(() => {
    if (isSubmitted) {
      hasSubmittedOnce.current = true;
      confirmationRef.current?.focus();
    } else if (hasSubmittedOnce.current) {
      formTopRef.current?.focus();
    }
  }, [isSubmitted]);

  return (
    <section id="rsvp" data-section aria-labelledby="rsvp-title" className="ds-surface-sunken ds-section">
      <div className="mx-auto max-w-[760px]">
        {/* Header */}
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Kindly respond</Eyebrow>
          <DisplayHeading id="rsvp-title" size="lg" className="mt-4">
            Will you join us?
          </DisplayHeading>
          <p className="ds-body ds-body--lg ds-body--muted ds-measure-narrow mt-5">
            We would be delighted to celebrate this special day with you.
          </p>
        </Reveal>

        <AnimatePresence mode="wait" initial={false}>
          {isSubmitted ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: ENTRANCE }}
              className="mt-12 sm:mt-16"
            >
              <NotePanel tone="olive" className="text-center" role="status">
                <Eyebrow tone="onDark">RSVP received</Eyebrow>
                <h3
                  ref={confirmationRef}
                  tabIndex={-1}
                  className="ds-display ds-display--lg ds-display--on-dark ds-script mt-4 outline-none"
                >
                  Thank you
                </h3>
                <p className="ds-body ds-body--lg ds-body--on-dark mx-auto mt-4 max-w-[30ch]">
                  We cannot wait to celebrate this beautiful day with you.
                </p>

                <ul className="mx-auto mt-8 flex max-w-sm list-none flex-col gap-3 p-0">
                  {guests.map((g) => (
                    <li
                      key={g.id}
                      className="flex items-baseline justify-between gap-4 pb-3 text-left"
                      style={{ borderBottom: "var(--border-on-dark)" }}
                    >
                      <span className="ds-body ds-body--on-dark">{g.name}</span>
                      <span className="ds-eyebrow ds-eyebrow--sm ds-eyebrow--on-dark whitespace-nowrap">
                        {attendance[g.id] === true
                          ? "Attending"
                          : attendance[g.id] === false
                            ? "Not attending"
                            : "No reply"}
                      </span>
                    </li>
                  ))}
                </ul>

                <Eyebrow tone="onDark" size="sm" className="mt-8">
                  With love, Sofia &amp; JJ
                </Eyebrow>
                <div className="mt-6">
                  <Button variant="text" tone="onDark" onClick={() => setIsSubmitted(false)}>
                    Edit response
                  </Button>
                </div>
              </NotePanel>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: ENTRANCE }}
              className="mt-12 sm:mt-16"
              aria-busy={isSubmitting}
              noValidate
            >
              <div ref={formTopRef} tabIndex={-1} className="outline-none" />


              <ul className="m-0 mt-6 list-none p-0" style={{ borderTop: "var(--border-hairline)" }}>
                {guests.map((g) => {
                  const nameId = `rsvp-guest-${g.id}`;
                  const value = attendance[g.id] ?? null;
                  return (
                    <li
                      key={g.id}
                      className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                      style={{ borderBottom: "var(--border-hairline)" }}
                    >
                      <p id={nameId} className="ds-body ds-body--lg ds-body--italic m-0 break-words">
                        {g.name}
                      </p>
                      <div
                        role="radiogroup"
                        aria-labelledby={nameId}
                        aria-describedby="rsvp-reply-hint"
                        className="ds-switch"
                      >
                        {[
                          { v: true, label: "See you there", tone: "yes" },
                          { v: false, label: "Can't make it", tone: "no" },
                        ].map((opt) => (
                          <button
                            key={opt.label}
                            type="button"
                            role="radio"
                            aria-checked={value === opt.v}
                            onClick={() => handleToggleAttendance(g.id, opt.v)}
                            className={`ds-switch__option ds-switch__option--${opt.tone}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Song request */}
              <div className="mt-12">
                <TextField
                  label="A song for the evening"
                  hint="Live strings and saxophone will play through the night. Optional."
                  value={songRequest}
                  onChange={(e) => setSongRequest(e.target.value)}
                  placeholder="Song title & artist"
                  autoComplete="off"
                />
              </div>

              {/* Send */}
              <div className="mt-12 flex flex-col items-center text-center sm:mt-14">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.32 }}
                      className="mb-8 w-full"
                    >
                      <NotePanel
                        tone="outline"
                        role="alert"
                        className="py-5 text-left"
                        style={{ borderColor: "var(--rose-300)" }}
                      >
                        <Eyebrow tone="accent" size="sm">
                          We couldn&apos;t send that
                        </Eyebrow>
                        <p className="ds-body mt-1">{error}</p>
                      </NotePanel>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full max-w-xs sm:w-auto">
                  {isSubmitting ? "Sending…" : "Submit RSVP"}
                </Button>

                <Eyebrow size="sm" tone="soft" className="mt-6 max-w-[36ch]">
                  You can update your response anytime before November 7, 2026.
                </Eyebrow>

                <p className="ds-body ds-body--italic ds-body--muted mt-10">
                  We look forward to celebrating with you.
                </p>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
