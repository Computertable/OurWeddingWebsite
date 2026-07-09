"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Invitation() {
  return (
    <section className="flex flex-col items-center justify-center bg-[#EFEFE7] py-24 px-6 text-center md:py-32">
      
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="text-[2.75rem] leading-[1.1] tracking-tight text-[#A8A696] md:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Our journey <br /> to forever begins..
      </motion.h2>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative mt-3 mb-3 aspect-[3/4] w-full max-w-[280px] border border-[#2C2B29] bg-stone-200 sm:max-w-[320px] md:max-w-[400px]"
      >
        <Image
          src="/images/invite.PNG"
          alt="couple"
          fill
          className="object-cover"
        />
      </motion.div>

      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-[2.5rem] leading-[1.15] tracking-tight text-[#A8A696] md:text-5xl lg:text-6xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        ...and we want to celebrate <br />
        it <br />
        <span className="italic">with you</span>
      </motion.h3>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-5 max-w-lg text-[12px] uppercase leading-loose tracking-[0.25em] text-[#2C2B29] sm:text-sm"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        We can&apos;t imagine this day without you. <br className="hidden sm:block" />
        Please join us as we begin our next <br className="hidden sm:block" />
        chapter together.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-2.5 text-[2.75rem] tracking-tight text-[#A8A696] md:text-6xl lg:text-7xl"
        style={{ fontFamily: "var(--font-display)" }}
      >
        27<sup className="text-2xl md:text-4xl -top-[0.4em] relative">th</sup> of February 2027
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6 }}
        className="mt-5 flex flex-col items-center"
      >
        <span 
          className="text-[12px] uppercase tracking-[0.25em] text-[#2C2B29] sm:text-sm"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          With love,
        </span>
        
        {/* Names in Script Font */}
        <span 
          className="mt-6 text-5xl text-[#2C2B29] md:text-6xl"
          style={{ fontFamily: "var(--font-script), cursive" }} 
        >
          Pia and JJ
        </span>
      </motion.div>

    </section>
  );
}