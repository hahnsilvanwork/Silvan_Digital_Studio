import { afterEach, describe, expect, it, vi } from "vitest";
import { track } from "@vercel/analytics";
import { measurementEnabled, trackInquiryEvent, type InquiryEvent } from "../../src/lib/telemetry-client";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.mocked(track).mockClear();
  window.history.replaceState(null, "", "/");
});

describe("measurement privacy gate", () => {
  it("sends nothing without explicit operator opt-in", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "false");
    trackInquiryEvent("inquiry_reviewed");
    expect(track).not.toHaveBeenCalled();
  });
  it("respects Do Not Track", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    vi.stubGlobal("navigator", { doNotTrack: "1" });
    expect(measurementEnabled()).toBe(false);
  });
  it("respects Global Privacy Control", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    vi.stubGlobal("navigator", { globalPrivacyControl: true });
    expect(measurementEnabled()).toBe(false);
  });
  it("sends only a fixed milestone name despite sensitive query data", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    window.history.replaceState(null, "", "/reviews?name=Private#message");
    trackInquiryEvent("inquiry_reviewed");
    expect(track).toHaveBeenCalledExactlyOnceWith("inquiry_reviewed");
  });
  it("drops unknown event names and unknown paths", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    trackInquiryEvent("private@example.com" as InquiryEvent);
    window.history.replaceState(null, "", "/customer/private-name");
    trackInquiryEvent("inquiry_reviewed");
    expect(track).not.toHaveBeenCalled();
  });
});
