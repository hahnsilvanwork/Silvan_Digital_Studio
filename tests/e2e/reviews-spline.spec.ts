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
            this._stopped = false;
            this._spline = {
              play: () => { this._stopped = false; },
              stop: () => { this._stopped = true; },
              setBackgroundColor: () => {},
              _controls: { orbitControls: {
                autoRotate: false, autoRotateSpeed: 2,
                autoRotateClockwise: true, hoverRotatePanMode: 1,
                rotateLeft: () => {}, spherical: { theta: 0 }
              } }
            };
            requestAnimationFrame(() => {
              const box = this.getBoundingClientRect();
              if (box.width === 0 || box.height === 0) {
                console.error("GPUValidationError: texture size is empty");
              }
            });
            setTimeout(() => this.dispatchEvent(new CustomEvent("load-complete")), 50);
          }
          disconnectedCallback() {
            if (!this._stopped) {
              console.error("GPUValidationError: renderer disconnected before stop");
            }
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
      await expect(
        page.locator('[data-product-hero] img[data-fit="contain"]'),
      ).toHaveCSS("object-fit", "contain");
      await expect(page.getByText("CHF 49.–", { exact: true }).first()).toBeVisible();

      for (const control of await page.getByRole("button", { name: /Google Reviews|Menü|Individuell/ }).all()) {
        // Firefox reports a 44 CSS-pixel box as 43.9999 at some scale factors.
        const box = await control.boundingBox();
        expect(box?.height).toBeGreaterThanOrEqual(43.9);
        expect(box?.x).toBeGreaterThanOrEqual(0);
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width);
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

  for (const viewport of [
    { width: 390, height: 568 },
    { width: 1440, height: 700 },
  ]) {
    test(`keeps the complete 3D dialog visible at ${viewport.width}x${viewport.height}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto("/reviews");
      await page.getByRole("button", { name: "In 3D ansehen" }).first().click();

      const dialog = page.locator('[data-product-3d-dialog]');
      const stage = dialog.locator('[data-product-3d-stage]');
      await expect(dialog.locator("spline-viewer")).toHaveCount(1);
      const geometry = await dialog.evaluate((node) => {
        const box = node.getBoundingClientRect();
        return {
          bottom: box.bottom,
          clientHeight: node.clientHeight,
          scrollHeight: node.scrollHeight,
          top: box.top,
        };
      });

      expect(geometry.top).toBeGreaterThanOrEqual(0);
      expect(geometry.bottom).toBeLessThanOrEqual(viewport.height);
      expect(geometry.scrollHeight).toBeLessThanOrEqual(geometry.clientHeight);
      expect((await stage.boundingBox())?.height).toBeGreaterThan(0);
      await expect(dialog.getByRole("button", { name: "3D-Ansicht schliessen" })).toBeVisible();
    });
  }

  test("stops the renderer during repeated backdrop closes without zero-size errors", async ({ page }) => {
    const gpuErrors: string[] = [];
    page.on("console", (message) => {
      if (/texture size|depthBuffer|swapchain texture|GPUValidationError/i.test(message.text())) {
        gpuErrors.push(message.text());
      }
    });
    await page.goto("/reviews");

    const trigger = page.getByRole("button", { name: "In 3D ansehen" }).first();
    for (let attempt = 0; attempt < 3; attempt += 1) {
      await trigger.click();
      await expect(page.locator("spline-viewer")).toHaveCount(1);
      await expect(page.locator('[data-spline-state="ready"]')).toHaveCount(1);
      await page.mouse.click(2, 2);
      await expect(page.locator('[data-product-3d-dialog]')).toHaveCount(0);
    }

    expect(gpuErrors).toEqual([]);
  });

  test("shows exactly three menu placeholders", async ({ page }) => {
    await page.goto("/reviews");
    await page.getByRole("button", { name: "Menü 3 Produkte", exact: true }).click();
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
