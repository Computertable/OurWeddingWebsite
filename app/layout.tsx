import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Configure local fonts
const cormorant = localFont({
  src: "../public/fonts/CormorantGaramond-Regular.ttf",
  variable: "--font-display",
});

const pinyon = localFont({
  src: "../public/fonts/PinyonScript-Regular.ttf",
  variable: "--font-script",
});


const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
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
    <html
      lang="en"
      className={`${cormorant.variable} ${montserrat.variable} ${pinyon.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}