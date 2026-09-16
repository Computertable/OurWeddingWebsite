"use client";

import Link from "next/link";
import SiteHeader from "./SiteHeader";
import Footer from "./Footer";
import { HEADER_HEIGHT } from "./navigation";

/** Layout for the separate pages (Entourage, Gifts): fixed bar, content, way back, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader variant="page" />
      <main style={{ paddingTop: HEADER_HEIGHT }}>
        {children}
        <div className="ds-surface-page flex justify-center" style={{ paddingBottom: "var(--section-y)" }}>
          <Link href="/" className="ds-btn ds-btn--text">
            Back to the invitation
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
