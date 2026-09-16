"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ButtonLink, DisplayHeading, Eyebrow, Reveal } from "./ds";

/**
 * Landing.
 * 1. The seal screen: a quiet cream viewport. The seal itself is rendered by <SiteHeader/>
 *    (fixed) so it can morph into the top bar; this section reserves its space.
 * 2. The existing couple photograph, now a full-bleed film still with the design-system scrim.
 */
export default function Hero() {
  const photoRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <>
      <section
        id="top"
        data-section
        aria-label="Sofia and Joshua"
        className="ds-surface-page relative flex h-[100svh] min-h-[520px] flex-col items-center justify-end"
      >
        <h1 className="sr-only">Sofia &amp; Joshua — February 27, 2027</h1>
        <div className="ds-rise flex flex-col items-center gap-3 pb-8" style={{ animationDelay: "600ms" }}>
          <Eyebrow size="sm" tone="soft">
            Scroll
          </Eyebrow>
          <span aria-hidden="true" className="block h-10 w-px" style={{ background: "var(--line-strong)" }} />
        </div>
      </section>

      <section
        ref={photoRef}
        className="ds-surface-dark relative flex h-[88svh] min-h-[520px] items-center justify-center overflow-hidden"
      >
        <motion.div
          className="absolute inset-x-0 -inset-y-[10%]"
          style={{ y: reduceMotion ? 0 : photoY }}
        >
          <Image
            src="/hero-couple.JPG"
            alt="Sofia and Joshua"
            fill
            sizes="100vw"
            quality={70}
            className="object-cover"
          />
        </motion.div>
        <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--scrim-hero)" }} />

        <Reveal className="relative flex flex-col items-center gap-4 text-center" >
          <Eyebrow tone="onDark">We&apos;re getting married</Eyebrow>
          <DisplayHeading as="p" size="xl" tone="onDark" className="ds-script">
            Sofia &amp; Joshua
          </DisplayHeading>
          <Eyebrow tone="onDark">02 · 27 · 2027 · Taguig, Philippines</Eyebrow>
          <div className="mt-5">
            <ButtonLink href="#rsvp" variant="outline" tone="onDark">
              RSVP
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
