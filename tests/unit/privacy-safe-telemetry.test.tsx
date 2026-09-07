import { render, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { PrivacySafeTelemetry } from "../../src/components/layout/PrivacySafeTelemetry";

const mocks = vi.hoisted(() => ({ analytics: vi.fn(), vitals: vi.fn(), track: vi.fn() }));
vi.mock("@vercel/analytics/react", () => ({ Analytics: (props: unknown) => { mocks.analytics(props); return null; } }));
vi.mock("@vercel/analytics", () => ({ track: mocks.track }));
vi.mock("next/web-vitals", () => ({ useReportWebVitals: mocks.vitals }));
vi.mock("next/navigation", () => ({ usePathname: () => "/reviews" }));
afterEach(() => { cleanup(); vi.unstubAllEnvs(); vi.clearAllMocks(); });

describe("telemetry boundary", () => {
  it("does not mount analytics or vitals without opt-in", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "false");
    render(<PrivacySafeTelemetry />);
    expect(mocks.analytics).not.toHaveBeenCalled();
    expect(mocks.vitals).not.toHaveBeenCalled();
  });
  it("redacts pageview and custom event URLs using the same beforeSend hook", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    render(<PrivacySafeTelemetry />);
    const { beforeSend } = mocks.analytics.mock.lastCall![0];
    for (const type of ["pageview", "event"]) {
      expect(beforeSend({ type, url: "https://silvandigital.ch/reviews?name=Private#message" }))
        .toEqual({ type, url: "https://silvandigital.ch/reviews" });
      expect(beforeSend({ type, url: "https://silvandigital.ch/customer/private" })).toBeNull();
    }
  });
  it("sends numeric vitals without entries, metric IDs or attribution", () => {
    vi.stubEnv("NEXT_PUBLIC_MEASUREMENT_ENABLED", "true");
    render(<PrivacySafeTelemetry />);
    const report = mocks.vitals.mock.lastCall![0];
    report({ name: "LCP", value: 2300.12345, id: "private-id", entries: [{ name: "private-url" }] });
    expect(mocks.track).toHaveBeenCalledExactlyOnceWith("web_vital_lcp", { value: 2300.123 });
    report({ name: "private-name", value: 5 });
    report({ name: "INP", value: NaN });
    expect(mocks.track).toHaveBeenCalledTimes(1);
  });
});
