import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next writes AGENTS.md/CLAUDE.md into the repository root on every dev start.
  // The project keeps its own guidance under docs/, so this stays off.
  agentRules: false,
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        // Keep inquiry query data out of same-origin referrers as well.
        { key: "Referrer-Policy", value: "strict-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Content-Security-Policy", value: "base-uri 'self'; object-src 'none'; frame-ancestors 'none'" },
        // Trial in browser consoles. Inline Next payloads need per-build hashes
        // before script-src can be enforced while retaining static rendering.
        { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'; script-src 'self' https://cdn.spline.design https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self'; connect-src 'self' https://prod.spline.design https://*.spline.design https://vitals.vercel-insights.com; worker-src 'self' blob:; frame-src 'none'; object-src 'none'; base-uri 'self'" },
        ...(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
          ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] : []),
      ],
    }];
  },
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: "/demos/:demo", destination: "/demos/:demo/index.html" },
        { source: "/demos/:demo/:path*", destination: "/demos/:demo/:path*/index.html" },
      ],
    };
  },
  async redirects() {
    const legacy = { archa: "falkenried", lumen: "cafe-vogel", "architech-studio": "steiner-handwerk", "vanguard-apparel": "salon-lumiere" };
    return Object.entries(legacy).flatMap(([oldSlug, slug]) => [
      { source: `/work/${oldSlug}`, destination: `/work/${slug}`, permanent: true },
      { source: `/en/work/${oldSlug}`, destination: `/en/work/${slug}`, permanent: true },
    ]);
  },
  images: {
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2880, 3840],
    // AVIF first, WebP as the fallback. Measured on this site's own assets, AVIF
    // lands 26-36% under the WebP the optimizer already produces, at the sizes
    // actually served. Browsers that cannot read it still get the WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
