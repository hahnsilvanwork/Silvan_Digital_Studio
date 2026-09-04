import { mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

export const SOURCE_TO_OUTPUT = Object.freeze({
  "assets/nfc-products/source/nfc-product-range-overview.png":
    "all-products.webp",
  "assets/nfc-products/source/nfc-booking-custom-square-blue.png":
    "booking-custom-blue.webp",
  "assets/nfc-products/source/nfc-google-review-round-black.png":
    "review-round-black.webp",
  "assets/nfc-products/source/nfc-google-review-round-white.png":
    "review-round-white.webp",
  "assets/nfc-products/source/nfc-google-review-square-blue.png":
    "review-square-blue.webp",
  "assets/nfc-products/source/nfc-google-review-stand-white.png":
    "review-stand-white.webp",
  "assets/nfc-products/source/nfc-google-review-personalized-round-black.png":
    "review-personalized-black.webp",
  "assets/nfc-products/source/nfc-menu-round-black.png":
    "menu-round-black.webp",
  "assets/nfc-products/source/nfc-menu-personalized-round-white.png":
    "menu-personalized-white.webp",
  "assets/nfc-products/source/nfc-menu-square-black.png":
    "menu-square-black.webp",
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
