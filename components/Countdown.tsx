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
    <section className="relative flex h-[40vh] min-h-[320px] w-full items-center justify-center overflow-hidden bg-stone-900 md:h-[50vh] md:min-h-[400px]">
      
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/countdown.JPG"
          alt="Countdown Background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 md:bg-black/35" /> 
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        <div className="w-full max-w-[290px] sm:max-w-[360px] md:max-w-[460px] lg:max-w-[540px]">
          
          <div 
            className="whitespace-nowrap text-center text-4xl font-light tracking-tight text-white sm:text-5xl md:text-7xl lg:text-8xl" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            {String(timeLeft.days).padStart(2, '0')}:
            {String(timeLeft.hours).padStart(2, '0')}:
            {String(timeLeft.minutes).padStart(2, '0')}:
            {String(timeLeft.seconds).padStart(2, '0')}
          </div>
          
          <div 
            className="mt-2 flex justify-between px-1 text-[11px] text-white/80 sm:text-xs md:text-base lg:text-lg" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            <span className="w-1/4 text-center">Days</span>
            <span className="w-1/4 text-center">Hours</span>
            <span className="w-1/4 text-center">Minutes</span>
            <span className="w-1/4 text-center">Seconds</span>
          </div>

        </div>

      </div>
    </section>
  );
}