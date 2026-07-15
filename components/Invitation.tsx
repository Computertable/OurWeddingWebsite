"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Invitation() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], ["0vh", "-110vh"]);
  const photoX = useTransform(scrollYProgress, [0, 1], ["-2vw", "-15vw"]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], ["-10deg", "-25deg"]);
  const photoShadow = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0px 20px 40px rgba(44,43,41,0.15)", "0px 40px 60px rgba(44,43,41,0.3)"]
  );

  const letterScale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const letterRotate = useTransform(scrollYProgress, [0, 1], ["4deg", "0deg"]);
  const letterOpacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#EAE5DB]">
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden px-5 sm:px-8">

        <motion.div
          style={{ 
            scale: letterScale, 
            rotate: letterRotate, 
            opacity: letterOpacity,
            boxShadow: "0px 25px 50px rgba(44,43,41,0.1)"
          }}
          className="absolute z-10 flex w-full max-w-[340px] flex-col justify-between bg-[#FCFBF7] p-6 sm:max-w-[420px] sm:p-10 aspect-[3/4] border border-[#2C2B29]/10"
        >
          <div className="absolute top-6 right-6 flex w-12 h-14 border border-dashed border-[#A8A696]/60 flex-col items-center justify-center text-[7px] uppercase tracking-[0.2em] text-[#A8A696] rotate-12">
            <span>Feb</span>
            <span className="text-[10px] font-semibold my-0.5">27</span>
            <span>2027</span>
          </div>

<div className="mt-4 space-y-5 pr-12">
  <span
    className="text-[9px] uppercase tracking-[0.35em] text-[#A8A696]"
    style={{ fontFamily: "var(--font-sans)" }}
  >
    Invitation
  </span>

  <h2
    className="text-3xl leading-[1.1] tracking-tight text-[#2C2B29] sm:text-4xl"
    style={{ fontFamily: "var(--font-display)" }}
  >
    Every love story
    <br />
    begins with a moment...
  </h2>
</div>

<div className="space-y-5">
  <h3
    className="text-xl leading-relaxed tracking-tight text-[#A8A696] sm:text-2xl"
    style={{ fontFamily: "var(--font-display)" }}
  >
    Ours has led us here,
    <br />
    to a day we&apos;ve always dreamed of.
  </h3>

  <p
    className="text-sm leading-relaxed text-[#2C2B29]/75 sm:text-base"
    style={{ fontFamily: "var(--font-display)" }}
  >
    We would be honored to celebrate
    <br />
    this beautiful beginning with you.
  </p>
</div>

          <div className="mt-4 pt-4 border-t border-[#2C2B29]/10 flex flex-col items-start">
            <span 
              className="text-[9px] uppercase tracking-[0.25em] text-[#2C2B29]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              With love,
            </span>
            <span 
              className="mt-2 text-4xl text-[#2C2B29] sm:text-5xl"
              style={{ fontFamily: "var(--font-script), cursive" }} 
            >
              Pia and JJ
            </span>
          </div>
        </motion.div>


        <motion.div
          style={{ 
            y: photoY, 
            x: photoX, 
            rotate: photoRotate,
            boxShadow: photoShadow
          }}
          className="absolute z-20 w-full max-w-[340px] bg-[#FCFBF7] p-3 sm:max-w-[420px] sm:p-5 aspect-[3/4] border border-[#2C2B29]/10 transform-gpu"
        >
          <div className="relative w-full h-full border border-[#2C2B29]/10 overflow-hidden">
            <Image
              src="/images/invite.PNG"
              alt="Pia and JJ"
              fill
              priority
              className="object-cover"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}