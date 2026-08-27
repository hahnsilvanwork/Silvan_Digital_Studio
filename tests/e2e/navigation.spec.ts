import { expect, test } from "@playwright/test";

import { isDrawerViewport } from "./support";

test.describe("global navigation", () => {
  test("marks the page the visitor is on", async ({ page }) => {
    await page.goto("/reviews");

    const current = page.locator('[aria-current="page"]');

    await expect(current).toHaveCount(1);
    await expect(current).toHaveText("Google Reviews");
  });

  test("the wordmark returns to the home page", async ({ page }) => {
    await page.goto("/about");
    await page.getByRole("banner").getByRole("link", { name: /SILVAN/ }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Mehr Kunden",
    );
  });

  test("the skip link becomes visible on focus and reaches main", async ({
    page,
  }) => {
    await page.goto("/");

    const skipLink = page.getByRole("link", { name: "Zum Inhalt springen" });

    // Focused directly rather than by pressing Tab: WebKit only moves keyboard
    // focus to links when the platform's "Tab highlights each item" preference
    // is on, which is off by default. That is a browser preference, not this
    // site's behaviour, so the ordering assertion lives in the test below.
    await skipLink.focus();
    await expect(skipLink).toBeFocused();
    // Off-canvas until focused, so it has to be genuinely visible now.
    await expect(skipLink).toBeInViewport();

    await skipLink.press("Enter");
    await expect(page.locator("main")).toHaveAttribute("id");
  });

  test("the skip link is the first stop for the keyboard", async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName === "webkit",
      "WebKit does not tab to links unless the platform preference is enabled.",
    );

    await page.goto("/");
    await page.keyboard.press("Tab");

    await expect(
      page.getByRole("link", { name: "Zum Inhalt springen" }),
    ).toBeFocused();
  });

  test("every primary destination resolves", async ({ page }) => {
    const routes = [
      "/websites",
      "/reviews",
      "/presence",
      "/automation",
      "/work",
      "/about",
      "/contact",
      "/hello",
      "/imprint",
      "/privacy",
      "/work/archa",
    ];

    for (const route of routes) {
      const response = await page.goto(route);

      expect(response?.status(), `${route} should resolve`).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });

  test("the footer reaches the imprint and the privacy statement", async ({
    page,
  }) => {
    // These two are a legal obligation, not a nice-to-have. The footer is the
    // only place they are linked from, so the link is the whole delivery.
    await page.goto("/");

    const footer = page.getByRole("contentinfo");

    await footer.getByRole("link", { name: "Impressum" }).click();
    await expect(page).toHaveURL(/\/imprint$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // The address is the point of the page existing.
    await expect(page.getByRole("main")).toContainText("Regensbergstrasse 23");

    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Datenschutz" })
      .click();
    await expect(page).toHaveURL(/\/privacy$/);
    await expect(page.getByRole("main")).toContainText("Cookie");
  });

  test("no call to action points nowhere", async ({ page }) => {
    await page.goto("/");

    const hrefs = await page
      .locator("main a[href^='/']")
      .evaluateAll((links) =>
        Array.from(new Set(links.map((link) => link.getAttribute("href") ?? ""))),
      );

    expect(hrefs.length).toBeGreaterThan(0);

    for (const href of hrefs) {
      const response = await page.request.get(href);

      expect(response.status(), `${href} should resolve`).toBe(200);
    }
  });
});

test.describe("mobile drawer", () => {
  test.beforeEach(({ page }) => {
    test.skip(!isDrawerViewport(page), "The drawer only exists below 64rem.");
  });

  test("opens on the close button and restores focus to the trigger", async ({
    page,
  }) => {
    await page.goto("/");

    const trigger = page.getByRole("button", { name: "Menü öffnen" });
    await trigger.click();

    const drawer = page.getByRole("dialog", { name: "Menü" });
    await expect(drawer).toBeVisible();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("button", { name: "Menü schliessen" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(drawer).toBeHidden();
    await expect(trigger).toBeFocused();
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  test("keeps Tab inside the drawer", async ({ browserName, page }) => {
    test.skip(
      browserName === "webkit",
      "WebKit does not tab to links unless the platform preference is enabled.",
    );

    await page.goto("/");
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await expect(page.getByRole("dialog", { name: "Menü" })).toBeVisible();

    for (let step = 0; step < 12; step += 1) {
      await page.keyboard.press("Tab");

      const stillInside = await page.evaluate(
        () => document.activeElement?.closest('[role="dialog"]') !== null,
      );

      expect(stillInside, `focus left the drawer on Tab ${step + 1}`).toBe(true);
    }
  });

  test("makes the background inert and locks the page while open", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menü öffnen" }).click();

    await expect(page.locator("body")).toHaveAttribute("data-menu-open", "true");
    await expect(page.locator("[inert]")).toHaveCount(1);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");

    await page.keyboard.press("Escape");

    await expect(page.locator("body")).not.toHaveAttribute("data-menu-open", "true");
    await expect(page.locator("[inert]")).toHaveCount(0);
  });

  test("navigates and closes when a destination is chosen", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await page
      .getByRole("dialog", { name: "Menü" })
      .getByRole("link", { name: "Google Reviews" })
      .click();

    await expect(page).toHaveURL(/\/reviews$/);
    await expect(page.getByRole("dialog", { name: "Menü" })).toBeHidden();
  });

  test("the backdrop closes the drawer", async ({ browserName, page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Menü öffnen" }).click();
    await page.getByTestId("mobile-menu-backdrop").click({ force: true });

    await expect(page.getByRole("dialog", { name: "Menü" })).toBeHidden();
    await expect(page.locator("[inert]")).toHaveCount(0);

    // The backdrop is a pointer convenience; Escape and the close button are the
    // paths that guarantee focus restoration and are asserted above in every
    // browser. WebKit drops focus to the body when a pointer press lands on a
    // non-focusable element, so it cannot be held to this here.
    if (browserName !== "webkit") {
      await expect(page.getByRole("button", { name: "Menü öffnen" })).toBeFocused();
    }
  });
});
