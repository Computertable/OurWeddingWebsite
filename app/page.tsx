import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Venue from "../components/Venue";
import Invitation from "../components/Invitation";
import RSVP from "../components/RSVP";

export default function Home() {
  return (
    <main>
      <Hero />
      <Invitation />
      <RSVP />
      <Countdown />
      <Venue />
    </main>
  );
}