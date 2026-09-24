import { chromium, webkit, expect } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.env.STEINER_URL || "http://127.0.0.1:3202";
const live = !!process.env.STEINER_URL;
const out = "artifacts/steiner-2026-09-24";
await mkdir(out, { recursive: true });
const report = { base, checks: [], errors: [] };
async function check(name, fn) {
  try {
    await fn();
    report.checks.push(name);
  } catch (e) {
    report.errors.push({ name, error: e.message });
  }
}
for (const [engine, type] of Object.entries(
  live ? { chromium } : { chromium, webkit },
)) {
  const browser = await type.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of live ? [390, 1440] : [320, 390, 768, 1024, 1440])
    await check(`${engine} surface ${width}`, async () => {
      await page.setViewportSize({ width, height: 900 });
      const r = await page.goto(base, { waitUntil: "networkidle" });
      assert.equal(r.status(), 200);
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((i) => {
            i.loading = "eager";
            return i.decode().catch(() => {});
          }),
        );
      });
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
        "overflow",
      );
      assert.equal(await page.locator("h1").count(), 1);
      assert.match(
        await page.locator("meta[name=robots]").getAttribute("content"),
        /noindex/,
      );
      assert.deepEqual(
        await page.evaluate(() =>
          [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
        ),
        [],
      );
      assert.deepEqual(
        await page.evaluate(() =>
          [...document.querySelectorAll('a[href^="#"]')]
            .filter((a) => !document.getElementById(a.hash.slice(1)))
            .map((a) => a.hash),
        ),
        [],
      );
      await page.evaluate(axe);
      const a = await page.evaluate(() =>
        axe.run(document, {
          runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
        }),
      );
      assert.deepEqual(
        a.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
        [],
      );
      if (!live && engine === "chromium" && [390, 1440].includes(width)) {
        await page.screenshot({
          path: `${out}/after-${width}.png`,
          fullPage: true,
        });
        await page.screenshot({ path: `${out}/hero-${width}.png` });
      }
    });
  await check(`${engine} navigation and resize`, async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(base);
    const toggle = page.locator(".menu-toggle");
    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(toggle).toBeFocused();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await page.setViewportSize({ width: 390, height: 900 });
    await expect(page.locator("#navigation")).toBeHidden();
    await toggle.click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Leistungen", exact: true })
      .click();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
  });
  await check(`${engine} service/project selections`, async () => {
    for (const s of [
      "Renovationen",
      "Malerarbeiten",
      "Bodenbeläge",
      "Fassade & Aussen",
    ]) {
      await page
        .getByRole("link", { name: `${s} anfragen`, exact: true })
        .click();
      await expect(page.locator("#inquiry-service")).toHaveValue(s);
    }
    for (const link of await page
      .getByRole("link", { name: /Projektidee übernehmen:/ })
      .all()) {
      await link.click();
      await expect(page.locator(".selection-note")).toBeVisible();
    }
    await page
      .getByRole("button", { name: "Projektauswahl entfernen" })
      .click();
    await expect(page.locator(".selection-note")).toHaveCount(0);
  });
  await check(`${engine} local form lifecycle`, async () => {
    await page.goto(base);
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    await expect(page.locator("#inquiry-name")).toBeFocused();
    await expect(page.locator(".inquiry-form [role=alert]")).toBeVisible();
    await page.locator("#inquiry-name").fill("Test Person");
    await page.locator("#inquiry-email").fill("demo@example.com");
    await page
      .locator("#inquiry-message")
      .fill("Wir möchten den Boden im Wohnzimmer erneuern.");
    await page
      .getByRole("link", {
        name: "Projektidee übernehmen: Natürlich von Grund auf.",
        exact: true,
      })
      .click();
    let requests = [];
    page.on("request", (r) =>
      requests.push({
        url: r.url(),
        method: r.method(),
        type: r.resourceType(),
      }),
    );
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    await expect(page.getByTestId("inquiry-summary")).toBeFocused();
    await expect(page.getByTestId("inquiry-summary")).toContainText(
      "Natürlich von Grund auf.",
    );
    await expect(page.getByTestId("inquiry-summary")).toContainText(
      "demo@example.com",
    );
    assert.deepEqual(
      requests.filter(
        (r) =>
          r.method !== "GET" || ["fetch", "xhr", "document"].includes(r.type),
      ),
      [],
    );
    assert.equal(
      await page.evaluate(() => localStorage.length + sessionStorage.length),
      0,
    );
    await page.getByRole("button", { name: "Angaben ändern" }).click();
    await expect(page.locator("#inquiry-name")).toBeFocused();
    await expect(page.locator("#inquiry-message")).toHaveValue(
      "Wir möchten den Boden im Wohnzimmer erneuern.",
    );
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    await page
      .getByRole("link", { name: "Malerarbeiten anfragen", exact: true })
      .click();
    await expect(page.getByTestId("inquiry-summary")).toHaveCount(0);
    await expect(page.locator("#inquiry-name")).toHaveValue("Test Person");
    await expect(page.locator("#inquiry-service")).toHaveValue("Malerarbeiten");
    await page.getByRole("button", { name: "Angaben löschen" }).click();
    await expect(page.locator("#inquiry-name")).toHaveValue("");
    await expect(page.locator("#inquiry-message")).toHaveValue("");
    await expect(page.locator(".selection-note")).toHaveCount(0);
  });
  await check(`${engine} details and text enlargement`, async () => {
    await page.goto(base);
    for (const s of await page.locator("summary").all()) {
      await s.click();
      await expect(s.locator("..")).toHaveAttribute("open", "");
    }
    await page.addStyleTag({
      content:
        "html { font-size: 200% !important; } body, p, a, button, input, select, textarea, label, summary { font-size: 1rem !important; }",
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await new Promise((r) =>
        requestAnimationFrame(() => requestAnimationFrame(r)),
      );
    });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth + 1,
      ),
      false,
      "200% overflow",
    );
  });
  await check(`${engine} no runtime errors`, async () =>
    assert.deepEqual(errors, []),
  );
  const nojs = await browser.newPage({ javaScriptEnabled: false });
  await check(`${engine} no JS`, async () => {
    await nojs.goto(base);
    await expect(nojs.locator("fieldset")).toHaveAttribute("disabled", "");
    await expect(nojs.locator("h1")).toBeVisible();
  });
  await browser.close();
}
await writeFile(
  `${out}/${live ? "live" : "local"}-report.json`,
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
