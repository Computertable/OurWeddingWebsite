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
  title: "Sofia & JJ",
  description: "Wedding Website",
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