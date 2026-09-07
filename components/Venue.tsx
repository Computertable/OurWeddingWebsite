"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const venues = [
  {
    name: "Minor Basilica and Archdiocesan Shrine Parish of Saint Anne",
    address1: "41 Liwayway,",
    address2: "Taguig, Metro Manila",
    image: "/images/church_venue.png",
    mapLink: "https://maps.app.goo.gl/NMhXggGj8sFbxC8n8",
  },
  {
    name: "The Blue Leaf Events Pavilion",
    address1: "100 Park Avenue, McKinley Hill Village,",
    address2: "Taguig, Metro Manila",
    image: "/images/reception_venue.png",
    mapLink: "https://maps.app.goo.gl/GKmmXjtLJxE2KqEeA",
  },
];

export default function Venue() {
  return (
    <section id="venue" className="relative w-full bg-[#F5F0E6] py-20 text-[#444D33] md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center text-5xl font-light tracking-tight md:text-7xl"
          style={{ fontFamily: "var(--font-script)" }}
        >
          The Venues
        </motion.h2>

        <div className="relative grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-0">
          
          <div className="absolute top-12 bottom-0 left-1/2 hidden w-[1px] bg-[#55544E]/30 md:block" />

          {venues.map((venue, index) => (
            <motion.div
              key={venue.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="flex flex-col items-center text-center md:px-12"
            >
              <div className="relative aspect-[3/4] w-full max-w-[250px] border border-[#55544E] bg-stone-200">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  className="object-cover transition-all duration-700 hover:grayscale-0"
                />
              </div>

              <h3 
                className="mt-8 text-xl font-light tracking-tight md:text-4xl"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {venue.name}
              </h3>

              <p 
                className="mt-3 text-lg italic leading-relaxed text-[#6E6D66]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {venue.address1}
                <br />
                {venue.address2}
              </p>

              <a
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 border border-[#55544E] px-8 py-2.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#55544E] hover:text-[#F5F0E6]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Google Maps
              </a>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}