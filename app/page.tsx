import Hero from "../components/Hero";
import Countdown from "../components/Countdown";
import Venue from "../components/Venue";
import Invitation from "../components/Invitation";

export default function Home() {
  return (
    <main>
      <Hero />
     <Invitation/>
      <Countdown />
      <Venue/>
      
    </main>
  );
}