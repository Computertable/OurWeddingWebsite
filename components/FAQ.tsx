"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    question: "What time should I arrive?",
    answer:
      "The ceremony at St. Anne will start promptly at 3:30 PM. Please plan to arrive at least 30 minutes early—or a bit earlier if you need extra time to find parking and get settled.",
  },
  {
    question: "Where is the ceremony and reception?",
    answer:
      "The ceremony will be held at St. Anne Parish Church in Taguig, followed by the reception at The Blue Leaf, Taguig.",
  },
  {
    question: "Are children welcome?",
    answer:
      "While we love your little ones, we kindly ask that only guests named on the invitation attend the celebration.",
  },
];

export default function FAQ() {
  return (
    <section className="bg-[#e9e1d5] px-5 py-20 text-[#2f2b26] md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl border-[14px] border-[#666634] px-6 py-12 md:px-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[260px_1fr] md:items-center">
          <div className="flex justify-center md:justify-start">
            <h2 className="font-script text-6xl leading-none text-[#2f2b13] md:-rotate-90 md:text-9xl">
              FAQ
            </h2>
          </div>

          <div className="mx-auto w-full max-w-3xl">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="border-b border-[#2f2b26]/70 py-7 last:border-b-0"
              >
                <div className="grid gap-4 sm:grid-cols-[48px_1fr]">
                  <p className="font-display text-lg font-semibold tracking-[0.08em]">
                    {String(index + 1).padStart(2, "0")}
                  </p>

                  <div>
                    <h3 className="font-sans text-lg text-[#1f1d1a] md:text-2xl">
                      {faq.question}
                    </h3>

                    <p className="mt-5 max-w-2xl font-display text-xl leading-8 text-black">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* <div className="mt-10 flex justify-center md:justify-start">
              <a
                href="#rsvp"
                className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.22em] text-[#1f1d1a]"
              >
                Send us a question
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}