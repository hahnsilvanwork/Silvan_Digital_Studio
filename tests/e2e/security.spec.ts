import { expect, test } from "@playwright/test";

test("HTML responses carry the enforced security baseline and CSP trial", async ({ request }) => {
  for (const route of ["/", "/en/reviews", "/security-check-missing-page"]) {
    const response = await request.get(route);
    const headers = response.headers();
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin");
    expect(headers["x-frame-options"]).toBe("DENY");
    expect(headers["permissions-policy"]).toContain("camera=()");
    expect(headers["content-security-policy"]).toContain("frame-ancestors 'none'");
    expect(headers["content-security-policy-report-only"]).toContain("script-src 'self'");
    expect(response.status()).toBe(route.includes("missing-page") ? 404 : 200);
  }
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
