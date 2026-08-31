/**
 * Renders the still image that fills a product frame while the Spline runtime
 * loads. Each still is captured from the pose the viewer starts on, so handing
 * over to the live scene does not visibly jump.
 *
 * Usage: node scripts/render-product-stills.mjs [id ...]
 * With no arguments every product in src/content/de.ts is re-rendered.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { chromium } from "playwright";

const SIZE = 900;
const QUALITY = 0.82;
const SETTLE_MS = 4000;

function readProducts() {
  const source = readFileSync(resolve("src/content/de.ts"), "utf8");
  const products = [];
  const entry =
    /id:\s*"([\w-]+)",\s*(?:[^}]*?)sceneUrl:\s*\n?\s*"([^"]+scene\.splinecode)"/g;

  for (const [, id, sceneUrl] of source.matchAll(entry)) {
    products.push({ id, sceneUrl });
  }

  return products;
}

async function renderStill(browser, { id, sceneUrl }) {
  const page = await browser.newPage({
    viewport: { width: SIZE, height: SIZE },
  });

  await page.setContent(`<body style="margin:0;background:transparent">
    <script type="module" src="https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js"></script>
    <spline-viewer id="v" style="display:block;width:${SIZE}px;height:${SIZE}px"
      background="transparent" url="${sceneUrl}"></spline-viewer>
  </body>`);

  await page.waitForFunction(() => Boolean(document.querySelector("#v")?._spline), {
    timeout: 120_000,
  });
  await page.evaluate(() => {
    const controls = document.querySelector("#v")?._spline?._controls?.orbitControls;
    if (!controls) return;

    controls.autoRotate = false;
    controls.hoverRotatePanMode = 0;
  });
  await page.waitForTimeout(SETTLE_MS);

  const png = await page.locator("#v").screenshot({ omitBackground: true });
  const webp = await page.evaluate(
    async ({ dataUrl, quality }) => {
      const image = new Image();
      image.src = dataUrl;
      await image.decode();

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      canvas.getContext("2d").drawImage(image, 0, 0);

      return canvas.toDataURL("image/webp", quality);
    },
    { dataUrl: `data:image/png;base64,${png.toString("base64")}`, quality: QUALITY },
  );

  const file = resolve(`public/images/products/${id}.webp`);
  const bytes = Buffer.from(webp.split(",")[1], "base64");
  writeFileSync(file, bytes);
  await page.close();

  return { file, kilobytes: Math.round(bytes.length / 1024) };
}

const wanted = new Set(process.argv.slice(2));
const products = readProducts().filter(
  ({ id }) => wanted.size === 0 || wanted.has(id),
);

if (products.length === 0) {
  console.error(
    wanted.size === 0
      ? "No products found in src/content/de.ts."
      : `No product matched: ${[...wanted].join(", ")}`,
  );
  process.exit(1);
}

const browser = await chromium.launch();

try {
  for (const product of products) {
    const { file, kilobytes } = await renderStill(browser, product);
    console.log(`${file}  ${kilobytes} KB`);
  }
} finally {
  await browser.close();
}
