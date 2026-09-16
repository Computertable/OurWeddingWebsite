"use client";

import { useEffect } from "react";

import SiteHeader from "./SiteHeader";
import Hero from "./Hero";
import Countdown from "./Countdown";
import Venue from "./Venue";
import Invitation from "./Invitation";
import RSVPSection from "./RSVP";
import StorySection from "./Story";
import FAQ from "./FAQ";
import DressCode from "./DressCode";
import GuestLinks from "./GuestLinks";
import Schedule from "./Schedule";
import { useGuests } from "./EntryGate";
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
          song_request: g.song_request,
        })) ?? [],
  };

  // Arriving from another page with a #section link: the content mounts after the invitation
  // check, so scroll once it exists.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: "start" }), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Invitation />
        <StorySection />
       
        <Venue />
        <Schedule />
        <Countdown />
        <DressCode />
         <GuestLinks />
        <FAQ />
        <RSVPSection party={partyData} />
      </main>
      <Footer />
    </>
  );
}
