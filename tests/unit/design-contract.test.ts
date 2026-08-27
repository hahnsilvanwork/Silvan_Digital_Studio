import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const stylesheets = [
  "src/app/globals.css",
  "src/styles/layout.module.css",
  "src/styles/pages.module.css",
  "src/styles/motion.css",
];

const stylesheetSource = stylesheets
  .map((stylesheet) => {
    const path = resolve(process.cwd(), stylesheet);

    return existsSync(path) ? readFileSync(path, "utf8") : "";
  })
  .join("\n")
  .toLowerCase();

const importerSource = readFileSync(
  resolve(process.cwd(), "scripts/import-mockup-assets.ps1"),
  "utf8",
);

const projectAssets = [
  {
    fileName: "archa.jpg",
    bytes: 40_918,
    sha256: "7B2D8F8F7C11A00BB0B2A6BAB40A12614D9A217EDEA2922ABC7FC174ED86CE3F",
  },
  {
    fileName: "lumen.jpg",
    bytes: 15_505,
    sha256: "C6CC75CD14762FC45BA9A9444256F43F883547321A81AD9439CC950E519B4EAE",
  },
  {
    fileName: "architech-studio.jpg",
    bytes: 32_765,
    sha256: "0F8F449BC10FF69160528AF13DABCBA8BD0D41D44EAC0392E3E18BF2AE016953",
  },
  {
    fileName: "vanguard-apparel.jpg",
    bytes: 30_523,
    sha256: "F9C235D52848F63C585FA95FDB11A0C5385F05174C80C2A0383E4C13F3AD2D87",
  },
] as const;

describe("SILVAN responsive design contract", () => {
  it("defines the approved palette and fluid responsive foundations", () => {
    expect(stylesheetSource).toContain("#f9f8f6");
    expect(stylesheetSource).toContain("#1a1a1a");
    expect(stylesheetSource).toContain("#0047ff");
    expect(stylesheetSource).toContain("clamp(");
    expect(stylesheetSource).toMatch(/100(?:dvh|svh)/);
    expect(stylesheetSource).toMatch(/env\(safe-area-inset-(?:top|right|bottom|left)\)/);
    expect(stylesheetSource).toContain(":focus-visible");
    expect(stylesheetSource).toContain("prefers-reduced-motion");
  });

  it.each(["48rem", "64rem", "80rem", "96rem"])(
    "progressively enhances from the %s breakpoint",
    (breakpoint) => {
      expect(stylesheetSource).toMatch(
        new RegExp(`@media\\s*\\(min-width:\\s*${breakpoint.replace(".", "\\.")}\\)`),
      );
    },
  );

  it("keeps targets accessible and every viewport query mobile-first", () => {
    expect(stylesheetSource).toMatch(/--[^:]*target[^:]*:\s*(?:2\.75rem|44px)/);
    expect(stylesheetSource).toMatch(
      /min-block-size:\s*var\(--control-target-min\)/,
    );
    expect(stylesheetSource).toMatch(
      /min-inline-size:\s*var\(--control-target-min\)/,
    );
    expect(stylesheetSource).not.toMatch(/@media\s*\([^)]*max-width\s*:/);
  });

  it("never autoplays a perpetual CSS animation", () => {
    expect(stylesheetSource).not.toMatch(/animation(?:-[^:]+)?:[^;]*\binfinite\b/);
  });

  it.each(projectAssets)(
    "pins $fileName to the approved non-empty JPEG bytes",
    ({ fileName, bytes, sha256 }) => {
      const asset = readFileSync(
        resolve(process.cwd(), "public/images/projects", fileName),
      );

      expect(asset.length).toBe(bytes);
      expect([...asset.subarray(0, 3)]).toEqual([0xff, 0xd8, 0xff]);
      expect(createHash("sha256").update(asset).digest("hex").toUpperCase()).toBe(
        sha256,
      );
      expect(importerSource).toContain(`ExpectedBytes = ${bytes}`);
      expect(importerSource).toContain(`ExpectedSha256 = "${sha256}"`);
    },
  );

  it("validates imported length and SHA-256 before replacing a target", () => {
    expect(importerSource).toContain(
      "$download.Length -ne $asset.ExpectedBytes",
    );
    expect(importerSource).toContain(
      "$downloadHash -ne $asset.ExpectedSha256",
    );
  });
});
