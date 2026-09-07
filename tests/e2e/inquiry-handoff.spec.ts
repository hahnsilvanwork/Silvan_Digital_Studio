import { expect, test } from "@playwright/test";

test("selected model survives review and all message alternatives agree", async ({ page }) => {
  await page.goto("/reviews");
  await page.getByRole("link", { name: "Dieses Modell anfragen", exact: true }).first().click();
  await expect(page.locator('[name="product"]')).toHaveValue("standard-card");
  await expect(page.locator('[name="shape"]')).toHaveValue("round");
  await expect(page.locator('[name="quantity"]')).toHaveValue("1");
  await page.selectOption('[name="size"]', "100");
  await page.selectOption('[name="setup"]', "needs-setup");
  await page.getByRole("button", { name: "Angaben prüfen", exact: true }).click();
  const summary = page.locator('[data-inquiry-summary]');
  await expect(summary).toContainText("Standard Card · Rund Schwarz");
  await expect(summary).toContainText("100 × 100 mm");
  for (const name of [/Anfrage in WhatsApp öffnen/, /Per E-Mail anfragen/]) {
    expect(decodeURIComponent((await summary.getByRole("link", { name }).getAttribute("href"))!)).toContain("Standard Card · Rund Schwarz");
  }
  await page.getByRole("link", { name: "Dieses Modell anfragen", exact: true }).first().click();
  await expect(summary).toHaveCount(0);
  await expect(page.locator('[name="destination"]')).toBeFocused();
  await page.getByRole("button", { name: "Angaben prüfen", exact: true }).click();
  await expect(summary).toBeVisible();
  await page.getByRole("button", { name: "Menü 3 Produkte", exact: true }).click();
  await expect(summary).toHaveCount(0);
  await expect(page).toHaveURL(/category=menu/);
  expect(new URL(page.url()).searchParams.has("model")).toBe(false);
});

test("editing a preset keeps focus on the field being changed", async ({ page }) => {
  await page.goto("/reviews?category=reviews&model=review-round-black#inquiry");
  const shape = page.locator('[name="shape"]');
  await expect(shape).toHaveValue("round");
  await shape.focus();
  await shape.selectOption("square");
  await expect(shape).toBeFocused();
  await expect(shape).toHaveValue("square");
  expect(new URL(page.url()).searchParams.has("model")).toBe(false);
});

test("hidden invalid link cannot block review and large quantities are not silently truncated", async ({ page }) => {
  await page.goto("/reviews?category=reviews&model=review-stand-white#inquiry");
  await expect(page.locator('[name="product"]')).toHaveValue("standard-stand");
  await page.selectOption('[name="setup"]', "ready");
  await page.fill('[name="destinationUrl"]', "not-a-url");
  await page.selectOption('[name="setup"]', "needs-setup");
  await page.fill('[name="quantity"]', "1000");
  await expect(page.locator('[name="quantity"]')).toHaveValue("1000");
  await page.getByRole("button", { name: "Angaben prüfen" }).click();
  await expect(page.locator('[name="quantity"]')).toBeFocused();
  await page.fill('[name="quantity"]', "2");
  await page.getByRole("button", { name: "Angaben prüfen" }).click();
  await expect(page.locator('[data-inquiry-summary]')).toBeVisible();
  await expect(page.locator('[data-inquiry-summary]')).not.toContainText("not-a-url");
});

test("English handoff has readable values and a usable clipboard fallback", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(navigator, "clipboard", {
    configurable: true, value: { writeText: () => Promise.reject(new Error("unavailable")) },
  }));
  await page.goto("/en/reviews?category=menu&model=menu-personalized-white#inquiry");
  await expect(page.locator('[name="product"]')).toHaveValue("personalized-card");
  await page.selectOption('[name="size"]', "80");
  await page.selectOption('[name="setup"]', "needs-setup");
  await page.getByRole("button", { name: "Review details" }).click();
  const summary = page.locator('[data-inquiry-summary]');
  await expect(summary).toContainText("80 × 80 mm");
  await expect(summary).toContainText("Round");
  await expect(summary.getByRole("link", { name: "Enquire by email" })).toHaveAttribute("href", /^mailto:/);
  await summary.getByRole("button", { name: "Copy enquiry" }).click();
  const fallback = summary.getByRole("textbox", { name: "Your enquiry text" });
  await expect(fallback).toBeVisible();
  await expect(fallback).toHaveValue(/Digital menu/);
  expect(page.url()).not.toContain("quantity");
});
