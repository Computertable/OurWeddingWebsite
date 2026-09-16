"use client";

import { DetailList, DisplayHeading, Divider, Eyebrow, NotePanel, Reveal } from "./ds";

/**
 * Gifts — NEW section.
 * Add your gift details below when ready. While the list is empty, the details panel is hidden
 * and guests only see the message, so nothing unfinished ever shows on the live site.
 *
 * Example:
 * { term: "Bank", description: "BPI · Sofia Perez · 1234 5678 90" },
 * { term: "GCash", description: "0917 000 0000 · Sofia P." },
 */
const GIFT_DETAILS: Array<{ term: string; description: string }> = [];

export default function Gifts() {
  return (
    <section id="gifts" data-section aria-labelledby="gifts-title" className="ds-surface-page ds-section">
      <Reveal className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <Eyebrow>Gifts</Eyebrow>
        <DisplayHeading id="gifts-title" size="lg" className="mt-4">
          Your presence is our gift
        </DisplayHeading>
        <Divider ornament className="my-8 w-full max-w-[220px]" />
        <p className="ds-body ds-body--lg ds-measure">
          Having you with us is all we could ask for. Should you wish to mark the day with something more,
          a contribution towards our first home together would be warmly received.
        </p>

        {GIFT_DETAILS.length > 0 && (
          <NotePanel tone="outline" className="mt-10 w-full max-w-[420px] text-left">
            <DetailList items={GIFT_DETAILS} />
          </NotePanel>
        )}
      </Reveal>
    </section>
  );
}
