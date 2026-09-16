import type { Metadata } from "next";
import EntryGate from "../../components/EntryGate";
import PageShell from "../../components/PageShell";
import Gifts from "../../components/Gifts";

export const metadata: Metadata = {
  title: "Gifts · Sofia & Joshua",
};

export default function GiftsPage() {
  return (
    <EntryGate>
      <PageShell>
        <Gifts />
      </PageShell>
    </EntryGate>
  );
}
