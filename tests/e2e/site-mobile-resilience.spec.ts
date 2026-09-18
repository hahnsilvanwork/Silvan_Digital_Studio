import { expect, test } from "@playwright/test";

for (const locale of ["", "/en"]) {
  test(`navigation remains reachable with enlarged text ${locale || "de"}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto(`${locale}/about`);
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    const trigger = page.getByRole("button", { name: locale ? "Open menu" : "Menü öffnen" });
    await expect(trigger).toBeInViewport();
    const bounds = await trigger.boundingBox();
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(320);
    await trigger.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    const contact = dialog.getByRole("link", { name: locale ? "Contact" : "Kontakt", exact: true });
    await contact.scrollIntoViewIfNeeded();
    await expect(contact).toBeInViewport();
    const close = dialog.getByRole("button");
    await expect(close).toBeInViewport();
    await close.click();
    await expect(trigger).toBeFocused();
  });

  test(`short landscape menu keeps close and last destination usable ${locale || "de"}`, async ({ page }) => {
    await page.setViewportSize({ width: 667, height: 320 });
    await page.goto(`${locale}/reviews`);
    await page.getByRole("button", { name: locale ? "Open menu" : "Menü öffnen" }).click();
    const dialog = page.getByRole("dialog");
    const last = dialog.getByRole("link").last();
    await last.scrollIntoViewIfNeeded();
    await expect(last).toBeInViewport();
    await expect(dialog.getByRole("button")).toBeInViewport();
    await last.click();
    await expect(page).toHaveURL(new RegExp(`${locale}/about$`));
  });
}
