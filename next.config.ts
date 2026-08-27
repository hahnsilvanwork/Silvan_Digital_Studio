import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next writes AGENTS.md/CLAUDE.md into the repository root on every dev start.
  // The project keeps its own guidance under docs/, so this stays off.
  agentRules: false,
};

export default nextConfig;
