"use client";

import Image from "next/image";
import { DisplayHeading, Divider, Eyebrow, Reveal } from "./ds";

// Guest attire colours. These are content (what guests should wear), not UI colours,
// so they intentionally sit outside the design-system palette.
const palette = [
  { name: "Olive", color: "#7b8654" },
  { name: "Dusty Rose", color: "#c9938e" },
  { name: "Peach", color: "#efb990" },
  { name: "Espresso", color: "#4a3529" },
];

export default function DressCode() {
  return (
    <section id="dress-code" data-section aria-labelledby="dress-title" className="ds-surface-page ds-section">
      <Reveal className="ds-container grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className="ds-frame relative aspect-[4/5] w-full">
          <Image
            src="/images/guest-color.jpg"
            alt="Wedding guest dress code colour guide"
            fill
            sizes="(max-width: 768px) 100vw, 540px"
            quality={75}
            className="object-cover object-center"
          />
        </div>

        <div className="flex flex-col items-center text-center">
          <Eyebrow>Attire</Eyebrow>
          <DisplayHeading id="dress-title" size="lg" className="mt-4">
            Dress code
          </DisplayHeading>
          <p className="ds-display ds-display--md ds-display--roman mt-3" style={{ color: "var(--text-muted)" }}>
            Strictly formal
          </p>

          <Divider className="my-8 max-w-[96px]" />

          <p className="ds-body ds-body--lg ds-measure">
            We invite our guests to dress in formal attire, barong and black pants for gentlemen and long
            dress or formal attire for ladies.
          </p>

          <Eyebrow size="sm" tone="soft" className="mt-10">
            Suggested colours
          </Eyebrow>
          <ul className="m-0 mt-5 flex list-none flex-wrap justify-center gap-6 p-0">
            {palette.map((item) => (
              <li key={item.name} className="flex flex-col items-center gap-2">
                <span
                  aria-hidden="true"
                  className="block h-10 w-10 rounded-full"
                  style={{ backgroundColor: item.color, border: "var(--border-hairline)" }}
                />
                <span className="ds-eyebrow ds-eyebrow--sm">{item.name}</span>
              </li>
            ))}
          </ul>

          <p className="ds-body ds-body--italic ds-body--muted mt-10">
            Kindly avoid white, ivory, and overly casual attire.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
