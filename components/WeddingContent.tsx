"use client";

import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Venue from "../components/Venue";
import Invitation from "../components/Invitation";
import RSVPSection from "../components/RSVP";
import StorySection from "../components/Story";
import FAQ from "../components/FAQ";
import DressCode from "../components/DressCode";
import { useGuests } from "../components/EntryGate";

export default function WeddingContent() {
  const { guests } = useGuests();

  return (
    <main>
      <Hero />

      <Invitation />

      <StorySection />

      <Venue />

      <DressCode />

      <Countdown />

      <FAQ />

      <RSVPSection
        guest={{
          id: guests[0]?.id || "",
          names: guests.map(
            (guest) =>
              `${guest.first_name} ${guest.last_name}`
          ),
        }}
      />
    </main>
  );
}