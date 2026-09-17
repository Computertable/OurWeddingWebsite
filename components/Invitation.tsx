"use client";

import Image from "next/image";
import { DisplayHeading, Divider, Reveal } from "./ds";

/** Invitation — cream band: arch portrait left, right-aligned display stanza, copy below. */
export default function Invitation() {
  return (
    <section id="invitation" className="ds-surface-page ds-section">
      <div className="ds-container grid items-center gap-12 md:grid-cols-[5fr_7fr] md:gap-20">
        <Reveal className="flex justify-center md:justify-start">
          <div className="ds-frame ds-frame--arch relative aspect-[3/4] w-full max-w-[300px]">
            <Image
              src="/images/footer-2.PNG"
              alt="Pia and JJ"
              fill
              sizes="(max-width: 768px) 80vw, 300px"
              quality={75}
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <DisplayHeading size="lg" className="text-center md:text-right">
              A day filled with love,
              <br />
              shaped by our story
            </DisplayHeading>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 md:mt-12 md:pl-16">
            <Divider className="mb-8 max-w-[120px]" />
            <div className="ds-measure flex flex-col gap-4 text-center md:text-left">
              <p className="ds-body ds-body--lg ds-body--italic">
                We&apos;re so happy to celebrate this day with you.
              </p>
              <p className="ds-body ds-body--lg">
                This space offers a little insight into our ceremony and the details that make it
                meaningful to us.
              </p>
              <p className="ds-body ds-body--lg">
                Thank you for being here and for sharing in the joy of this chapter of our lives.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
