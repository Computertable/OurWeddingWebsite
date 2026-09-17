import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Qualities used by <Image quality={…}/> across the site. Lower values keep the
    // full-bleed parallax photographs light; Next 16 only allows listed qualities.
    qualities: [60, 70, 75],
  },
};

export default nextConfig;
