import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export", turbopack: { root: process.cwd() }, basePath: "/demos/cafe", trailingSlash: true, images: { unoptimized: true } };
export default nextConfig;
