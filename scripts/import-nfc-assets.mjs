import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

export const SOURCE_TO_OUTPUT = Object.freeze({
  "All Card Types.png": "all-products.webp",
  "Bookiing selve designed blue square.png": "booking-custom-blue.webp",
  "Google Review Circle Black.png": "review-round-black.webp",
  "Google Review Circle White.png": "review-round-white.webp",
  "Google Review Square Blue.png": "review-square-blue.webp",
  "Google review stand white.png": "review-stand-white.webp",
  "google selfe designed black circle.png": "review-personalized-black.webp",
  "Menu Circle Black.png": "menu-round-black.webp",
  "Menu selfe designed white circle.png": "menu-personalized-white.webp",
  "Menu Square Black.png": "menu-square-black.webp",
});

export async function importNfcAssets({ sourceDir, outputDir }) {
  await mkdir(outputDir, { recursive: true });

  await Promise.all(
    Object.entries(SOURCE_TO_OUTPUT).map(async ([sourceName, outputName]) => {
      await sharp(join(sourceDir, sourceName))
        .rotate()
        .resize({
          width: 1600,
          height: 1600,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 84, smartSubsample: true })
        .toFile(join(outputDir, outputName));
    }),
  );
}

const scriptPath = fileURLToPath(import.meta.url);
const isDirectRun =
  process.argv[1] !== undefined &&
  pathToFileURL(resolve(process.argv[1])).href === import.meta.url;

if (isDirectRun) {
  const repositoryRoot = resolve(dirname(scriptPath), "..");
  await importNfcAssets({
    sourceDir: repositoryRoot,
    outputDir: join(repositoryRoot, "public", "images", "products", "catalog"),
  });
}
