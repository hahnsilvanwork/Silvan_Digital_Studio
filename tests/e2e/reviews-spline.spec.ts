import { expect, test, type Page } from "@playwright/test";

const RUNTIME =
  "https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js";

async function stubSpline(page: Page) {
  await page.route(RUNTIME, (route) =>
    route.fulfill({
      contentType: "application/javascript",
      // Stands in for the real runtime so the site integration is tested
      // without depending on Spline uptime. It mimics the parts the page
      // touches: the load event, the application handle, and in-place loading.
      body: `setTimeout(() => {
        if (!customElements.get("spline-viewer")) {
          customElements.define("spline-viewer", class extends HTMLElement {
            connectedCallback() {
              window.__splineLoads = window.__splineLoads ?? [];
              this._spline = {
                load: (url) => {
                  window.__splineLoads.push(url);
                  this.setAttribute("data-loaded-scene", url);
                  return Promise.resolve();
                },
                play: () => { this.setAttribute("data-running", "true"); },
                stop: () => { this.setAttribute("data-running", "false"); },
                setBackgroundColor: () => {},
                _controls: { orbitControls: {
                  autoRotate: false,
                  autoRotateSpeed: 2,
                  autoRotateClockwise: true,
                  hoverRotatePanMode: 1,
                  rotateLeft: (() => {
                    const calls = [];
                    const fn = (angle) => { calls.push(angle); };
                    fn.mock = { calls };
                    return fn;
                  })(),
                } },
              };
              setTimeout(() => {
                this.setAttribute("data-loaded-scene", this.getAttribute("url"));
                this.dispatchEvent(new CustomEvent("load-complete"));
              }, 100);
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

  test("turns the product instead of waiting for a pointer", async ({
    page,
  }) => {
    await page.goto("/reviews");

    const hero = page.locator('[data-spline-placement="hero"] spline-viewer');
    await expect(hero).toHaveAttribute("data-loaded-scene", /splinecode$/);

    expect(
      await hero.evaluate((node: Element) => {
        const { _spline } = node as Element & {
          _spline: {
            _controls: {
              orbitControls: {
                autoRotate: boolean;
                autoRotateSpeed: number;
                hoverRotatePanMode: number;
                rotateLeft: { mock: { calls: readonly unknown[] } };
              };
            };
          };
        };
        const controls = _spline._controls.orbitControls;
        return {
          autoRotate: controls.autoRotate,
          hover: controls.hoverRotatePanMode,
          secondsPerTurn: Math.round(18.5 / controls.autoRotateSpeed),
          startsOffCentre: controls.rotateLeft.mock.calls.length > 0,
        };
      }),
    ).toEqual({
      autoRotate: true,
      hover: 0,
      // The hero sits beside the headline, so it turns at half the pace of
      // the product section below.
      secondsPerTurn: 60,
      startsOffCentre: true,
    });
  });

  test("cycles the hero products inside the same viewer", async ({ page }) => {
    await page.goto("/reviews");

    const hero = page.locator('[data-spline-placement="hero"] spline-viewer');
    const first = await hero.getAttribute("data-loaded-scene");

    // Switching must reuse the canvas: a rebuild would drop the GPU context
    // and pull the whole runtime again.
    await expect(hero).not.toHaveAttribute("data-loaded-scene", first ?? "", {
      timeout: 20000,
    });
    await expect(
      page.locator('[data-spline-placement="hero"] spline-viewer'),
    ).toHaveCount(1);
  });

  test("lets the visitor choose a product in the section below", async ({
    page,
  }) => {
    await page.goto("/reviews");

    const section = page.locator('[data-spline-placement="products"]');
    await section.scrollIntoViewIfNeeded();

    const viewer = section.locator("spline-viewer");
    await expect(viewer).toHaveAttribute("data-loaded-scene", /splinecode$/);
    const before = await viewer.getAttribute("data-loaded-scene");

    const buttons = section.getByRole("button");
    expect(await buttons.count()).toBeGreaterThan(1);

    const box = await buttons.nth(1).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(44);

    await buttons.nth(1).click();
    await expect(buttons.nth(1)).toHaveAttribute("aria-pressed", "true");
    await expect(viewer).not.toHaveAttribute("data-loaded-scene", before ?? "");
    await expect(section.locator("spline-viewer")).toHaveCount(1);
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
