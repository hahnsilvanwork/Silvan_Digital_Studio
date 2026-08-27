import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // The browser journeys under tests/e2e belong to Playwright; Vitest picking
    // them up would try to run test.describe outside a Playwright runner.
    include: ["tests/unit/**/*.test.{ts,tsx}"],
    // Real CSS is processed and injected so layout contracts can be asserted
    // against computed styles instead of against stylesheet text alone.
    css: true,
  },
});
