import type { NextConfig } from "next";

// next.config.ts
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "agaypcsbxmbishinmrzb.supabase.co", // Öz proyekt ID-ni bura yaz
      },
    ],
  },
};

export default nextConfig;
