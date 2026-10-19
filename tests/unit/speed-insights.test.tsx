import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { PrivacySafeSpeedInsights } from "../../src/components/layout/PrivacySafeSpeedInsights";

const mocks = vi.hoisted(() => ({ speed: vi.fn() }));
vi.mock("@vercel/speed-insights/next", () => ({ SpeedInsights: (props: unknown) => { mocks.speed(props); return null; } }));
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.clearAllMocks(); });

it("does not load without performance measurement enabled", () => {
  vi.stubEnv("NEXT_PUBLIC_SPEED_INSIGHTS_ENABLED", "false");
  render(<PrivacySafeSpeedInsights />);
  expect(mocks.speed).not.toHaveBeenCalled();
});

it.each([{ doNotTrack: "1" }, { globalPrivacyControl: true }])("respects browser privacy signals: %o", (signal) => {
  vi.stubEnv("NEXT_PUBLIC_SPEED_INSIGHTS_ENABLED", "true");
  vi.stubGlobal("navigator", signal);
  render(<PrivacySafeSpeedInsights />);
  expect(mocks.speed).not.toHaveBeenCalled();
});

it("enables performance independently and redacts URLs and inferred routes", () => {
  vi.stubEnv("NEXT_PUBLIC_SPEED_INSIGHTS_ENABLED", "true");
  vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "false");
  render(<PrivacySafeSpeedInsights />);
  const { beforeSend } = mocks.speed.mock.lastCall![0];
  expect(beforeSend({ type: "vital", url: "https://silvandigital.ch/websites?name=Private#message", route: "/Private" }))
    .toEqual({ type: "vital", url: "https://silvandigital.ch/websites", route: "/websites" });
  expect(beforeSend({ type: "vital", url: "https://silvandigital.ch/customer/private" })).toBeNull();
  vi.stubGlobal("navigator", { doNotTrack: "1" });
  expect(beforeSend({ type: "vital", url: "https://silvandigital.ch/websites" })).toBeNull();
});
