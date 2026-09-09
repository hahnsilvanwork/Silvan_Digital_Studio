import { chromium } from "playwright";
import assert from "node:assert/strict";

const baseURL = process.env.MOTION_CHECK_URL ?? "http://localhost:3005";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", error => errors.push(error.message));
try {
  await page.goto(`${baseURL}/reviews`);
  const hero = page.locator("[data-nfc-motion]");
  await page.waitForFunction(() => document.querySelector("[data-nfc-motion]")?.getAttribute("data-running") === "true");
  assert.equal(await hero.locator("button").count(), 0);
  await page.waitForTimeout(700);
  const animations = () => hero.evaluate(el => el.getAnimations({ subtree: true }).map(a => ({ name: a.animationName, state: a.playState, time: a.currentTime })));
  assert.equal(await hero.getAttribute("data-running"), "true");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "docs/video/nfc-hero/local-motion-desktop.png" });
  // The phone's upper reader reaches the card before the notification and tap.
  const inspectBeat = async (time) => {
    await hero.evaluate((el, time) => { for (const a of el.getAnimations({ subtree: true })) { a.pause(); a.currentTime = time; } }, time);
    return hero.locator('[data-index="0"]').evaluate(el => {
      const reader = el.querySelector("[data-nfc-reader]").getBoundingClientRect();
      const target = el.querySelector("[data-nfc-target]").getBoundingClientRect();
      const opacity = name => Number(getComputedStyle(el.querySelector(name)).opacity);
      return { distance: Math.hypot(reader.x - target.x - target.width / 2, reader.y - target.y - target.height / 2), notification: opacity("[data-nfc-notification]"), tap: opacity("[data-nfc-tap]"), screen: opacity("[data-nfc-screen]") };
    });
  };
  const idle = await inspectBeat(500);
  const contact = await inspectBeat(1950);
  assert.ok(contact.distance < 15 && contact.distance < idle.distance / 5);
  assert.ok(contact.notification > .95 && contact.screen === 0);
  const tap = await inspectBeat(3360);
  assert.ok(tap.tap > .5 && tap.screen === 0);
  assert.ok((await inspectBeat(4500)).screen > .95);
  await hero.evaluate(el => { for (const a of el.getAnimations({ subtree: true })) a.play(); });
  // Inspect all five shots and the loop seam at deterministic points.
  for (const time of [5000, 12500, 20000, 27500, 35000, 37510]) {
    await hero.evaluate((el, time) => { for (const a of el.getAnimations({ subtree: true })) a.currentTime = time; }, time);
    await page.waitForTimeout(35);
    const visible = await hero.locator("[data-index]").evaluateAll(els => els.filter(el => Number(getComputedStyle(el).opacity) > .95).map(el => el.dataset.index));
    assert.deepEqual(visible, [String(Math.floor(time / 7500) % 5)]);
    if (time === 20000) await hero.screenshot({ path: "docs/video/nfc-hero/local-motion-instagram.png" });
  }
  await page.locator("#products").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await hero.getAttribute("data-running"), "false");
  await page.setViewportSize({ width: 390, height: 844 });
  await hero.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  assert.equal(await hero.getAttribute("data-running"), "true");
  await page.screenshot({ path: "docs/video/nfc-hero/local-motion-mobile.png" });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.waitForTimeout(100);
  assert.equal(await hero.getAttribute("data-static"), "true");
  assert.equal(await hero.locator("button").count(), 0);
  assert.equal((await animations()).length, 0);
  await page.goto(`${baseURL}/en/reviews`);
  await page.locator("[data-nfc-motion]").waitFor();
  assert.match(await page.locator("[data-nfc-motion]").innerText(), /Product examples with fictional profiles/);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto(`${baseURL}/reviews`);
  assert.equal(await staticPage.locator("[data-nfc-motion]").getAttribute("data-static"), "true");
  await context.close();
  assert.deepEqual(errors, []);
  console.log("PASS: five scenes + loop, no pause button, offscreen, mobile overflow, reduced motion, English, no-JS, no page errors.");
} finally {
  await browser.close();
}
