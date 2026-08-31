import { expect, test, type Page } from "@playwright/test";

const RUNTIME =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

async function stubSpline(page: Page) {
  await page.route(RUNTIME, (route) =>
    route.fulfill({
      contentType: "application/javascript",
      body: `setTimeout(() => {
        if (!customElements.get("spline-viewer")) {
          customElements.define("spline-viewer", class extends HTMLElement {
            connectedCallback() {
              setTimeout(() => this.dispatchEvent(new CustomEvent("load-complete")), 100);
            }
          });
        }
      }, 100);`,
    }),
  );
}

test.describe("Google Review Spline products", () => {
  test.beforeEach(async ({ page }) => {
    await stubSpline(page);
  });

  for (const width of [320, 375, 390, 430]) {
    test(`fits and scrolls at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/reviews");

      const heroPlacement = page.locator('[data-spline-placement="hero"]');
      const hero = heroPlacement.getByRole("img");
      const state = hero.locator("[data-spline-state]");
      const cta = page.getByRole("link", {
        name: "Unverbindlich anfragen",
      });

      await expect(hero).toBeVisible();
      expect(
        await page.evaluate(() => ({
          clientWidth: document.documentElement.clientWidth,
          scrollWidth: document.documentElement.scrollWidth,
        })),
      ).toEqual({ clientWidth: width, scrollWidth: width });
      expect(
        await cta.evaluate(
          (node) => {
            const placement = document.querySelector(
              '[data-spline-placement="hero"]',
            );

            return (
              placement !== null &&
              Boolean(
              node.compareDocumentPosition(
                  placement,
              ) & Node.DOCUMENT_POSITION_FOLLOWING,
              )
            );
          },
        ),
      ).toBe(true);

      const before = await hero.boundingBox();
      await expect(state).toHaveAttribute("data-spline-state", "ready");
      const after = await hero.boundingBox();

      expect(after?.width).toBeCloseTo(before?.width ?? 0, 0);
      expect(after?.height).toBeCloseTo(before?.height ?? 0, 0);
      await expect(hero).toHaveCSS("touch-action", "pan-y");

      await hero.scrollIntoViewIfNeeded();
      const startY = await page.evaluate(() => scrollY);

      if (test.info().project.use.hasTouch) {
        // Mobile WebKit exposes no wheel. The equivalent guarantee there is
        // that the viewer only claims horizontal gestures and that the
        // document itself is never scroll-locked by the 3D surface.
        await expect(heroPlacement.locator("spline-viewer")).toHaveCSS(
          "touch-action",
          "pan-y",
        );
        await page.evaluate(() => scrollBy(0, 500));
      } else {
        const box = await hero.boundingBox();
        if (!box) throw new Error("Hero Spline frame has no box");
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.wheel(0, 500);
      }

      await expect
        .poll(() => page.evaluate(() => scrollY))
        .toBeGreaterThan(startY);

      await cta.click();
      await expect(page).toHaveURL(/#inquiry$/);
    });
  }

  test("never rebuilds a scene while the visitor scrolls", async ({ page }) => {
    await page.addInitScript(() => {
      const created: string[] = [];
      (window as unknown as { __created: string[] }).__created = created;
      const observer = new MutationObserver((records) => {
        for (const record of records) {
          for (const node of record.addedNodes) {
            if (node.nodeName === "SPLINE-VIEWER") created.push("viewer");
          }
        }
      });
      const start = () =>
        observer.observe(document.documentElement, {
          childList: true,
          subtree: true,
        });

      if (document.documentElement) start();
      else document.addEventListener("readystatechange", start, { once: true });
    });

    await page.goto("/reviews");
    await expect(page.locator("spline-viewer")).toHaveCount(1);

    const products = page.locator('[data-spline-placement="products"]');
    await products.scrollIntoViewIfNeeded();
    await expect(products.locator("[data-spline-state]")).toHaveAttribute(
      "data-spline-state",
      "ready",
    );

    // Scrolling back and forth used to tear each scene down and rebuild it,
    // which re-downloaded the scene and flooded the console with WebGPU
    // swapchain errors.
    for (let pass = 0; pass < 2; pass += 1) {
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(300);
      await products.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
    }

    expect(
      await page.evaluate(
        () => (window as unknown as { __created: string[] }).__created.length,
      ),
    ).toBe(2);
    await expect(page.locator("spline-viewer")).toHaveCount(2);
  });

  test("uses two hero columns on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/reviews");

    const copy = await page.locator("[data-reviews-hero-copy]").boundingBox();
    const product = await page
      .locator('[data-spline-placement="hero"]')
      .boundingBox();

    if (!copy || !product) throw new Error("Desktop hero boxes are missing");
    expect(copy.x + copy.width).toBeLessThanOrEqual(product.x);
  });

  test("uses only the static representation with reduced motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/reviews");

    await expect(page.locator("spline-viewer")).toHaveCount(0);
    await expect(
      page.locator('[data-spline-state="reduced-motion"]'),
    ).toHaveCount(2);
  });
});
