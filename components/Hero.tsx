"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  
  // Subtle parallax effect for the background image
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section id="hero"
      ref={ref} 
      className="relative flex h-screen w-full flex-col justify-between overflow-hidden bg-stone-900 py-16 px-6 text-center text-white md:py-24"
    >
      {/* Background Image Layer */}
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/hero-couple.JPG"
          alt="Sofia and Joshua"
          fill
          priority
          className="object-cover opacity-75"
        />
        {/* Soft overlay gradient to ensure text readability */}
        <div className="absolute inset-0 bg-black/25" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="relative z-20 text-md uppercase tracking-[0.4em] text-white/90 sm:text-md"
        style={{ fontFamily: "var(--font-display)" }}
      >
        The Wedding Of
      </motion.div>

      {/* 2. CENTER SECTION: Flowing Cursive Names */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        className="relative z-20 my-auto select-none"
      >
        <h1 
          className="text-7xl font-light tracking-normal text-white drop-shadow-sm sm:text-7xl md:text-8xl lg:text-8xl" 
          style={{ fontFamily: "var(--font-script)" }}
        >
          Sofia & Joshua
        </h1>
      </motion.div>

      {/* 3. BOTTOM SECTION: Tracked Location & Date */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center gap-2 text-[14px] uppercase tracking-[0.35em] text-white/90 sm:text-sm"
        style={{ fontFamily: "var(--font-display)" }}
      >
        <span>Taguig, Philippines</span>
        <span className="text-[14px] opacity-40 tracking-normal">•</span>
        <span>February 27, 2027</span>
      </motion.div>
      
    </section>
  );
}