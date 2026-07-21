"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";

export default function StorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTrack, setActiveTrack] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.125) setActiveTrack(0);
    else if (latest >= 0.125 && latest < 0.25) setActiveTrack(1);
    else if (latest >= 0.25 && latest < 0.375) setActiveTrack(2);
    else if (latest >= 0.375 && latest < 0.5) setActiveTrack(3);
    else if (latest >= 0.5 && latest < 0.625) setActiveTrack(4);
    else if (latest >= 0.625 && latest < 0.75) setActiveTrack(5);
    else if (latest >= 0.75 && latest < 0.875) setActiveTrack(6);
    else setActiveTrack(7);
  });

  const y1 = useTransform(scrollYProgress, [0.00, 0.16], ["0vh", "-120vh"]);
  const y2 = useTransform(scrollYProgress, [0.00, 0.12, 0.26], ["100vh", "0vh", "-120vh"]);
  const y3 = useTransform(scrollYProgress, [0.08, 0.22, 0.36], ["100vh", "0vh", "-120vh"]);
  const y4 = useTransform(scrollYProgress, [0.18, 0.32, 0.46], ["100vh", "0vh", "-120vh"]);
  const y5 = useTransform(scrollYProgress, [0.28, 0.42, 0.56], ["100vh", "0vh", "-120vh"]);
  const y6 = useTransform(scrollYProgress, [0.38, 0.52, 0.66], ["100vh", "0vh", "-120vh"]);
  const y7 = useTransform(scrollYProgress, [0.46, 0.60, 0.74], ["100vh", "0vh", "-120vh"]);
  const y8 = useTransform(scrollYProgress, [0.54, 0.68, 0.82], ["100vh", "0vh", "-120vh"]);
  const y9 = useTransform(scrollYProgress, [0.62, 0.76, 0.88], ["100vh", "0vh", "-120vh"]);
  const y10 = useTransform(scrollYProgress, [0.70, 0.82, 0.94], ["100vh", "0vh", "-120vh"]);
  const y11 = useTransform(scrollYProgress, [0.78, 0.88, 0.98], ["100vh", "0vh", "-120vh"]);
  const y12 = useTransform(scrollYProgress, [0.84, 0.96], ["100vh", "0vh"]);

  const arrowRotate = useTransform(scrollYProgress, [0, 0.88], [0, 180]);

  const handleButtonClick = () => {
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

const stories = [
  "They say the sun shines on everyone, but for these two, it shone brightest at Sun Life, where their paths first crossed as colleagues.",
  "It wasn't until Pia's final days with the company that deep conversations revealed an effortless connection neither expected.",
  "When Pia took a leap of faith and moved to Malaysia to build a better future, JJ found himself beginning a new chapter in Singapore.",
  "Suddenly, being together meant bus rides, border crossings, late-night video calls, and learning how to love across the miles.",
  "But distance never stopped them from making memories together, turning every reunion into another adventure worth remembering.",
  "Their love story became a whirlwind of new places, shared experiences, and memories made across the world.",
  "Then came February 20, 2026. On Pia's birthday, beneath the winter skies of Seoul, JJ asked the question that would change everything.",
  "And with one heartfelt 'Yes,' their story entered its most beautiful chapter yet, a lifetime of choosing each other wherever life may lead."
];

  return (
    <div ref={containerRef} className="relative h-[550vh] md:h-[700vh] bg-[#2B3222]">
      
      <div className="sticky top-0 flex h-[100dvh] w-full flex-col justify-between overflow-hidden py-10 px-6 text-[#F9F9F6]">
        
        <div className="relative z-30 flex justify-center">
          <button
            onClick={handleButtonClick}
            className="group flex items-center gap-3 border border-[#F9F9F6]/20 bg-[#2B3222]/80 backdrop-blur-md px-6 py-3 text-xs uppercase tracking-[0.25em] text-[#F9F9F6]/80 transition-all hover:border-[#F9F9F6] hover:text-[#F9F9F6]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span>Our Story</span>
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ rotate: arrowRotate }}
              className="stroke-current"
            >
              <path d="M2 4L6 8L10 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </motion.svg>
          </button>
        </div>

        <div className="absolute inset-0 z-10 pointer-events-none select-none">
          
          {/* Photo 1: Left */}
          <motion.div style={{ y: y1 }} className="transform-gpu absolute left-[3%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[8%]">
            <Image src="/images/story--1.JPG" alt="Memory 1" fill className="object-cover" />
          </motion.div>

          {/* Photo 2: Right */}
          <motion.div style={{ y: y2 }} className="transform-gpu absolute right-[2%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[6%]">
            <Image src="/images/story--2.JPG" alt="Memory 2" fill className="object-cover" />
          </motion.div>

          {/* Photo 3: Left */}
          <motion.div style={{ y: y3 }} className="transform-gpu absolute left-[2%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[6%]">
            <Image src="/images/story-3.jpeg" alt="Memory 3" fill className="object-cover" />
          </motion.div>

          {/* Photo 4: Right */}
          <motion.div style={{ y: y4 }} className="transform-gpu absolute right-[4%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[9%]">
            <Image src="/images/story--4.jpg" alt="Memory 4" fill className="object-cover" />
          </motion.div>

          {/* Photo 5: Left */}
          <motion.div style={{ y: y5 }} className="transform-gpu absolute left-[4%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[9%]">
            <Image src="/images/story-5.jpeg" alt="Memory 5" fill className="object-cover" />
          </motion.div>

          {/* Photo 6: Right */}
          <motion.div style={{ y: y6 }} className="transform-gpu absolute right-[1%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[5%]">
            <Image src="/images/story--6.jpg" alt="Memory 6" fill className="object-cover" />
          </motion.div>

          {/* Photo 7: Left */}
          <motion.div style={{ y: y7 }} className="transform-gpu absolute left-[1%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[5%]">
            <Image src="/images/story-7.jpeg" alt="Memory 7" fill className="object-cover" />
          </motion.div>

          {/* Photo 8: Right */}
          <motion.div style={{ y: y8 }} className="transform-gpu absolute right-[3%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[8%]">
            <Image src="/images/story-8.jpeg" alt="Memory 8" fill className="object-cover" />
          </motion.div>

          {/* Photo 9: Left */}
          <motion.div style={{ y: y9 }} className="transform-gpu absolute left-[3%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[7%]">
            <Image src="/images/story-9.jpeg" alt="Memory 9" fill className="object-cover" />
          </motion.div>

          {/* Photo 10: Right */}
          <motion.div style={{ y: y10 }} className="transform-gpu absolute right-[2%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[6%]">
            <Image src="/images/story--10.JPG" alt="Memory 10" fill className="object-cover" />
          </motion.div>

          {/* Photo 11: Left */}
          <motion.div style={{ y: y11 }} className="transform-gpu absolute left-[2%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:left-[6%]">
            <Image src="/images/story-11.jpeg" alt="Memory 11" fill className="object-cover" />
          </motion.div>

          {/* Photo 12: Right */}
          <motion.div style={{ y: y12 }} className="transform-gpu absolute right-[4%] top-[16%] h-[270px] w-[43vw] border border-[#F9F9F6]/10 opacity-[0.22] sm:w-60 sm:h-84 md:w-[340px] md:h-[480px] md:right-[8%]">
            <Image src="/images/story--12.JPG" alt="Memory 12" fill className="object-cover" />
          </motion.div>

        </div>

        {/* LOCKED CLEAN TEXT COLUMN */}
        <div className="relative z-20 mx-auto flex w-full max-w-[320px] sm:max-w-xl items-center justify-center text-center my-auto px-1 h-[320px]">
          <div className="relative w-full h-full flex items-center justify-center">
            
            <AnimatePresence mode="wait">
              <motion.p
                key={activeTrack}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.52, ease: "easeInOut" }}
                className="absolute text-xl sm:text-2xl font-light leading-relaxed tracking-wide md:text-3xl lg:text-4xl drop-shadow-[0_2px_8px_rgba(43,50,34,0.4)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stories[activeTrack]}
              </motion.p>
            </AnimatePresence>

          </div>
        </div>


        <div className="absolute right-4 bottom-8 z-30 flex flex-col gap-2 sm:right-6 sm:bottom-10">
          
          <button
            onClick={() => scrollToSection("hero")}
            className="flex h-10 w-10 items-center justify-center border border-[#F9F9F6]/20 bg-[#2B3222]/80 pb-0.5 text-xl font-light text-[#F9F9F6]/80 backdrop-blur-md transition-all duration-300 hover:border-[#F9F9F6] hover:bg-[#F9F9F6] hover:text-[#2B3222] active:scale-95"
            aria-label="Scroll to Hero"
          >
            ↑
          </button>

          <button
            onClick={() => scrollToSection("rsvp")}
            className="flex h-10 w-10 items-center justify-center border border-[#F9F9F6]/20 bg-[#2B3222]/80 pt-0.5 text-xl font-light text-[#F9F9F6]/80 backdrop-blur-md transition-all duration-300 hover:border-[#F9F9F6] hover:bg-[#F9F9F6] hover:text-[#2B3222] active:scale-95"
            aria-label="Scroll to RSVP"
          >
            ↓
          </button>

        </div>

        <div className="h-4 w-full" />

      </div>
    </div>
  );
}