import { expect, test } from "@playwright/test";

import { CONTACT } from "./support";

test.describe("contact actions", () => {
  test("offers the four approved destinations with correct URI schemes", async ({
    page,
  }) => {
    await page.goto("/contact");

    const actions = page.locator("main a[href]");

    await expect(
      actions.filter({ hasText: CONTACT.email }),
    ).toHaveAttribute("href", `mailto:${CONTACT.email}`);
    await expect(
      actions.filter({ hasText: CONTACT.phoneDisplay }),
    ).toHaveAttribute("href", CONTACT.phoneHref);
    await expect(
      actions.filter({ hasText: CONTACT.whatsApp }).first(),
    ).toHaveAttribute("href", /^https:\/\/wa\.me\/41789008500/);
    await expect(
      actions.filter({ hasText: "silvan-hahn-dev" }).first(),
    ).toHaveAttribute("href", CONTACT.linkedIn);
  });

  test("external destinations open safely", async ({ page }) => {
    await page.goto("/contact");

    const external = page.locator('main a[target="_blank"]');
    const count = await external.count();

    expect(count).toBeGreaterThan(0);

    for (let index = 0; index < count; index += 1) {
      const link = external.nth(index);

      await expect(link).toHaveAttribute("rel", /noopener/);
      await expect(link).toHaveAttribute("rel", /noreferrer/);
      // Opening a new tab is announced rather than left as a surprise.
      await expect(link).toContainText(/Öffnet einen externen Link/);
    }
  });

  test("the NFC landing page reaches contact without any navigation", async ({
    page,
  }) => {
    await page.goto("/hello");

    const main = page.getByRole("main");

    await expect(main.locator(`a[href="mailto:${CONTACT.email}"]`)).toBeVisible();
    await expect(main.locator(`a[href="${CONTACT.phoneHref}"]`)).toBeVisible();
    await expect(
      main.locator("a[href^='https://wa.me/41789008500']"),
    ).toBeVisible();
  });

  test("every contact row is a comfortable target", async ({ page }) => {
    await page.goto("/contact");

    const rows = page.locator("main a[href]");
    const count = await rows.count();

    for (let index = 0; index < count; index += 1) {
      const box = await rows.nth(index).boundingBox();

      expect(box?.height ?? 0).toBeGreaterThanOrEqual(44);
    }
  });

  test("the English page keeps the same destinations", async ({ page }) => {
    await page.goto("/en/contact");

    await expect(
      page.locator(`main a[href="mailto:${CONTACT.email}"]`),
    ).toBeVisible();
    await expect(
      page.locator(`main a[href="${CONTACT.phoneHref}"]`),
    ).toBeVisible();
  });
});
