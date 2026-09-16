"use client";

import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Eyebrow, Monogram, ENTRANCE } from "./ds";
import { HEADER_HEIGHT, NAV_ITEMS, navHref, type NavItem } from "./navigation";

/**
 * Full-screen menu overlay on the dark garden-green surface.
 * Closes on: link click, click anywhere outside the link list, the Close button, or Escape.
 * Traps focus while open, locks page scroll, and returns focus to the menu button.
 * Motion is a fade plus a vertical 18px rise (the design system never slides horizontally).
 */
export default function SiteMenu({
  open,
  activeId,
  onClose,
  onNavigate,
  returnFocusRef,
}: {
  open: boolean;
  activeId: string;
  onClose: () => void;
  onNavigate: (item: NavItem) => void;
  returnFocusRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Scroll lock + initial focus + focus return
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 30);
    const returnTo = returnFocusRef.current;
    return () => {
      window.clearTimeout(focusTimer);
      root.style.overflow = prevOverflow;
      returnTo?.focus({ preventScroll: true });
    };
  }, [open, returnFocusRef]);

  // Escape + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="ds-surface-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
          onClick={(e) => {
            // Outside click: anything that isn't the link list or the top bar controls.
            const target = e.target as HTMLElement;
            if (!target.closest("[data-menu-keep-open]")) onClose();
          }}
        >
          {/* Top row mirrors the sticky bar so the mark doesn't jump */}
          <div
            className="relative flex shrink-0 items-center justify-between"
            style={{ height: HEADER_HEIGHT, paddingInline: "var(--section-x)" }}
          >
            <Eyebrow size="sm" tone="onDark" className="hidden sm:block">
              02 · 27 · 2027
            </Eyebrow>
            <Monogram
              decorative
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ height: 34, backgroundColor: "var(--text-on-dark)" }}
            />
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="ds-menu-toggle ds-menu-toggle--on-dark ml-auto"
              data-menu-keep-open
            >
              <span className="ds-eyebrow ds-eyebrow--sm">Close</span>
              <span aria-hidden="true" className="ds-close-lines">
                <span />
                <span />
              </span>
            </button>
          </div>

          <nav
            aria-label="Sections"
            className="flex flex-1 items-center justify-center py-12"
            style={{ paddingInline: "var(--section-x)" }}
          >
            <ul className="m-0 flex list-none flex-col items-start gap-1 p-0 sm:gap-2" data-menu-keep-open>
              {NAV_ITEMS.map((item, i) => (
                <motion.li
                  key={item.id}
                  className={item.page && !NAV_ITEMS[i - 1]?.page ? "mt-5 pt-5" : undefined}
                  style={item.page && !NAV_ITEMS[i - 1]?.page ? { borderTop: "var(--border-on-dark)" } : undefined}
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reduceMotion ? 0.2 : 0.72, delay: reduceMotion ? 0 : 0.06 + i * 0.045, ease: ENTRANCE }}
                >
                  <a
                    href={navHref(item)}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className="ds-menu-link"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onNavigate(item);
                    }}
                  >
                    <span className="ds-menu-link__index" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 pb-8 text-center" style={{ paddingInline: "var(--section-x)" }}>
            <Eyebrow size="sm" tone="onDark">
              Taguig, Philippines
            </Eyebrow>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
