"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const storyEvents = [
  {
    date: "Before Us",
    title: "It Started at Sun Life",
    body: "We first met as colleagues at Sun Life. At the time, we were simply two people pursuing our own careers, unaware that life was quietly preparing our paths to cross again.",
    image: "/images/story/sun-life.jpg",
    align: "left",
  },
  {
    date: "Dec 15, 2023",
    title: "Long Distance, One Decision",
    body: "As first-time expats living in different countries, Sofia in Malaysia and JJ in Singapore, we learned how to make every visit count. Distance was not always easy, but it taught us to choose each other again and again.",
    image: "/images/story/long-distance.jpg",
    align: "right",
  },
  {
    date: "2024-2025",
    title: "Adventures Everywhere",
    body: "From motorcycle rides in the Philippines to holidays in Dubai, island escapes in Tioman, and travels across Vietnam and Thailand, we filled our passports with memories. Somewhere between airport departures and new destinations, we realized our favorite adventures were never about the places. We simply loved experiencing them together.",
    image: "/images/story/adventures.jpg",
    align: "left",
  },
  {
    date: "Feb 20, 2026",
    title: "The Easiest Yes",
    body: "While exploring South Korea, JJ asked Sofia to spend forever with him. After all the miles, flights, and adventures, the answer came easily.",
    image: "/images/story/proposal.jpg",
    quote: "Yes.",
    align: "right",
  },
];

function StoryMoment({ event, index }: { event: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  const reverse = event.align === "right";

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.06 }}
      className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${
        reverse ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="relative">
        <div className="absolute -inset-3 border border-[#d7b98e]/35" />
        <div className="relative aspect-[4/5] overflow-hidden bg-[#26311f]">
          <motion.img
            src={event.image}
            alt={event.title}
            style={{ y: imageY }}
            className="h-[116%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1f281a]/40 via-transparent to-transparent" />
        </div>

        <div className="absolute -bottom-5 -right-5 hidden h-28 w-28 border-b border-r border-[#d7b98e]/70 md:block" />
      </div>

      <motion.div style={{ y: textY }} className="relative">
        <p className="mb-5 text-xs uppercase tracking-[0.38em] text-[#d7b98e]">
          {event.date}
        </p>

        <h3 className="mb-6 font-serif text-4xl leading-tight text-[#fff9ef] md:text-6xl">
          {event.title}
        </h3>

        <p className="max-w-xl text-base leading-8 text-[#f4eadb]/82 md:text-lg">
          {event.body}
        </p>

        {event.quote && (
          <blockquote className="mt-8 font-serif text-4xl italic text-[#d7b98e]">
            "{event.quote}"
          </blockquote>
        )}
      </motion.div>
    </motion.article>
  );
}

export default function OurStory() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const orchidY = useTransform(scrollYProgress, [0, 1], [-120, 140]);
  const lilyY = useTransform(scrollYProgress, [0, 1], [120, -160]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#33402b] px-6 py-28 text-[#f7f1e6] md:py-36"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,250,239,0.12),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(215,185,142,0.14),transparent_34%)]" />

      <motion.img
        src="/images/orchid.png"
        alt=""
        style={{ y: orchidY }}
        className="pointer-events-none absolute -left-24 top-20 w-72 opacity-45 md:w-[30rem]"
      />

      <motion.img
        src="/images/calla-lily.png"
        alt=""
        style={{ y: lilyY }}
        className="pointer-events-none absolute -right-28 bottom-32 w-72 rotate-12 opacity-35 md:w-[28rem]"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-20 text-center md:mb-28">
          <p className="mb-5 text-xs uppercase tracking-[0.45em] text-[#d7b98e]">
            Our Journey
          </p>

          <h2 className="font-serif text-5xl text-[#fff9ef] md:text-7xl">
            Our Story
          </h2>

          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#f4eadb]/70 md:text-base">
            A few chapters from the places, choices, and little miracles that
            brought us here.
          </p>
        </div>

        <div className="space-y-24 md:space-y-32">
          {storyEvents.map((event, index) => (
            <StoryMoment key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}