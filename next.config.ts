import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Faction symbols are hot-linked from the wiki's CDN rather than vendored
     * into `public/`. They are Fantasy Flight artwork, so this app points at
     * them where they already live instead of redistributing copies of them in
     * the repository. Every symbol has a monogram fallback if the image fails.
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        pathname: "/twilight-imperium-4/**",
      },
    ],
  },
};

export default nextConfig;
