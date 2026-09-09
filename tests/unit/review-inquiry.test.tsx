import { act, fireEvent, render, screen } from "@testing-library/react";
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
import { inquiryCopy } from "../../src/content/inquiry-copy";

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
      ["destination", "product", "shape", "size", "quantity", "setup"].sort(),
    );
  });

  it("offers the approved product packages including the adhesive chip in both languages", () => {
    for (const locale of ["de", "en"] as const) {
      expect(getContent(locale).reviews.inquiry.productOptions.map(({ value }) => value)).toEqual(
        ["nfc-chip", "standard-card", "standard-stand", "personalized-card", "fully-custom-card"],
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

  it("ignores a stale invalid URL when its field is hidden", () => {
    expect(validateReviewInquiry({ ...complete, setup: "needs-setup", destinationUrl: "not-a-url" })).toEqual({});
  });

  it("rejects unsafe quantities and oversized messages", () => {
    expect(isPositiveInteger("9007199254740993")).toBe(false);
    expect(isPositiveInteger("1000")).toBe(false);
    expect(validateReviewInquiry({ ...complete, note: "x".repeat(601) }).note).toBe("length");
  });

  it("does not require identity for an initial enquiry", () => {
    expect(validateReviewInquiry({ ...complete, businessName: "", contactPerson: "" })).toEqual({});
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
    expect(message).toContain("Ø 100 mm");
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
  it.each(["de", "en"] as const)("preserves native select keyboard events without validating the %s form", async (locale) => {
    render(<ReviewInquiryConfigurator locale={locale} />);
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));

    for (const control of screen.getAllByRole("combobox")) {
      control.focus();
      for (const key of ["Enter", " ", "ArrowDown", "ArrowUp"]) {
        expect(fireEvent.keyDown(control, { key })).toBe(true);
        expect(control).toHaveFocus();
        expect(control).not.toHaveAttribute("aria-invalid");
      }
    }
    expect(screen.queryByText(getContent(locale).reviews.inquiry.requiredError)).toBeNull();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("validates Enter in a text input without a native form submission", async () => {
    render(<ReviewInquiryConfigurator locale="de" />);
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    const initialUrl = window.location.href;
    const control = screen.getByLabelText(labelFor("quantity"));
    control.focus();
    expect(fireEvent.keyDown(control, { key: "Enter" })).toBe(false);
    expect(screen.getAllByText(de.reviews.inquiry.requiredError)).toHaveLength(6);
    expect(screen.getByLabelText(labelFor("destination"))).toHaveFocus();
    expect(window.location.href).toBe(initialUrl);
  });

  it("keeps Enter for multiline text and active text composition", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    const note = screen.getByLabelText(labelFor("note"));
    await user.type(note, "First{Enter}Second");
    expect(note).toHaveValue("First\nSecond");
    const name = screen.getByLabelText(labelFor("businessName"));
    expect(fireEvent.keyDown(name, { key: "Enter", isComposing: true })).toBe(true);
    expect(screen.queryByText(de.reviews.inquiry.requiredError)).toBeNull();
  });

  it("reviews valid input with Enter and supports keyboard activation of the review button", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await fillForm(user, { ...complete, product: "standard-stand", setup: "needs-setup", businessName: "", contactPerson: "", note: "" });
    const initialUrl = window.location.href;
    const setup = screen.getByLabelText(labelFor("setup"));
    setup.focus();
    expect(fireEvent.keyDown(setup, { key: "Enter" })).toBe(true);
    expect(screen.queryByRole("heading", { name: de.reviews.inquiry.confirmTitle })).toBeNull();
    screen.getByLabelText(labelFor("quantity")).focus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("heading", { name: de.reviews.inquiry.confirmTitle })).toBeVisible();
    expect(window.location.href).toBe(initialUrl);

    for (const key of ["{Enter}", " "]) {
      await user.click(screen.getByRole("button", { name: de.reviews.inquiry.editLabel }));
      await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
      screen.getByRole("button", { name: inquiryCopy.de.review }).focus();
      await user.keyboard(key);
      expect(screen.getByRole("heading", { name: de.reviews.inquiry.confirmTitle })).toBeVisible();
      expect(window.location.href).toBe(initialUrl);
    }
  });

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
    // Let initial catalogue-state restoration finish before submitting.
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    await user.click(screen.getByRole("button", { name: inquiryCopy.de.review }));

    expect(screen.getAllByText(de.reviews.inquiry.requiredError)).toHaveLength(6);
    expect(screen.getByLabelText(labelFor("destination"))).toHaveFocus();
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("builds WhatsApp only after a valid personalized-menu inquiry", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await fillForm(user, { ...complete, destination: "menu", destinationUrl: "https://bellavista.example/menu" });
    await user.click(screen.getByRole("button", { name: inquiryCopy.de.review }));

    const link = screen.getByRole("link", { name: new RegExp(de.reviews.inquiry.submitLabel) });
    const message = decodeURIComponent(link.getAttribute("href")!);
    expect(message).toContain("Digitales Menü");
    expect(message).toContain("Ristorante Bellavista");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
    expect(screen.getByText("Ø 100 mm")).toBeVisible();
    expect(screen.queryByText("personalized-card")).toBeNull();
    const email = screen.getByRole("link", { name: inquiryCopy.de.email });
    expect(decodeURIComponent(email.getAttribute("href")!)).toContain("Ristorante Bellavista");
    await user.click(screen.getByRole("button", { name: inquiryCopy.de.copy }));
    expect(await navigator.clipboard.readText()).toContain("Ristorante Bellavista");
  });

  it("returns to the form with values intact", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);
    await fillForm(user);
    await user.click(screen.getByRole("button", { name: inquiryCopy.de.review }));
    await user.click(screen.getByRole("button", { name: de.reviews.inquiry.editLabel }));
    expect(screen.getByLabelText(labelFor("businessName"))).toHaveValue(complete.businessName);
    expect(screen.getByLabelText(labelFor("product"))).toHaveValue(complete.product);
  });
});
