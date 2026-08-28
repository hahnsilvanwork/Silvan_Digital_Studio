import { expect, test, type Page } from "@playwright/test";

import { activeElement, waitForHydration } from "./support";

type InquiryField =
  | "product"
  | "quantity"
  | "variant"
  | "businessName"
  | "contactPerson"
  | "googleUrl"
  | "street"
  | "postalCode"
  | "city";

const VALID: Record<InquiryField, string> = {
  product: "NFC Review Card",
  quantity: "2",
  variant: "Weiss",
  businessName: "Beispiel AG",
  contactPerson: "Silvan Hahn",
  googleUrl: "https://g.page/r/beispiel-ag/review",
  street: "Musterstrasse 1",
  postalCode: "8000",
  city: "Zürich",
};

async function fillInquiry(
  page: Page,
  overrides: Partial<Record<InquiryField, string>> = {},
) {
  const values = { ...VALID, ...overrides };

  await page.selectOption('[name="product"]', values.product);

  for (const [name, value] of Object.entries(values)) {
    if (name === "product") continue;
    await page.fill(`[name="${name}"]`, value);
  }
}

test.describe("review card configurator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/reviews#inquiry");
    await waitForHydration(page);
  });

  test("states that the inquiry is non-binding before it is sent", async ({
    page,
  }) => {
    await expect(
      page.getByText(/Dies ist eine unverbindliche Anfrage/),
    ).toHaveCount(0);
    await expect(
      page.getByText(/Ihre Angaben werden nicht auf dieser Website gespeichert/),
    ).toBeVisible();
  });

  test("reports every missing field and focuses the first one", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    // Every required field reports the same message when it is simply empty;
    // the quantity and link messages are specific to a filled but invalid value.
    // Eight, not nine: the colour/variant field is optional, because the page
    // never publishes which variants exist.
    await expect(page.getByText("Bitte füllen Sie dieses Feld aus.")).toHaveCount(8);
    await expect(page.locator('[aria-invalid="true"]')).toHaveCount(8);

    expect(await activeElement(page)).toMatchObject({ name: "product" });
  });

  test("keeps what the visitor already typed after a failed submit", async ({
    page,
  }) => {
    await page.fill('[name="businessName"]', "Beispiel AG");
    await page.fill('[name="city"]', "Zürich");
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    await expect(page.locator('[name="businessName"]')).toHaveValue("Beispiel AG");
    await expect(page.locator('[name="city"]')).toHaveValue("Zürich");
  });

  test("distinguishes a bad quantity from a missing one", async ({ page }) => {
    await fillInquiry(page, { quantity: "0" });
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    await expect(
      page.getByText("Bitte geben Sie eine gültige Menge ab 1 ein."),
    ).toBeVisible();
    expect(await activeElement(page)).toMatchObject({ name: "quantity" });
  });

  test("rejects a review link that is not https", async ({ page }) => {
    await fillInquiry(page, { googleUrl: "javascript:alert(1)" });
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    await expect(
      page.getByText("Bitte geben Sie einen gültigen Google-Link ein."),
    ).toBeVisible();
    expect(await activeElement(page)).toMatchObject({ name: "googleUrl" });
  });

  test("builds a readable WhatsApp message only once the inquiry is valid", async ({
    page,
  }) => {
    await fillInquiry(page);
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();

    const confirmLink = page.getByRole("link", {
      name: /Anfrage in WhatsApp öffnen/,
    });

    await expect(confirmLink).toBeVisible();

    // Focus lands on the heading, not on the link. Landing on the link
    // announced only "open in WhatsApp", leaving the visitor one keypress from
    // sending a message they were never told they could check first.
    await expect(
      page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" }),
    ).toBeFocused();
    await expect(
      page.getByText(/Dies ist eine unverbindliche Anfrage/),
    ).toBeVisible();

    const href = await confirmLink.getAttribute("href");
    expect(href).toContain("wa.me/41789008500");

    const message = decodeURIComponent(href?.split("?text=")[1] ?? "");
    expect(message).toContain("Beispiel AG");
    expect(message).toContain("8000");
    expect(message).toContain("Zürich");
    expect(message).toContain(
      "Dies ist eine unverbindliche Anfrage. Sie wird erst nach meiner persönlichen Bestätigung verbindlich.",
    );
    // The optional note was left empty, so it must not appear as a blank line.
    expect(message).not.toContain("Optionale Nachricht:");
  });

  test("returns to the form with the values intact", async ({ page }) => {
    await fillInquiry(page);
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();
    await page.getByRole("button", { name: "Angaben bearbeiten" }).click();

    await expect(page.locator('[name="businessName"]')).toHaveValue("Beispiel AG");
    await expect(page.locator('[name="product"]')).toHaveValue("NFC Review Card");
  });

  test("nothing is submitted to a server", async ({ page }) => {
    // Watching for POSTs alone missed the way this could actually leak: the
    // form carries no action, so a native submit would GET the current URL with
    // the visitor's name, company and postal address in the query string --
    // into history, the next Referer and the server log. Every request is
    // inspected for the entered values, whatever its method.
    const leaked: string[] = [];
    page.on("request", (request) => {
      const url = request.url();
      if (request.method() === "POST") leaked.push(url);
      if (/Beispiel\+?%?2?0?AG|Bahnhofstrasse|8001/i.test(decodeURIComponent(url))) {
        leaked.push(url);
      }
    });

    await fillInquiry(page);
    await page.getByRole("button", { name: "Anfrage in WhatsApp öffnen" }).click();
    await expect(
      page.getByRole("link", { name: /Anfrage in WhatsApp öffnen/ }),
    ).toBeVisible();

    expect(leaked).toEqual([]);
    // And the page never navigated: a native submit would have reloaded it.
    expect(new URL(page.url()).search).toBe("");
  });
});
