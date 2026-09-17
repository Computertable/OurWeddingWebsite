"use client";

import Link from "next/link";
import { DisplayHeading, Eyebrow, Reveal } from "./ds";

/**
 * Landing-page doorway to the two separate pages (Entourage, Gifts).
 * Deep garden-green band (the design system's dark surface) so it breaks up the cream sections.
 * Two quiet columns split by a hairline, each with one outline button.
 */
const LINKS = [
  {
    href: "/entourage",
    eyebrow: "Standing with us",
    title: "The entourage",
    body: "The family and friends who will walk beside us on the day.",
    cta: "View the entourage",
  },
  {
    href: "/gifts",
    eyebrow: "Gifts",
    title: "A note on gifts",
    body: "Your presence is our gift. A few words, should you wish for more.",
    cta: "Read the note",
  },
];

export default function GuestLinks() {
  return (
    <section aria-label="More for our guests" className="ds-surface-dark ds-section">
      <div className="ds-container grid grid-cols-1 md:grid-cols-2">
        {LINKS.map((l, i) => (
          <Reveal
            key={l.href}
            delay={i * 0.12}
            className={`ds-guest-link flex flex-col items-center px-4 text-center md:px-12 ${
              i === 0 ? "ds-guest-link--first pb-14 md:pb-0" : "pt-14 md:pt-0"
            }`}
          >
            <div className="flex h-full flex-col items-center">
              <Eyebrow tone="onDark">{l.eyebrow}</Eyebrow>
              <DisplayHeading as="h2" size="md" tone="onDark" className="mt-3">
                {l.title}
              </DisplayHeading>
              <p className="ds-body mt-3 max-w-[32ch]" style={{ color: "var(--text-on-dark-muted)" }}>{l.body}</p>
              <Link href={l.href} className="ds-btn ds-btn--outline ds-btn--on-dark mt-7">
                {l.cta}
              </Link>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
