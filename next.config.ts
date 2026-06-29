import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "@react-three/postprocessing",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
  experimental: {
    // Optimize package imports for icons
    optimizePackageImports: ["lucide-react", "react-icons"],
  },
};

export default nextConfig;
