import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

describe("mockup asset importer", () => {
  it("rejects unsafe redirects and cleans up an oversized stream", () => {
    const shell = process.platform === "win32" ? "powershell.exe" : "pwsh";
    const harness = resolve(
      process.cwd(),
      "tests/fixtures/importer-overflow-harness.ps1",
    );
    const importer = resolve(
      process.cwd(),
      "scripts/import-mockup-assets.ps1",
    );
    const result = spawnSync(
      shell,
      [
        "-NoLogo",
        "-NoProfile",
        "-NonInteractive",
        "-File",
        harness,
        "-ImporterPath",
        importer,
      ],
      { encoding: "utf8" },
    );

    expect(result.status, `${result.stdout}\n${result.stderr}`).toBe(0);
    expect(result.stdout).toContain("IMPORTER_BEHAVIOR_PASS");
  });
});
