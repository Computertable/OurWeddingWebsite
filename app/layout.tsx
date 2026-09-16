import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Site fonts (two only):
// - Pinyon Script: every title and heading.
// - Jost (Light): body text, labels, buttons, numbers.
const pinyon = localFont({
  src: "../public/fonts/PinyonScript-Regular.ttf",
  variable: "--font-pinyon",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

// Link previews (Messenger, Facebook, Viber, iMessage…).
// The preview image is app/opengraph-image.jpg (1200×630); Next.js adds the og:image tags for it
// automatically. metadataBase makes those image URLs absolute, which Messenger requires.
export const metadata: Metadata = {
  metadataBase: new URL("https://thegonzaleswedding.com"),
  title: "Sofia & Joshua",
  description: "Join us as we say I do · February 27, 2027 · Taguig, Philippines",
  openGraph: {
    title: "Sofia & Joshua",
    description: "Join us as we say I do · February 27, 2027 · Taguig, Philippines",
    url: "/",
    siteName: "Sofia & Joshua",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sofia & Joshua",
    description: "Join us as we say I do · February 27, 2027 · Taguig, Philippines",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pinyon.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
