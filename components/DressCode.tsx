"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const palette = [
  { name: "Olive", color: "#7b8654" },
  { name: "Dusty Rose", color: "#c9938e" },
  { name: "Peach", color: "#efb990" },
  { name: "Espresso", color: "#4a3529" },
];

export default function DressCode() {
  return (
    <section className="bg-[#f8f1e7] px-5 py-24 text-[#2f2b26] md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid overflow-hidden border border-[#2f2b26]/15 bg-[#fffaf2] md:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="relative min-h-[420px] bg-[#e9e1d5] md:min-h-[640px]">
            <Image
              src="/images/guest-color.png"
              alt="Wedding guest dress code color guide"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center px-7 py-12 text-center md:px-12 md:py-16">
            <p className="font-sans text-[10px] uppercase tracking-[0.46em] text-[#8a7657]">
              Attire
            </p>

            <h2 className="mt-6 font-serif text-6xl leading-none text-[#2f2b26] md:text-8xl">
              Dress Code
            </h2>

            <p className="mt-3 font-script text-4xl text-[#8a7657] md:text-5xl">
              Strictly Formal
            </p>

            <div className="mx-auto mt-8 h-px w-24 bg-[#b9976b]/70" />

            <div className="mx-auto mt-9 max-w-md space-y-4">
              <p className="font-serif text-xl leading-8 text-[#4f493f]">
                We invite our guests to dress in formal attire, Barong and black pants for gentlemen. Long dress or formal attire for ladies.
              </p>

            </div>

            <div className="mt-10">
              <p className="font-sans text-[10px] uppercase tracking-[0.34em] text-[#8a7657]">
                Suggested Colors
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {palette.map((item) => (
                  <div key={item.name} className="flex flex-col items-center gap-2">
                    <span
                      className="h-9 w-9 rounded-full border border-[#2f2b26]/10"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#6f685d]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mx-auto mt-10 max-w-sm font-serif text-sm italic leading-6 text-[#7a7569]">
              Kindly avoid white, ivory, and overly casual attire.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}