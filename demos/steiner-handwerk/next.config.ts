import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export", basePath: "/demos/handwerk", trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
