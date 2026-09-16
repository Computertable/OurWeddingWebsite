"use client";

import { DisplayHeading, Eyebrow, Reveal } from "./ds";

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
    <section id="faqs" data-section aria-labelledby="faqs-title" className="ds-surface-sunken ds-section">
      <div className="ds-container grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
        <Reveal className="text-center md:text-left">
          <Eyebrow>FAQs</Eyebrow>
          <DisplayHeading id="faqs-title" size="lg" className="mt-4">
            Good to know
          </DisplayHeading>
        </Reveal>

        <div>
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.08}>
              <div
                className={`grid gap-3 sm:grid-cols-[56px_1fr] sm:gap-6 ${index === 0 ? "pb-8" : "py-8"}`}
                style={index < faqs.length - 1 ? { borderBottom: "var(--border-hairline)" } : undefined}
              >
                <span className="ds-eyebrow ds-eyebrow--accent sm:pt-2" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="ds-display ds-display--md">{faq.question}</h3>
                  <p className="ds-body ds-body--lg ds-body--muted ds-measure mt-3">{faq.answer}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
