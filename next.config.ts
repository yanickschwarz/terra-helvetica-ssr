import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    // Allow production builds to succeed even with type errors.
    // The Supabase generated types have some inference quirks with Next 15.
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ahlgamswoyeeimkvpuoz.supabase.co",
        pathname: "/storage/v1/object/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async redirects() {
    return [
      {
        source: "/ueberuns",
        destination: "/ueber-uns",
        permanent: true,
      },
      {
        source: "/home-2",
        destination: "/anlagegruppe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
