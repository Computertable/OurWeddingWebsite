"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const ref = useRef(null);
  
  // Creates a subtle parallax effect for the background image on scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      ref={ref} 
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-stone-900"
    >
      <motion.div 
        style={{ y: backgroundY }} 
        className="absolute inset-0 z-0 h-full w-full"
      >
        <Image
          src="/hero-couple.JPG"
          alt="Oliver and Rachel in Tuscany"
          fill
          priority
          className="object-cover opacity-80"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-4 z-10 border-2 border-white/70 md:inset-8" />

      <div className="relative z-20 flex flex-col items-center justify-center px-4 text-center text-white drop-shadow-lg">
        
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="mb-2 text-4xl md:mb-4 md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          The Wedding of
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
          className=" mb-6 flex items-center justify-center gap-4 md:mb-8 md:gap-8"
        >
          <h1 
            className="text-6xl tracking-tight md:text-8xl lg:text-9xl" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            Sofia
          </h1>
          
          <span 
            className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/90 md:mt-4 md:text-xs" 
            style={{ fontFamily: "var(--font-sans)" }}
          >
            and
          </span>
          
          <h1 
            className="text-6xl tracking-tight md:text-8xl lg:text-9xl" 
            style={{ fontFamily: "var(--font-display)" }}
          >
            Joshua
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2, ease: "easeOut" }}
          className="text-2xl md:text-3xl lg:text-4xl tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Taguig, Philippines <span className="mx-2 font-sans text-sm md:mx-3 tracking-tight">&bull;</span> 27 Feb 2027
        </motion.p>
        
      </div>
    </section>
  );
}