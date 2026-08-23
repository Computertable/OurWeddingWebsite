"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
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

  return (
    /* 
      FIX 1: Changed heights from vh/min-h to clean explicit heights (h-[180px]).
      This forces a perfect horizontal landscape rectangle ratio on mobile devices.
      Also updated fallback background color to match your dark olive green vibe (#2B3222).
    */
    <section className="relative flex h-[185px] w-full items-center justify-center overflow-hidden bg-[#2B3222] sm:h-[240px] md:h-[320px] lg:h-[380px]">

      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/countdown.JPG"
          alt="Countdown Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45 md:bg-black/35" />
      </div>

      {/* Content Layer */}
      <div className="relative z-10 flex w-full flex-col items-center px-6">

        {/* 
          FIX 2: Increased mobile max-width from 290px to 320px.
          This gives the text columns room to sit nicely without compressing labels.
        */}
        {/* Countdown */}
       <div className="w-full max-w-[250px] sm:max-w-[360px] md:max-w-[480px]">

          {/* Numbers */}
          <div
            className="grid grid-cols-4 text-center text-3xl font-light tracking-tight text-[#F9F9F6] sm:text-5xl md:text-7xl lg:text-8xl"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>{String(timeLeft.days).padStart(2, "0")}</span>
            <span>{String(timeLeft.hours).padStart(2, "0")}</span>
            <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
            <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
          </div>

          {/* Labels */}
          <div
            className="mt-1 grid grid-cols-4 text-center text-[8px] uppercase tracking-[0.08em] text-[#F9F9F6]/70 sm:text-xs md:text-base"
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span>Days</span>
            <span>Hours</span>
            <span>Mins</span>
            <span>Secs</span>
          </div>

        </div>

      </div>
    </section>
  );
}