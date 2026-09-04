import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ReviewInquiryConfigurator } from "../../src/components/reviews/ReviewInquiryConfigurator";
import { getContent } from "../../src/lib/locales";
import {
  EMPTY_REVIEW_INQUIRY,
  isPositiveInteger,
  isValidGoogleUrl,
  isValidHttpsUrl,
  validateReviewInquiry,
  visibleInquiryFields,
  type ReviewInquiryValues,
} from "../../src/lib/validation";
import { buildReviewInquiryUrl } from "../../src/lib/whatsapp";

const de = getContent("de");
const en = getContent("en");

const complete: ReviewInquiryValues = {
  destination: "reviews",
  product: "personalized-card",
  shape: "round",
  size: "100",
  quantity: "2",
  businessName: "Ristorante Bellavista",
  contactPerson: "Maria Rossi",
  setup: "ready",
  destinationUrl: "https://g.page/r/bellavista/review",
  note: "Bitte bis Ende Monat.",
};

function labelFor(name: keyof ReviewInquiryValues) {
  return de.reviews.inquiry.fields.find((field) => field.name === name)!.label;
}

async function fillForm(user: ReturnType<typeof userEvent.setup>, values = complete) {
  const selectNames = new Set(["destination", "product", "shape", "size", "setup"]);
  for (const [name, value] of Object.entries(values)) {
    if (!value) continue;
    const control = screen.queryByLabelText(labelFor(name as keyof ReviewInquiryValues));
    if (!control) continue;
    if (selectNames.has(name)) await user.selectOptions(control, value);
    else await user.type(control, value);
  }
}

describe("NFC inquiry validation", () => {
  it("rejects only the relevant required fields", () => {
    const errors = validateReviewInquiry(EMPTY_REVIEW_INQUIRY);
    expect(Object.keys(errors).sort()).toEqual(
      ["destination", "product", "shape", "size", "quantity", "businessName", "contactPerson", "setup"].sort(),
    );
  });

  it("offers the five approved product packages in both languages", () => {
    for (const locale of ["de", "en"] as const) {
      expect(getContent(locale).reviews.inquiry.productOptions.map(({ value }) => value)).toEqual(
        ["standard-card", "standard-pair", "standard-stand", "personalized-card", "fully-custom-card"],
      );
    }
  });

  it("hides card-only choices for the stand", () => {
    expect(visibleInquiryFields({ ...complete, product: "standard-stand" })).not.toEqual(
      expect.arrayContaining(["shape", "size"]),
    );
    expect(validateReviewInquiry({ ...complete, product: "standard-stand", shape: "", size: "" })).toEqual({});
  });

  it("accepts only positive whole quantities", () => {
    expect(isPositiveInteger("25")).toBe(true);
    expect(isPositiveInteger("0")).toBe(false);
    expect(isPositiveInteger("2.5")).toBe(false);
    expect(validateReviewInquiry({ ...complete, quantity: "0" }).quantity).toBe("quantity");
  });

  it("validates HTTPS generally and Google hosts for reviews", () => {
    expect(isValidHttpsUrl("https://restaurant.example/menu")).toBe(true);
    expect(isValidHttpsUrl("javascript:alert(1)")).toBe(false);
    expect(isValidGoogleUrl("https://g.page/r/x/review")).toBe(true);
    expect(isValidGoogleUrl("https://restaurant.example/review")).toBe(false);
    expect(validateReviewInquiry({ ...complete, destinationUrl: "https://restaurant.example" }).destinationUrl).toBe("url");
    expect(validateReviewInquiry({ ...complete, destination: "menu", destinationUrl: "https://restaurant.example/menu" })).toEqual({});
  });

  it("allows setup help without a destination link", () => {
    expect(validateReviewInquiry({ ...complete, setup: "needs-setup", destinationUrl: "" })).toEqual({});
  });
});

describe("WhatsApp message", () => {
  it("uses localized labels and displays selected option labels", () => {
    const url = buildReviewInquiryUrl(complete, "de");
    const message = decodeURIComponent(url.split("?text=")[1]);

    expect(url.startsWith("https://wa.me/41789008500?text=")).toBe(true);
    expect(message).toContain(de.reviews.inquiry.messageIntro);
    expect(message).toContain("Google Reviews");
    expect(message).toContain("Personalized Card · CHF 69.–");
    expect(message).toContain("Rund");
    expect(message).toContain("100 × 100 mm");
    expect(message).toContain(de.reviews.quantityDiscount);
    expect(message.trimEnd().endsWith(de.reviews.inquiry.nonBindingNotice)).toBe(true);
  });

  it("omits hidden card and link fields", () => {
    const values = { ...complete, product: "standard-stand", shape: "", size: "", setup: "needs-setup", destinationUrl: "" };
    const message = decodeURIComponent(buildReviewInquiryUrl(values, "en").split("?text=")[1]);
    expect(message).toContain(en.reviews.inquiry.messageIntro);
    expect(message).not.toContain("Shape:");
    expect(message).not.toContain("Destination link:");
  });
});

describe("ReviewInquiryConfigurator", () => {
  it("renders destination and product first, with conditional card controls", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);

    const controls = screen.getAllByRole("combobox");
    expect(controls[0]).toHaveAccessibleName(labelFor("destination"));
    expect(controls[1]).toHaveAccessibleName(labelFor("product"));
    expect(screen.getByLabelText(labelFor("shape"))).toBeVisible();

    await user.selectOptions(screen.getByLabelText(labelFor("product")), "standard-stand");
    expect(screen.queryByLabelText(labelFor("shape"))).toBeNull();
    expect(screen.queryByLabelText(labelFor("size"))).toBeNull();
  });

  it("reports relevant errors and focuses the first invalid control", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await user.click(screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }));

    expect(screen.getAllByText(de.reviews.inquiry.requiredError)).toHaveLength(8);
    expect(screen.getByLabelText(labelFor("destination"))).toHaveFocus();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("builds WhatsApp only after a valid personalized-menu inquiry", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await fillForm(user, { ...complete, destination: "menu", destinationUrl: "https://bellavista.example/menu" });
    await user.click(screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }));

    const link = screen.getByRole("link", { name: new RegExp(de.reviews.inquiry.submitLabel) });
    const message = decodeURIComponent(link.getAttribute("href")!);
    expect(message).toContain("Digitales Menü");
    expect(message).toContain("Ristorante Bellavista");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("returns to the form with values intact", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }));
    await user.click(screen.getByRole("button", { name: de.reviews.inquiry.editLabel }));
    expect(screen.getByLabelText(labelFor("businessName"))).toHaveValue(complete.businessName);
    expect(screen.getByLabelText(labelFor("product"))).toHaveValue(complete.product);
  });
});
