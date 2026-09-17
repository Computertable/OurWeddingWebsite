"use client";

import { Monogram } from "./ds";

/**
 * The monogram seal: J&S mark inside a ring reading
 * "SOFIA & JOSHUA · FEBRUARY 27, 2027". Built from the supplied monogram PNG (as a CSS mask,
 * so it takes design-system colour) plus live SVG text, so it stays crisp at any size and the
 * ring can fade independently of the mark during the scroll transition.
 */
export const SEAL_MONOGRAM_RATIO = 0.54; // monogram height as a fraction of the seal size

export function SealRing({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible", ...style }}
    >
      <defs>
        {/* Top arc: text sits outside the path, reading left to right over the top */}
        <path id="seal-arc-top" d="M 36 200 A 164 164 0 0 1 364 200" fill="none" />
        {/* Bottom arc: drawn counter-clockwise so the text reads upright along the bottom */}
        <path id="seal-arc-bottom" d="M 18 200 A 182 182 0 0 0 382 200" fill="none" />
      </defs>
      <g
        fill="var(--rose-300)"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 30,
          letterSpacing: "0.32em",
          fontWeight: 400,
        }}
      >
        <text textAnchor="middle">
          <textPath href="#seal-arc-top" startOffset="50%">
            SOFIA &amp; JOSHUA
          </textPath>
        </text>
        <text textAnchor="middle">
          <textPath href="#seal-arc-bottom" startOffset="50%">
            FEBRUARY 27, 2027
          </textPath>
        </text>
        <circle cx="12" cy="200" r="4" />
        <circle cx="388" cy="200" r="4" />
      </g>
    </svg>
  );
}

export function Seal({ size, tone = "ink" }: { size: number; tone?: "ink" | "onDark" }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <SealRing className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 flex items-center justify-center">
        <Monogram
          label="Sofia and Joshua, February 27, 2027"
          style={{
            height: size * SEAL_MONOGRAM_RATIO,
            backgroundColor: tone === "onDark" ? "var(--text-on-dark)" : "var(--text-display)",
          }}
        />
      </div>
    </div>
  );
}
