import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next writes AGENTS.md/CLAUDE.md into the repository root on every dev start.
  // The project keeps its own guidance under docs/, so this stays off.
  agentRules: false,
  images: {
    // AVIF first, WebP as the fallback. Measured on this site's own assets, AVIF
    // lands 26-36% under the WebP the optimizer already produces, at the sizes
    // actually served. Browsers that cannot read it still get the WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
