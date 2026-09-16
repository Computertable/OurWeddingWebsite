"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal } from "./ds";

const STORY =
  "We first met as colleagues at Sun Life, but our story really began when Pia moved to Malaysia for a new job, and the distance somehow brought us closer. A few months later, JJ tried to follow, but the closest he could get was a role in Singapore, and so our love story became a long-distance one. We learned to love across borders, through late-night calls, counting down to weekends and goodbyes that never got easier. Still, every reunion felt like coming home. Two years into our relationship, on Pia's birthday beneath a winter sky in Seoul, JJ got down on one knee, and Pia said yes without a second thought. Now we are ready to begin our next chapter, surrounded by the people we love most.";

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
          // Keeps both of us in frame on narrow (phone) screens
          style={{ objectPosition: "43% center" }}
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
