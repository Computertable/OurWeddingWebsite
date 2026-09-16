"use client";

import Image from "next/image";
import { Eyebrow, Reveal } from "./ds";

/**
 * Schedule — "the big day".
 * Left: full-bleed photograph with the title set over it. Right: cream panel with oversized
 * faint date numerals behind the running order.
 *
 * PHOTO: set SCHEDULE_PHOTO to an image in /public (e.g. "/images/schedule.jpg").
 * While it is null, a plain placeholder block is shown.
 *
 * TIMES: only the 3:30 PM ceremony is confirmed elsewhere on the site.
 * The other times are PLACEHOLDERS: replace them before going live.
 */
const SCHEDULE_PHOTO: string | null = "/images/prenup-2.jpg";

// Which part of the photo stays in view when it's cropped.
// First value is horizontal: "0%" = far left edge, "50%" = centre, "100%" = far right.
// Lower it to show more of the left side; raise it to show more of the right.
const PHOTO_POSITION = "24% center";

const EVENTS = [
  { time: "3:30 PM", title: "Wedding ceremony", place: "Saint Anne Parish, Taguig" },
  { time: "4:30 PM", title: "Photo session" }, // placeholder
  { time: "5:00 PM", title: "Cocktail hour", place: "The Blue Leaf" }, // placeholder
  { time: "6:30 PM", title: "Dinner reception" }, // placeholder
  { time: "8:00 PM", title: "Party time" }, // placeholder
];

export default function Schedule() {
  return (
    <section
      id="schedule"
      data-section
      aria-labelledby="schedule-title"
      className="grid grid-cols-1 md:min-h-[640px] md:grid-cols-[11fr_9fr]"
    >
      {/* Photograph + title */}
      <div className="ds-surface-dark relative flex aspect-[4/5] items-center justify-end overflow-hidden md:aspect-auto">
        {SCHEDULE_PHOTO ? (
          <>
            <Image src={SCHEDULE_PHOTO} alt="" fill sizes="(max-width: 768px) 100vw, 55vw" quality={70} className="object-cover" style={{ objectPosition: PHOTO_POSITION }} />
            <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--scrim-bottom)" }} />
          </>
        ) : (
          <div aria-hidden="true" className="absolute inset-0 flex items-end p-6" style={{ background: "var(--green-600)" }}>
            <span className="ds-eyebrow ds-eyebrow--sm ds-eyebrow--on-dark">Photo placeholder</span>
          </div>
        )}

        <Reveal className="relative" >
          <h2
            id="schedule-title"
            className="ds-display ds-display--on-dark ds-script m-0"
            style={{
              fontSize: "clamp(64px, 9vw, 128px)",
              lineHeight: 1,
              paddingRight: "var(--section-x)",
              textAlign: "left",
            }}
          >
            the
            <br />
            big
            <br />
            day
          </h2>
        </Reveal>
      </div>

      {/* Running order */}
      <div
        className="ds-surface-page relative flex items-center overflow-hidden"
        style={{ padding: "var(--section-y) var(--section-x)" }}
      >
        {/* Oversized faint date, decorative */}
        <div
          aria-hidden="true"
          className="ds-display ds-display--roman ds-numerals pointer-events-none absolute right-5 select-none text-right md:left-12 md:right-auto md:text-left"
          style={{
            top: "clamp(8px, 3vw, 32px)",
            fontSize: "clamp(120px, 14vw, 200px)",
            lineHeight: 0.82,
            color: "var(--cream-300)",
          }}
        >
          02
          <br />
          27
        </div>

        <Reveal className="relative mx-auto w-full max-w-[320px] md:ml-[28%] md:mr-0">
          <Eyebrow tone="soft" size="sm" className="mb-6">
            Saturday, 27th of February 2027
          </Eyebrow>
          <ol className="m-0 flex list-none flex-col gap-6 p-0">
            {EVENTS.map((e) => (
              <li key={e.title} className="flex flex-col gap-1">
                <span className="ds-eyebrow">{e.time}</span>
                <span className="ds-body ds-body--lg ds-body--italic">{e.title}</span>
                {e.place && <span className="ds-body ds-body--sm ds-body--muted">{e.place}</span>}
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
