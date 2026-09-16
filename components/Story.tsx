"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "./ds";

const STORY =
  "We met at Sun Life, as colleagues first, until our conversations started running long past the end of the workday. Soon after, Pia moved to Malaysia and JJ to Singapore, and for a while we lived on border crossings, late-night calls and weekends planned down to the hour. The distance never felt like a pause. Every reunion turned into a trip somewhere new, and the list of places we had seen together kept growing. Then, on Pia's birthday, under a winter sky in Seoul, JJ asked the question. She said yes, and we would love for you to be there for whatever comes next.";

/**
 * Our story — one paragraph over layered parallax.
 * Layers move at different speeds: background photograph (slowest), text (slight counter-drift),
 * two floating photographs (fastest, desktop only).
 * Mobile: smaller travel and no floating photos. prefers-reduced-motion: no movement at all.
 */
export default function StorySection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isSmall = useMediaQuery("(max-width: 767px)");

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const bgRange = isSmall ? ["-5%", "5%"] : ["-12%", "12%"];
  const bgY = useTransform(scrollYProgress, [0, 1], bgRange);
  const textY = useTransform(scrollYProgress, [0, 1], isSmall ? [16, -16] : [48, -48]);
  const floatA = useTransform(scrollYProgress, [0, 1], [160, -160]);
  const floatB = useTransform(scrollYProgress, [0, 1], [240, -220]);

  const still = reduceMotion ?? false;

  return (
    <section
      ref={ref}
      id="story"
      data-section
      aria-labelledby="story-label"
      className="ds-surface-dark relative flex min-h-[110svh] items-center justify-center overflow-hidden"
    >
      {/* Layer 1 — background photograph (oversized by 30% so it never reveals an edge while moving) */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-x-0 -inset-y-[15%]"
        style={{ y: still ? 0 : bgY }}
      >
        <Image
          src="/images/story--10.JPG"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover"
        />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--tint-olive)" }} />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--scrim-bottom)" }} />

      {/* Layer 3 — floating photographs, desktop only */}
      {!isSmall && (
        <>
          <motion.div
            aria-hidden="true"
            className="ds-frame ds-frame--float absolute hidden md:block"
            style={{ y: still ? 0 : floatA, left: "6%", top: "14%", width: "clamp(150px, 15vw, 220px)", aspectRatio: "3 / 4" }}
          >
            <Image src="/images/story--1.JPG" alt="" fill sizes="220px" quality={70} className="object-cover" />
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="ds-frame ds-frame--float absolute hidden md:block"
            style={{ y: still ? 0 : floatB, right: "7%", bottom: "12%", width: "clamp(160px, 16vw, 240px)", aspectRatio: "3 / 4" }}
          >
            <Image src="/images/story--12.JPG" alt="" fill sizes="240px" quality={70} className="object-cover" />
          </motion.div>
        </>
      )}

      {/* Layer 2 — the words */}
      <motion.div
        className="relative text-center"
        style={{ y: still ? 0 : textY, paddingInline: "var(--section-x)", paddingBlock: "var(--section-y)" }}
      >
        <Reveal className="mx-auto flex max-w-[34rem] flex-col items-center gap-6">
          <Eyebrow id="story-label" as="h2" tone="onDark">
            Our story
          </Eyebrow>
          <p className="ds-body ds-body--lg ds-body--italic ds-body--on-dark m-0">
            {STORY}
          </p>
          <p className="ds-display ds-display--on-dark ds-script m-0" style={{ fontSize: "var(--display-3)" }}>
            Pia &amp; JJ
          </p>
        </Reveal>
      </motion.div>
    </section>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);
  return matches;
}
