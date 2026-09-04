import { expect, test, type Page } from "@playwright/test";

const RUNTIME =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

async function stubSpline(page: Page) {
  await page.route(RUNTIME, (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `if (!customElements.get("spline-viewer")) {
        customElements.define("spline-viewer", class extends HTMLElement {
          connectedCallback() {
            this._spline = {
              play: () => {}, stop: () => {}, setBackgroundColor: () => {},
              _controls: { orbitControls: {
                autoRotate: false, autoRotateSpeed: 2,
                autoRotateClockwise: true, hoverRotatePanMode: 1,
                rotateLeft: () => {}, spherical: { theta: 0 }
              } }
            };
            setTimeout(() => this.dispatchEvent(new CustomEvent("load-complete")), 50);
          }
        });
      }`,
    }),
  );
}

test.describe("image-first NFC product catalogue", () => {
  test.beforeEach(async ({ page }) => stubSpline(page));

  for (const width of [320, 768, 1024, 1280, 1536]) {
    test(`fits the viewport and keeps prices visible at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/reviews");

      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
      await expect(page.locator("spline-viewer")).toHaveCount(0);
      await expect(page.locator('[data-product-hero] img')).toHaveCount(3);
      await expect(page.getByText("CHF 49.–", { exact: true }).first()).toBeVisible();

      for (const control of await page.getByRole("button", { name: /Google Reviews|Menü|Individuell/ }).all()) {
        // Firefox reports a 44 CSS-pixel box as 43.9999 at some scale factors.
        expect((await control.boundingBox())?.height).toBeGreaterThanOrEqual(43.9);
      }
    });
  }

  test("loads one 3D scene only after a deliberate click and removes it on close", async ({ page }) => {
    let runtimeRequests = 0;
    page.on("request", (request) => {
      if (request.url() === RUNTIME) runtimeRequests += 1;
    });
    await page.goto("/reviews");
    expect(runtimeRequests).toBe(0);

    const trigger = page.getByRole("button", { name: "In 3D ansehen" }).first();
    await trigger.click();
    const dialog = page.locator('[data-product-3d-dialog]');
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("spline-viewer")).toHaveCount(1);
    await expect.poll(() => runtimeRequests).toBe(1);

    const box = await dialog.boundingBox();
    const viewport = page.viewportSize();
    expect(box && viewport && box.width <= viewport.width && box.height <= viewport.height).toBe(true);

    await dialog.getByRole("button", { name: "3D-Ansicht schliessen" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page.locator("spline-viewer")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });

  test("shows exactly three menu placeholders", async ({ page }) => {
    await page.goto("/reviews");
    await page.getByRole("button", { name: "Menü", exact: true }).click();
    await expect(page.getByText("3D-Modell folgt")).toHaveCount(3);
    await expect(page.locator("spline-viewer")).toHaveCount(0);
  });

  test("keeps the first hero image still under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/reviews");
    const first = page.locator('[data-product-hero] img').first();
    await expect(first).toHaveAttribute("data-active", "true");
    await page.waitForTimeout(6000);
    await expect(first).toHaveAttribute("data-active", "true");
  });
});
