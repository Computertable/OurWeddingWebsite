"use client";

/**
 * Sofia & Joshua Design System — React primitives.
 * TypeScript ports of the design system package components (core / forms / content).
 * Styling lives in app/design-system/components.css; these only compose class names.
 */

import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

type Tone = "ink" | "onDark";

/* ---------- Eyebrow ---------- */
export function Eyebrow({
  children,
  tone = "ink",
  size = "md",
  as: Tag = "p",
  className,
  ...rest
}: {
  children: ReactNode;
  tone?: Tone | "accent" | "soft";
  size?: "md" | "sm";
  as?: ElementType;
  className?: string;
} & Record<string, unknown>) {
  return (
    <Tag
      {...rest}
      className={cx(
        "ds-eyebrow",
        size === "sm" && "ds-eyebrow--sm",
        tone === "onDark" && "ds-eyebrow--on-dark",
        tone === "accent" && "ds-eyebrow--accent",
        tone === "soft" && "ds-eyebrow--soft",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- DisplayHeading ---------- */
export function DisplayHeading({
  children,
  size = "lg",
  tone = "ink",
  italic = true,
  as: Tag = "h2",
  className,
  ...rest
}: {
  children: ReactNode;
  size?: "xl" | "lg" | "md";
  tone?: Tone;
  italic?: boolean;
  as?: ElementType;
  className?: string;
} & Record<string, unknown>) {
  return (
    <Tag
      {...rest}
      className={cx(
        "ds-display",
        `ds-display--${size}`,
        !italic && "ds-display--roman",
        tone === "onDark" && "ds-display--on-dark",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ---------- Button ---------- */
type ButtonOwnProps = {
  variant?: "solid" | "outline" | "text";
  size?: "sm" | "md" | "lg";
  tone?: Tone;
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonOwnProps & ComponentPropsWithoutRef<"button">
>(function Button({ variant = "solid", size = "md", tone = "ink", className, type = "button", ...rest }, ref) {
  return (
    <button
      ref={ref}
      type={type}
      {...rest}
      className={buttonClass({ variant, size, tone }, className)}
    />
  );
});

export function ButtonLink({
  variant = "solid",
  size = "md",
  tone = "ink",
  className,
  ...rest
}: ButtonOwnProps & ComponentPropsWithoutRef<"a">) {
  return <a {...rest} className={buttonClass({ variant, size, tone }, className)} />;
}

function buttonClass({ variant, size, tone }: Required<ButtonOwnProps>, className?: string) {
  return cx(
    "ds-btn",
    `ds-btn--${variant}`,
    size !== "md" && `ds-btn--${size}`,
    tone === "onDark" && "ds-btn--on-dark",
    className
  );
}

/* ---------- Divider ---------- */
export function Divider({
  tone = "ink",
  ornament = false,
  className,
}: {
  tone?: Tone;
  ornament?: boolean;
  className?: string;
}) {
  if (!ornament) {
    return <hr className={cx("ds-divider", tone === "onDark" && "ds-divider--on-dark", className)} />;
  }
  return (
    <div
      role="separator"
      className={cx("ds-ornament", tone === "onDark" && "ds-ornament--on-dark", className)}
    >
      <span aria-hidden="true">&#10022;</span>
    </div>
  );
}

/* ---------- TextField ---------- */
export function TextField({
  label,
  hint,
  id,
  className,
  ...rest
}: {
  label: string;
  hint?: string;
  className?: string;
} & ComponentPropsWithoutRef<"input">) {
  const autoId = useId();
  const fieldId = id ?? `field-${autoId}`;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  return (
    <div className={cx("ds-field", className)}>
      <label htmlFor={fieldId} className="ds-field__label">
        {label}
      </label>
      <input id={fieldId} aria-describedby={hintId} className="ds-field__control" {...rest} />
      {hint ? (
        <span id={hintId} className="ds-field__hint">
          {hint}
        </span>
      ) : null}
    </div>
  );
}

/* ---------- ChoiceGroup (single select, radio semantics) ---------- */
export function ChoiceGroup<T extends string | boolean>({
  labelledBy,
  options,
  value,
  onChange,
  className,
}: {
  labelledBy: string;
  options: Array<{ value: T; label: string }>;
  value: T | null;
  onChange: (value: T) => void;
  className?: string;
}) {
  return (
    <div role="radiogroup" aria-labelledby={labelledBy} className={cx("ds-choice", className)}>
      {options.map((opt) => {
        const checked = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={checked}
            onClick={() => onChange(opt.value)}
            className="ds-choice__option"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- NotePanel ---------- */
export function NotePanel({
  children,
  tone = "cream",
  className,
  ...rest
}: {
  children: ReactNode;
  tone?: "cream" | "olive" | "dark" | "outline";
  className?: string;
} & Record<string, unknown>) {
  return (
    <div {...rest} className={cx("ds-note", `ds-note--${tone}`, className)}>
      {children}
    </div>
  );
}

/* ---------- DetailList ---------- */
export function DetailList({
  items,
  className,
}: {
  items: Array<{ term: string; description: ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cx("ds-details", className)}>
      {items.map((it) => (
        <div key={it.term} className="flex flex-col gap-1">
          <dt>{it.term}</dt>
          <dd>{it.description}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Monogram ---------- */
export function Monogram({
  className,
  style,
  label = "Sofia and Joshua monogram",
  decorative = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  decorative?: boolean;
}) {
  return (
    <span
      className={cx("ds-monogram", className)}
      style={style}
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": label })}
    />
  );
}

/* ---------- Reveal: the one entrance motion (fade + rise 18px, 1100ms) ---------- */
const ENTRANCE: [number, number, number, number] = [0.16, 0.84, 0.44, 1];

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: ENTRANCE }}
    >
      {children}
    </motion.div>
  );
}

export { ENTRANCE };
