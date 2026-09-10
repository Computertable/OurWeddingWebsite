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
import WeddingEntourage from "./WeddingEntourage";
import Footer from "./Footer";

export default function WeddingContent() {
  const { guests } = useGuests();
 const partyData = {
    guests:
      guests
        ?.filter((g) => g.id !== undefined && g.id !== null)
        .map((g) => ({
          id: g.id!,
          name: `${g.first_name} ${g.last_name}`.trim(),
          rsvp_status: g.rsvp_status,
          song_request: g.song_request
        })) ?? [],
  };

  return (
    <main>
      <Hero />

      <Invitation />

      <StorySection />

      <WeddingEntourage />

      <Venue />

      <Countdown />

      <DressCode />

      <FAQ />

      <RSVPSection party={partyData} />

      <Footer />
    </main>
  );
}