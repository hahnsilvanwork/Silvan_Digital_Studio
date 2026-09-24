import { chromium, webkit, expect } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const axe = await readFile(require.resolve("axe-core/axe.min.js"), "utf8");
const base = process.env.CAFE_URL || "http://127.0.0.1:3201";
const live = !!process.env.CAFE_URL;
const out = "artifacts/cafe-2026-09-24";
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
function future(day) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + 8);
  while (d.getUTCDay() !== day) d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}
for (const [engine, type] of Object.entries(
  live ? { chromium } : { chromium, webkit },
)) {
  const browser = await type.launch();
  const page = await browser.newPage({
    viewport: { width: 390, height: 900 },
    reducedMotion: "reduce",
  });
  const runtime = [];
  page.on("pageerror", (e) => runtime.push(e.message));
  for (const width of live ? [390, 1440] : [320, 390, 768, 1440])
    for (const route of ["/", "/speisekarte/", "/ueber-uns/", "/kontakt/"])
      await check(`${engine} ${width} ${route}`, async () => {
        await page.setViewportSize({ width, height: 900 });
        const r = await page.goto(base + route, { waitUntil: "networkidle" });
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
        assert.ok(
          await page.locator("meta[name=description]").getAttribute("content"),
        );
        assert.deepEqual(
          await page.evaluate(() =>
            [...document.images]
              .filter((i) => !i.naturalWidth)
              .map((i) => i.src),
          ),
          [],
        );
        await page.evaluate(axe);
        const result = await page.evaluate(async () =>
          (
            await axe.run(document, {
              runOnly: {
                type: "tag",
                values: ["wcag2a", "wcag2aa", "wcag21aa"],
              },
            })
          ).violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        );
        assert.deepEqual(result, [], "axe");
        if (!live && engine === "chromium" && [390, 1440].includes(width)) {
          const slug = route === "/" ? "home" : route.replaceAll("/", "");
          await page.screenshot({
            path: `${out}/${slug}-${width}.png`,
            fullPage: true,
          });
          if (route === "/")
            await page.screenshot({ path: `${out}/hero-${width}.png` });
        }
      });
  await check(`${engine} mobile navigation and desktop reset`, async () => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(base);
    const t = page.locator(".menu-toggle");
    await t.click();
    await expect(t).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(t).toBeFocused();
    await expect(t).toHaveAttribute("aria-expanded", "false");
    await t.click();
    await page.setViewportSize({ width: 1440, height: 900 });
    await expect(t).toHaveAttribute("aria-expanded", "false");
    await page.setViewportSize({ width: 390, height: 900 });
    await expect(page.locator(".main-navigation")).toBeHidden();
    await t.click();
    await page
      .getByRole("navigation", { name: "Hauptnavigation" })
      .getByRole("link", { name: "Speisekarte", exact: true })
      .click();
    await expect(page).toHaveURL(/speisekarte/);
    await expect(t).toHaveAttribute("aria-expanded", "false");
    await t.click();
    await expect(
      page
        .getByRole("navigation", { name: "Hauptnavigation" })
        .getByRole("link", { name: "Speisekarte", exact: true }),
    ).toHaveAttribute("aria-current", "page");
    await t.click();
  });
  await check(`${engine} menu categories`, async () => {
    await page.goto(base + "/speisekarte/");
    for (const link of await page
      .getByRole("navigation", { name: "Kategorien der Speisekarte" })
      .getByRole("link")
      .all()) {
      const href = await link.getAttribute("href");
      await link.click();
      await expect(page.locator(href)).toBeVisible();
    }
    assert.equal(await page.locator(".menu-item").count(), 22);
  });
  await check(`${engine} reservation slots`, async () => {
    await page.goto(base + "/kontakt/");
    await expect(page.locator("#time")).toBeDisabled();
    for (const [day, first, last, count] of [
      [1, "07:00", "17:30", 22],
      [6, "08:00", "16:30", 18],
      [0, "08:00", "15:30", 16],
    ]) {
      await page.locator("#date").fill(future(day));
      await expect(page.locator("#time option")).toHaveCount(count + 1);
      await expect(page.locator("#time option").nth(1)).toHaveAttribute(
        "value",
        first,
      );
      await expect(page.locator("#time option").last()).toHaveAttribute(
        "value",
        last,
      );
    }
    await page.locator("#time").selectOption("10:00");
    await page.locator("#holiday").check();
    await expect(page.locator("#time")).toHaveValue("");
    await expect(page.locator("#time option")).toHaveCount(11);
    await expect(page.locator("#time option").nth(1)).toHaveAttribute(
      "value",
      "09:00",
    );
    await page.locator("#time").selectOption("10:00");
    await page.locator("#date").fill(future(1));
    await expect(page.locator("#time")).toHaveValue("");
  });
  await check(`${engine} reservation review/edit/clear privacy`, async () => {
    await page.goto(base + "/kontakt/");
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    await expect(page.locator("#name")).toBeFocused();
    await expect(page.locator(".reservation-form [role=alert]")).toBeVisible();
    await page.locator("#name").fill("Test Gast");
    await page.locator("#email").fill("gast@example.com");
    await page.locator("#phone").fill("000 000 00 00");
    await page.locator("#persons").selectOption("2");
    await page.locator("#date").fill(future(1));
    await page.locator("#time").selectOption("10:00");
    await page.locator("#message").fill("Ein ruhiger Tisch am Fenster.");
    const requests = [];
    const listener = (r) =>
      requests.push({ method: r.method(), type: r.resourceType() });
    page.on("request", listener);
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    const summary = page.getByTestId("reservation-summary");
    await expect(summary).toBeFocused();
    await expect(summary).toContainText("gast@example.com");
    await expect(summary).toContainText("10:00");
    await expect(summary).toContainText("Ein ruhiger Tisch");
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
    page.off("request", listener);
    await page.evaluate(axe);
    assert.deepEqual(
      await page.evaluate(async () =>
        (
          await axe.run(document, {
            runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
          })
        ).violations.map((v) => v.id),
      ),
      [],
    );
    await page.getByRole("button", { name: "Angaben ändern" }).click();
    await expect(page.locator("#name")).toBeFocused();
    await expect(page.locator("#message")).toHaveValue(
      "Ein ruhiger Tisch am Fenster.",
    );
    await page.getByRole("button", { name: "Angaben prüfen" }).click();
    await page.getByRole("button", { name: "Angaben löschen" }).click();
    await expect(page.locator("#name")).toHaveValue("");
    await expect(page.locator("#date")).toHaveValue("");
    await expect(page.locator("#time")).toBeDisabled();
    await expect(page.locator("#message")).toHaveValue("");
  });
  await check(`${engine} 200% text`, async () => {
    for (const route of ["/", "/speisekarte/", "/ueber-uns/", "/kontakt/"]) {
      await page.goto(base + route);
      await page.addStyleTag({
        content:
          "html { font-size:200%!important } p,a,button,input,select,textarea,label,summary,dt,dd {font-size:1rem!important}",
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
        route,
      );
      await page.locator(".menu-toggle").click();
      assert.equal(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth + 1,
        ),
        false,
        route + " menu",
      );
    }
  });
  const nojs = await browser.newPage({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 900 },
  });
  await check(`${engine} no JS`, async () => {
    await nojs.goto(base + "/kontakt/");
    await expect(nojs.locator("fieldset")).toHaveAttribute("disabled", "");
    await expect(
      nojs
        .getByRole("navigation", { name: "Hauptnavigation" })
        .getByRole("link", { name: "Speisekarte", exact: true }),
    ).toBeVisible();
  });
  await check(`${engine} runtime`, () => assert.deepEqual(runtime, []));
  await browser.close();
}
await writeFile(
  `${out}/${live ? "live" : "local"}-report.json`,
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (report.errors.length) process.exitCode = 1;
