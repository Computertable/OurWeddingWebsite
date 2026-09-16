import type { Metadata } from "next";
import EntryGate from "../../components/EntryGate";
import PageShell from "../../components/PageShell";
import WeddingEntourage from "../../components/WeddingEntourage";

export const metadata: Metadata = {
  title: "The entourage · Sofia & Joshua",
};

export default function EntouragePage() {
  return (
    <EntryGate>
      <PageShell>
        <WeddingEntourage />
      </PageShell>
    </EntryGate>
  );
}
