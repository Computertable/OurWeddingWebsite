import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Venue from "../components/Venue";
import Invitation from "../components/Invitation";
import RSVPSection from "../components/RSVP";
import StorySection from "../components/Story";

export default function Home() {
  return (
    <main>
      <Hero />
      <Invitation />
      <StorySection />
      
      <Venue />
      <Countdown />
      <RSVPSection guest={{
        id: "",
        names: ["Pia", "JJ"]
      }} />
    </main>
  );
}