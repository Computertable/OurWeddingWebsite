"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Eyebrow } from "./ds";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target: 27 February 2027
    const targetDate = new Date("2027-02-27T00:00:00").getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <section
      aria-label={`${timeLeft.days} days until the wedding`}
      className="ds-surface-dark relative flex h-[240px] w-full items-center justify-center overflow-hidden sm:h-[300px] md:h-[380px]"
    >
      <Image
        src="/images/countdown.JPG"
        alt=""
        fill
        sizes="100vw"
        quality={60}
        className="object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0" style={{ background: "var(--tint-olive)" }} />

      <div className="relative flex w-full flex-col items-center gap-5 px-6" aria-hidden="true">
        <Eyebrow tone="onDark" size="sm">
          Until we say I do
        </Eyebrow>
        <div className="grid w-full max-w-[560px] grid-cols-4 text-center">
          {units.map((u) => (
            <div key={u.label} className="flex flex-col items-center gap-1">
              <span
                className="ds-display ds-display--on-dark ds-numerals"
                style={{ fontSize: "clamp(34px, 7vw, 76px)", fontVariantNumeric: "tabular-nums" }}
              >
                {String(u.value).padStart(2, "0")}
              </span>
              <Eyebrow tone="onDark" size="sm">
                {u.label}
              </Eyebrow>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
