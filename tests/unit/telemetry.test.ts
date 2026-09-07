import { describe, expect, it } from "vitest";
import { sanitizeTelemetryUrl } from "../../src/lib/telemetry";

describe("telemetry URL privacy", () => {
  it("strips inquiry query parameters and fragments on an allowed page", () => {
    expect(sanitizeTelemetryUrl("https://silvandigital.ch/en/reviews?name=Private&text=Secret#email"))
      .toBe("https://silvandigital.ch/en/reviews");
  });
  it.each(["https://silvandigital.ch/customer/private-name", "https://silvandigital.ch/work/private-name", "https://silvandigital.ch/demos/salon", "mailto:private@example.com", "broken"])("drops unknown or non-web URL %s", (url) => {
    expect(sanitizeTelemetryUrl(url)).toBeNull();
  });
  it("retains only a known project path", () => {
    expect(sanitizeTelemetryUrl("https://silvandigital.ch/work/falkenried?secret=value")).toBe("https://silvandigital.ch/work/falkenried");
  });
});
