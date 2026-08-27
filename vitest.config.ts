import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // Real CSS is processed and injected so layout contracts can be asserted
    // against computed styles instead of against stylesheet text alone.
    css: true,
  },
});
