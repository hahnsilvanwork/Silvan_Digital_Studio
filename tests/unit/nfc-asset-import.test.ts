import { mkdtemp, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

// The importer stays executable as plain Node.js; its public shape is asserted
// by these tests and does not need to enter the application TypeScript graph.
// @ts-expect-error JavaScript maintenance script intentionally has no .d.ts.
import { SOURCE_TO_OUTPUT, importNfcAssets } from "../../scripts/import-nfc-assets.mjs";

sharp.cache(false);

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, {
        force: true,
        recursive: true,
        maxRetries: 5,
        retryDelay: 50,
      }),
    ),
  );
});

describe("NFC catalogue asset importer", () => {
  it("maps every supplied source to a stable public filename", () => {
    expect(SOURCE_TO_OUTPUT).toEqual({
      "All Card Types.png": "all-products.webp",
      "Bookiing selve designed blue square.png": "booking-custom-blue.webp",
      "Google Review Circle Black.png": "review-round-black.webp",
      "Google Review Circle White.png": "review-round-white.webp",
      "Google Review Square Blue.png": "review-square-blue.webp",
      "Google review stand white.png": "review-stand-white.webp",
      "google selfe designed black circle.png":
        "review-personalized-black.webp",
      "Menu Circle Black.png": "menu-round-black.webp",
      "Menu selfe designed white circle.png":
        "menu-personalized-white.webp",
      "Menu Square Black.png": "menu-square-black.webp",
    });
  });

  it("writes smaller metadata-free WebP derivatives", async () => {
    const outputDir = await mkdtemp(join(tmpdir(), "nfc-assets-"));
    temporaryDirectories.push(outputDir);
    const sourceDir = resolve(process.cwd());

    await importNfcAssets({ outputDir, sourceDir });

    for (const [sourceName, outputName] of Object.entries(
      SOURCE_TO_OUTPUT as Record<string, string>,
    )) {
      const source = await stat(join(sourceDir, sourceName));
      const outputPath = join(outputDir, outputName);
      const output = await stat(outputPath);
      const metadata = await sharp(outputPath).metadata();

      expect(metadata.format).toBe("webp");
      expect(metadata.width).toBeLessThanOrEqual(1600);
      expect(metadata.height).toBeLessThanOrEqual(1600);
      expect(metadata.exif).toBeUndefined();
      expect(metadata.icc).toBeUndefined();
      expect(metadata.xmp).toBeUndefined();
      expect(output.size).toBeLessThan(source.size);
    }
  });
});
