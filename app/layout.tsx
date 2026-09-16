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

export const metadata: Metadata = {
  title: "Sofia & Joshua",
  description: "Wedding Website",
  openGraph: {
    title: "Sofia & Joshua",
    description: "Our Wedding • February 27, 2027",
    url: "https://thegonzaleswedding.com",
    siteName: "Sofia & Joshua",
    images: [
      {
        url: "https://thegonzaleswedding.com/hero-couple.JPG",
        width: 1200,
        height: 630,
        alt: "Sofia & Joshua Wedding",
      },
    ],
    locale: "en_US",
    type: "website",
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
