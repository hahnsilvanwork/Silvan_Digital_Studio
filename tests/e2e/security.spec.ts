import { expect, test } from "@playwright/test";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

test("HTML responses carry the enforced security baseline", async ({ request }) => {
  for (const route of ["/", "/en/reviews", "/security-check-missing-page"]) {
    const response = await request.get(route);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy"]).toContain("form-action 'none'");
    expect(response.status()).toBe(route.includes("missing-page") ? 404 : 200);
  }
});

test("CSP blocks injected inline scripts while real pages hydrate", async ({ page }) => {
  for (const path of ["/", "/reviews", "/en/privacy", "/security-check-missing-page"]) {
    const response = await page.goto(path);
    expect(await response?.text()).toMatch(/data-(?:static|nonce)-csp="true"/);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => {
      document.documentElement.dataset.cspProbe = "blocked";
      const script = document.createElement("script");
      script.textContent = 'document.documentElement.dataset.cspProbe = "executed"';
      document.head.append(script);
    });
    expect(await page.locator("html").getAttribute("data-csp-probe")).toBe("blocked");
  }
  await page.goto("/");
  await page.locator('footer a[href="/privacy"]').click();
  await expect(page).toHaveURL(/\/privacy$/);
  await expect(page.locator("h1")).toContainText("Daten");
});

test("all bundled demo forms fail closed without JavaScript and still work with it", async ({ baseURL }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Standalone script uses Chromium; normal journeys cover other engines.");
  test.setTimeout(120_000);
  const paths = ["falkenried/kontakt/", "falkenried/en/contact/", "falkenried/gartenbau/", "falkenried/en/gartenbau/", "falkenried/immobilien/", "falkenried/en/immobilien/", "cafe/kontakt/", "handwerk/", "salon/kontakt/"];
  const result = await promisify(execFile)(process.execPath, ["scripts/test-demo-form-safety.mjs", ...paths.map(path => `${baseURL}/demos/${path}`)], { timeout: 110_000 });
  expect(result.stderr).not.toContain("FAIL");
});

test("local product models never request or execute an external 3D runtime", async ({ page }) => {
  let requests = 0;
  await page.route("https://cdn.spline.design/@splinetool/viewer@2.0.16/build/spline-viewer.js", route => route.fulfill({
    contentType: "application/javascript", headers: { "access-control-allow-origin": "*" },
    body: 'document.documentElement.dataset.tamperedRuntime = "executed";',
  }));
  page.on('request', request => { if (/spline\.design/.test(request.url())) requests++; });
  await page.goto("/reviews");
  await page.getByRole("button", { name: "In 3D ansehen" }).first().click();
  await expect(page.locator('[data-product-3d-dialog]')).toBeVisible();
  await expect(page.locator('[data-local-product-stage][data-model-ready=true]')).toBeVisible();
  expect(requests).toBe(0);
  await expect(page.locator("html")).not.toHaveAttribute("data-tampered-runtime", "executed");
});

test("same-origin requests do not disclose inquiry query data in the referrer", async ({ page }) => {
  let referrer: string | undefined;
  await page.route("**/privacy-referrer-check", async (route) => {
    referrer = route.request().headers().referer;
    await route.fulfill({ status: 200, body: "ok" });
  });
  await page.goto("/reviews?name=Private&message=Sensitive#inquiry");
  await page.evaluate(() => fetch("/privacy-referrer-check"));
  expect(referrer).toBe(`${new URL(page.url()).origin}/`);
});
