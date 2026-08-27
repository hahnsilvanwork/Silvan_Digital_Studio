import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PLAYWRIGHT_PORT ?? 3100);
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    // The 390px viewport is the primary design reference, and the drawer only
    // exists below 64rem, so the mobile journeys need a project of their own.
    { name: "mobile-safari", use: { ...devices["iPhone 13"] } },
  ],
  // A production build, not `next dev`: the dev server compiles a route on first
  // request, which can take longer than the 2.5s bundle-failure fallback in the
  // motion flag script and makes hydration timing non-deterministic. It also
  // means these tests exercise what actually ships. The port is deliberately not
  // 3000, so a dev server left running is never mistaken for this one.
  webServer: {
    command: `npm run build && npm run start -- --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
