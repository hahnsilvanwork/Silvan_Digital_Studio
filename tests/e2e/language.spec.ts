import { expect, test } from "@playwright/test";

test.describe("language switching", () => {
  test("keeps the visitor on the equivalent route", async ({ page }) => {
    await page.goto("/reviews");
    await page.getByRole("link", { name: "Englisch" }).click();

    await expect(page).toHaveURL(/\/en\/reviews$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");

    await page.getByRole("link", { name: "German" }).click();
    await expect(page).toHaveURL(/\/reviews$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "de");
  });

  test("keeps the project slug on a detail page", async ({ page }) => {
    await page.goto("/work/architech-studio");
    await page.getByRole("link", { name: "Englisch" }).click();

    await expect(page).toHaveURL(/\/en\/work\/architech-studio$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "ArchiTech Studio",
    );
  });

  test("marks the active language and works without client JavaScript", async ({
    browser,
  }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();

    await page.goto("/about");

    const active = page.locator('[aria-current="true"]');
    await expect(active).toHaveCount(1);
    await expect(active).toContainText("DE");

    // Two plain links, so this has to work with no bundle at all.
    await page.getByRole("link", { name: "Englisch" }).click();
    await expect(page).toHaveURL(/\/en\/about$/);

    await context.close();
  });

  test("translates the page, not just the route", async ({ page }) => {
    await page.goto("/en");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "More customers",
    );
    await expect(page.getByRole("link", { name: "Skip to content" })).toHaveCount(1);
  });

  test("serves a localized 404 with a way back", async ({ page }) => {
    // The only route in the app that is not prerendered, so it is the one that
    // queues when four browser projects share a single server. The assertions
    // are about what the page offers, not about how fast it answers.
    test.slow();

    const response = await page.goto("/work/does-not-exist", {
      waitUntil: "domcontentloaded",
    });

    expect(response?.status()).toBe(404);

    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toBeVisible();
    // Spec 10: the way back has to include Work and Contact, not only home.
    await expect(main.getByRole("link", { name: "Zur Startseite" })).toBeVisible();
    await expect(main.getByRole("link", { name: "Arbeiten ansehen" })).toBeVisible();
    await expect(
      main.getByRole("link", { name: "Kontakt aufnehmen" }),
    ).toBeVisible();
  });
});
