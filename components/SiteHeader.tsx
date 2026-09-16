"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { Eyebrow, Monogram } from "./ds";
import { SealRing, SEAL_MONOGRAM_RATIO } from "./Seal";
import SiteMenu from "./SiteMenu";
import { usePathname, useRouter } from "next/navigation";
import { HEADER_HEIGHT, NAV_ITEMS, scrollToSection, type NavItem } from "./navigation";

/**
 * Landing seal → sticky top bar.
 *
 * One fixed element carries the monogram the whole way: on load it is the large seal centred in
 * the hero; as you scroll through the first ~55% of the viewport it glides up and scales down
 * into the centre of the top bar, while the ring text fades out and the bar + menu button fade in.
 *
 * Everything is a continuous function of scroll position (smoothed by an overdamped spring, so no
 * overshoot), which is why fast or slow scrolling can't make it flicker or double-trigger.
 * The only boolean — whether the bar is interactive — uses hysteresis (on at 90%, off at 75%).
 */

const TRANSITION_DISTANCE = 0.55; // fraction of viewport height to complete the morph
const MARK_HEIGHT = 34; // px, monogram height once it sits in the bar

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function SiteHeader({ variant = "landing" }: { variant?: "landing" | "page" }) {
  const isPage = variant === "page";
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion() ?? false;
  const { scrollY } = useScroll();

  // Viewport metrics as motion values so transforms update without re-rendering.
  const viewportH = useMotionValue(800);
  const sealSize = useMotionValue(360);
  const [measured, setMeasured] = useState(false);
  const [sealPx, setSealPx] = useState(360);

  useEffect(() => {
    let lastW = 0;
    let lastH = 0;
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // Ignore small height changes from mobile browser toolbars showing/hiding;
      // re-measuring on those would make the seal jump mid-scroll.
      if (lastH && w === lastW && Math.abs(h - lastH) < 120) return;
      lastW = w;
      lastH = h;
      const size = Math.round(Math.min(Math.min(w, h) * 0.62, 440));
      viewportH.set(h);
      sealSize.set(size);
      setSealPx(size);
      setMeasured(true);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [viewportH, sealSize]);

  const rawProgress = useTransform([scrollY, viewportH], ([y, h]: number[]) =>
    clamp01(y / (h * TRANSITION_DISTANCE))
  );
  // Critically/over-damped: smooths wheel "jumps" without bounce.
  const smoothProgress = useSpring(rawProgress, { stiffness: 210, damping: 36, mass: 0.5, restDelta: 0.0005 });
  const progress = reduceMotion ? rawProgress : smoothProgress;

  // Seal geometry (full motion)
  const sealY = useTransform([progress, viewportH, sealSize], ([p, h, s]: number[]) =>
    lerp(h * 0.5, HEADER_HEIGHT / 2, easeInOutCubic(p)) - s / 2
  );
  const sealScale = useTransform([progress, sealSize], ([p, s]: number[]) =>
    lerp(1, MARK_HEIGHT / (s * SEAL_MONOGRAM_RATIO), easeInOutCubic(p))
  );
  const ringOpacity = useTransform(progress, [0, 0.45], [1, 0]);
  const ringRotate = useTransform(progress, [0, 1], [0, -18]);

  // Reduced motion: no movement, the seal simply cross-fades with the bar's static mark.
  const staticSealY = useTransform([viewportH, sealSize], ([h, s]: number[]) => h * 0.5 - s / 2);
  const reducedSealOpacity = useTransform(progress, [0, 0.5], [1, 0]);

  const barOpacity = useTransform(progress, [0.55, 1], [0, 1]);
  const controlsOpacity = useTransform(progress, [0.7, 1], [0, 1]);

  // Interactive state with hysteresis.
  const [barActive, setBarActive] = useState(false);
  const barActiveRef = useRef(false);
  useMotionValueEvent(progress, "change", (p) => {
    if (!barActiveRef.current && p >= 0.9) {
      barActiveRef.current = true;
      setBarActive(true);
    } else if (barActiveRef.current && p <= 0.75) {
      barActiveRef.current = false;
      setBarActive(false);
    }
  });

  // Menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeSection = useActiveSection();

  const handleNavigate = (item: NavItem) => {
    setMenuOpen(false);
    if (item.page) {
      router.push(item.page);
      return;
    }
    if (pathname !== "/") {
      router.push(item.id === "top" ? "/" : `/#${item.id}`);
      return;
    }
    // Wait for the scroll lock to release before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => scrollToSection(item.id, reduceMotion)));
  };
  const barOn = isPage || barActive;
  const activeId = isPage ? NAV_ITEMS.find((i) => i.page === pathname)?.id ?? "" : activeSection;

  return (
    <>
      {/* The seal / mark */}
      {!isPage && measured && (
        <motion.div
          aria-hidden={barActive ? true : undefined}
          className="pointer-events-none fixed left-1/2 top-0 z-50"
          style={{
            width: sealPx,
            height: sealPx,
            x: "-50%",
            y: reduceMotion ? staticSealY : sealY,
            scale: reduceMotion ? 1 : sealScale,
            opacity: reduceMotion ? reducedSealOpacity : 1,
            transformOrigin: "50% 50%",
          }}
        >
          <div className="ds-rise absolute inset-0">
            <motion.div
              className="absolute inset-0"
              style={{ opacity: ringOpacity, rotate: reduceMotion ? 0 : ringRotate }}
            >
              <SealRing className="h-full w-full" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Monogram
                label="Sofia and Joshua, February 27, 2027"
                style={{ height: sealPx * SEAL_MONOGRAM_RATIO }}
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Sticky top bar */}
      <header
        inert={!barOn}
        className="fixed inset-x-0 top-0 z-40"
        style={{ height: HEADER_HEIGHT }}
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            opacity: isPage ? 1 : barOpacity,
            background: "var(--surface-page)",
            borderBottom: "var(--border-hairline)",
          }}
        />
        <motion.div
          className="relative mx-auto flex h-full items-center justify-between"
          style={{ opacity: isPage ? 1 : controlsOpacity, paddingInline: "var(--section-x)" }}
        >
          <Eyebrow size="sm" tone="soft" className="hidden sm:block">
            02 · 27 · 2027
          </Eyebrow>

          {/* Back to top: sits exactly under the morphed mark */}
          <button
            type="button"
            onClick={() => (isPage ? router.push("/") : scrollToSection("top", reduceMotion))}
            aria-label={isPage ? "Back to the invitation" : "Back to top"}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{ borderRadius: "var(--radius-xs)" }}
          >
            {(reduceMotion || isPage) && <Monogram decorative style={{ height: MARK_HEIGHT }} />}
          </button>

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className="ds-menu-toggle ml-auto"
          >
            <span className="ds-eyebrow ds-eyebrow--sm">Menu</span>
            <span aria-hidden="true" className="ds-menu-toggle__lines">
              <span />
              <span />
            </span>
          </button>
        </motion.div>
      </header>

      <SiteMenu
        open={menuOpen}
        activeId={activeId}
        onClose={() => setMenuOpen(false)}
        onNavigate={handleNavigate}
        returnFocusRef={menuButtonRef}
      />
    </>
  );
}

/** Tracks which section is in the middle of the viewport, for aria-current in the menu. */
function useActiveSection() {
  const [active, setActive] = useState<string>("top");
  useEffect(() => {
    const els = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}
