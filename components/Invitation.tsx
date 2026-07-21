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

  const photoY = useTransform(scrollYProgress, [0, 1], ["0vh", "-82vh"]);
  const photoX = useTransform(scrollYProgress, [0, 1], ["-2vw", "-10vw"]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], ["-6deg", "-14deg"]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.62, 0.86], [1, 1, 0]);

  const cardScale = useTransform(scrollYProgress, [0, 0.75], [0.96, 1]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.75], ["2deg", "0deg"]);

  return (
    <section ref={containerRef} className="relative h-[240vh] bg-[#e9e1d5]">
      <div className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden px-5">
        <motion.article
          style={{
            scale: cardScale,
            rotate: cardRotate,
            boxShadow: "0 28px 80px rgba(44, 43, 41, 0.12)",
          }}
          className="relative z-10 w-full max-w-[360px] overflow-hidden bg-[#fffaf2] p-6 text-[#2f2b26] ring-1 ring-[#2f2b26]/10 sm:max-w-[460px] sm:p-8 md:aspect-[4/5.25]"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.045] bg-[linear-gradient(rgba(47,43,38,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(47,43,38,0.8)_1px,transparent_1px)] bg-[size:5px_5px]" />

          <div className="relative flex h-full min-h-[500px] flex-col justify-between md:min-h-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-[0.36em] text-[#8a7657]">
                  Postcard
                </p>

                <p className="mt-2 font-serif text-sm italic text-[#6f685d]">
                  from our story to yours
                </p>
              </div>

              <div className="flex h-14 w-12 items-center justify-center border border-dashed border-[#8a7657]/45 text-center rotate-12">
                <span className="font-serif text-[9px] uppercase leading-4 tracking-[0.18em] text-[#8a7657]">
                  Feb
                  <br />
                  27
                </span>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-serif text-xl leading-7 text-[#2f2b26]">
                Dear family and friends,
              </p>

              <p className="mt-5 font-serif text-[15px] leading-7 text-[#5f594f]">
                We are getting married, and it would mean the world to have you
                with us as we begin this next chapter.
              </p>

              <p className="mt-5 font-serif text-[15px] leading-7 text-[#5f594f]">
                Come celebrate a day of love, music, laughter, and the little
                moments we hope to remember for the rest of our lives.
              </p>

              <p className="mt-6 font-script text-2xl text-[#8a7657]">
                JJ & Pia
              </p>
            </div>

            <div className="mt-8 border-t border-[#2f2b26]/12 pt-5">
              <p className="font-sans text-[9px] uppercase tracking-[0.32em] text-[#8a7657]">
                Save the Date
              </p>

              <p className="mt-3 font-serif text-xl tracking-[0.16em] text-[#2f2b26]">
                02 . 27 . 2027
              </p>

            </div>
          </div>
        </motion.article>

        <motion.div
          style={{
            y: photoY,
            x: photoX,
            rotate: photoRotate,
            opacity: photoOpacity,
            boxShadow: "0 26px 70px rgba(44, 43, 41, 0.18)",
          }}
          className="absolute z-20 w-full max-w-[310px] bg-[#fffaf2] p-4 pb-12 ring-1 ring-[#2f2b26]/10 sm:max-w-[360px] sm:p-5 sm:pb-14"
        >
          <div className="relative aspect-square w-full overflow-hidden bg-[#d8d0c4]">
            <Image
              src="/images/invite.PNG"
              alt="Sofia and JJ"
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