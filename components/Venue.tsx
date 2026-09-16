"use client";

import Image from "next/image";
import { ButtonLink, DisplayHeading, Eyebrow, Reveal } from "./ds";

const venues = [
  {
    kind: "Ceremony",
    name: "Minor Basilica and Archdiocesan Shrine Parish of Saint Anne",
    address1: "41 Liwayway,",
    address2: "Taguig, Metro Manila",
    image: "/images/church_venue.png",
    mapLink: "https://maps.app.goo.gl/NMhXggGj8sFbxC8n8",
  },
  {
    kind: "Reception",
    name: "The Blue Leaf Events Pavilion",
    address1: "100 Park Avenue, McKinley Hill Village,",
    address2: "Taguig, Metro Manila",
    image: "/images/reception_venue.png",
    mapLink: "https://maps.app.goo.gl/GKmmXjtLJxE2KqEeA",
  },
];

export default function Venue() {
  return (
    <section id="venues" data-section aria-labelledby="venues-title" className="ds-surface-sunken ds-section">
      <div className="ds-container">
        <Reveal className="text-center">
          <Eyebrow>Where to be</Eyebrow>
          <DisplayHeading id="venues-title" size="lg" className="mt-4">
            The venues
          </DisplayHeading>
        </Reveal>

        <div className="relative mt-16 grid grid-cols-1 gap-16 md:mt-20 md:grid-cols-2 md:gap-0">
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-1/2 top-12 hidden w-px md:block"
            style={{ background: "var(--line-hairline)" }}
          />

          {venues.map((venue, index) => (
            <Reveal key={venue.name} delay={index * 0.15} className="flex flex-col items-center text-center md:px-12">
              <div className="ds-frame ds-frame--hover relative aspect-[3/4] w-full max-w-[260px]">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="260px"
                  quality={75}
                  className="object-cover"
                />
              </div>

              <Eyebrow tone="accent" size="sm" className="mt-8">
                {venue.kind}
              </Eyebrow>
              <DisplayHeading as="h3" size="md" className="mt-3 max-w-[22ch]">
                {venue.name}
              </DisplayHeading>
              <p className="ds-body ds-body--muted mt-3">
                {venue.address1}
                <br />
                {venue.address2}
              </p>

              <ButtonLink
                href={venue.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                className="mt-8"
              >
                Google Maps
                <span className="sr-only"> (opens in a new tab)</span>
              </ButtonLink>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
