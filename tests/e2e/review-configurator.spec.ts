import { expect, test, type Page } from "@playwright/test";

import { activeElement, waitForHydration } from "./support";

const VALID = {
  destination: "menu",
  product: "personalized-card",
  shape: "round",
  size: "100",
  quantity: "2",
  businessName: "Beispiel AG",
  contactPerson: "Silvan Hahn",
  setup: "ready",
  destinationUrl: "https://beispiel.ch/menu",
} as const;

async function fillInquiry(page: Page, quantity: string = VALID.quantity) {
  for (const name of ["destination", "product", "shape", "size", "setup"] as const) {
    await page.selectOption(`[name="${name}"]`, VALID[name]);
  }
  await page.fill('[name="quantity"]', quantity);
  await page.fill('[name="businessName"]', VALID.businessName);
  await page.fill('[name="contactPerson"]', VALID.contactPerson);
  await page.fill('[name="destinationUrl"]', VALID.destinationUrl);
}

test.describe("NFC solution configurator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/reviews#inquiry");
    await waitForHydration(page);
  });

  test("reports relevant missing fields and focuses the destination", async ({ page }) => {
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();
    await expect(page.getByText("Bitte füllen Sie dieses Feld aus.")).toHaveCount(8);
    expect(await activeElement(page)).toMatchObject({ name: "destination" });
  });

  test("removes shape and size when a stand is selected", async ({ page }) => {
    await page.selectOption('[name="product"]', "standard-stand");
    await expect(page.locator('[name="shape"]')).toHaveCount(0);
    await expect(page.locator('[name="size"]')).toHaveCount(0);
  });

  test("distinguishes an invalid quantity", async ({ page }) => {
    await fillInquiry(page, "0");
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();
    await expect(page.getByText("Bitte geben Sie eine gültige Menge ab 1 ein.")).toBeVisible();
    expect(await activeElement(page)).toMatchObject({ name: "quantity" });
  });

  test("builds a complete non-binding menu inquiry and preserves values on edit", async ({ page }) => {
    await fillInquiry(page);
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    const link = page.getByRole("link", { name: /Anfrage in WhatsApp öffnen/ });
    await expect(link).toBeVisible();
    await expect(page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" })).toBeFocused();
    const message = decodeURIComponent((await link.getAttribute("href")) ?? "");
    for (const expected of ["Digitales Menü", "Personalized Card", "Rund", "100 × 100 mm", "Beispiel AG", "https://beispiel.ch/menu", "Mengenrabatt"]) {
      expect(message).toContain(expected);
    }

    await page.getByRole("button", { name: "Angaben bearbeiten" }).click();
    await expect(page.locator('[name="businessName"]')).toHaveValue("Beispiel AG");
    await expect(page.locator('[name="product"]')).toHaveValue("personalized-card");
  });

  test("never submits personal data to the server", async ({ page }) => {
    const leaked: string[] = [];
    page.on("request", (request) => {
      if (request.method() === "POST" || decodeURIComponent(request.url()).includes("Beispiel AG")) leaked.push(request.url());
    });
    await fillInquiry(page);
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();
    await expect(page.getByRole("link", { name: /Anfrage in WhatsApp öffnen/ })).toBeVisible();
    expect(leaked).toEqual([]);
    expect(new URL(page.url()).search).toBe("");
  });
});
