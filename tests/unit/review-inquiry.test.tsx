import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ReviewInquiryConfigurator } from "../../src/components/reviews/ReviewInquiryConfigurator";
import { getContent } from "../../src/lib/locales";
import {
  EMPTY_REVIEW_INQUIRY,
  isPositiveInteger,
  isValidGoogleUrl,
  validateReviewInquiry,
  type ReviewInquiryValues,
} from "../../src/lib/validation";
import { buildReviewInquiryUrl } from "../../src/lib/whatsapp";

const de = getContent("de");
const en = getContent("en");

const complete: ReviewInquiryValues = {
  product: "NFC Review Card",
  quantity: "2",
  variant: "Schwarz",
  businessName: "Ristorante Bellavista",
  contactPerson: "Maria Rossi",
  googleUrl: "https://g.page/r/bellavista/review",
  street: "Bahnhofstrasse 12",
  postalCode: "8001",
  city: "Zürich",
  note: "Bitte bis Ende Monat.",
};

describe("review inquiry validation", () => {
  it("rejects every empty required field and accepts an empty note", () => {
    const errors = validateReviewInquiry(EMPTY_REVIEW_INQUIRY);

    expect(errors.note).toBeUndefined();
    expect(Object.keys(errors).sort()).toEqual(
      [
        "businessName",
        "city",
        "contactPerson",
        "googleUrl",
        "postalCode",
        "product",
        "quantity",
        "street",
        "variant",
      ].sort(),
    );
  });

  it("treats whitespace-only input as missing", () => {
    const errors = validateReviewInquiry({
      ...complete,
      businessName: "   ",
    });

    expect(errors.businessName).toBe("required");
  });

  it("accepts only positive whole quantities", () => {
    expect(isPositiveInteger("1")).toBe(true);
    expect(isPositiveInteger(" 25 ")).toBe(true);
    expect(isPositiveInteger("0")).toBe(false);
    expect(isPositiveInteger("-3")).toBe(false);
    expect(isPositiveInteger("2.5")).toBe(false);
    expect(isPositiveInteger("zwei")).toBe(false);
    expect(validateReviewInquiry({ ...complete, quantity: "0" }).quantity).toBe(
      "quantity",
    );
  });

  it("accepts only https links, so no script or data URI can be carried through", () => {
    expect(isValidGoogleUrl("https://g.page/r/x/review")).toBe(true);
    expect(isValidGoogleUrl("http://g.page/r/x/review")).toBe(false);
    expect(isValidGoogleUrl("javascript:alert(1)")).toBe(false);
    expect(isValidGoogleUrl("data:text/html,<script>")).toBe(false);
    expect(isValidGoogleUrl("g.page/r/x")).toBe(false);
    expect(
      validateReviewInquiry({ ...complete, googleUrl: "http://g.page/x" })
        .googleUrl,
    ).toBe("url");
  });

  it("reports no error for a complete inquiry", () => {
    expect(validateReviewInquiry(complete)).toEqual({});
  });
});

describe("WhatsApp message", () => {
  it("targets the approved number and carries every supplied detail", () => {
    const url = buildReviewInquiryUrl(complete, "de");

    expect(url.startsWith("https://wa.me/41789008500?text=")).toBe(true);

    const message = decodeURIComponent(url.split("?text=")[1]);

    expect(message).toContain(de.reviews.inquiry.messageIntro);
    for (const value of Object.values(complete)) {
      expect(message).toContain(value);
    }
    expect(message.trimEnd().endsWith(de.reviews.inquiry.nonBindingNotice)).toBe(
      true,
    );
  });

  it("omits the note line when no note was given", () => {
    const message = decodeURIComponent(
      buildReviewInquiryUrl({ ...complete, note: "" }, "de").split("?text=")[1],
    );
    const noteLabel = de.reviews.inquiry.fields.find(
      (field) => field.name === "note",
    )!.label;

    expect(message).not.toContain(noteLabel);
  });

  it("writes the message in the language the visitor used", () => {
    const message = decodeURIComponent(
      buildReviewInquiryUrl(complete, "en").split("?text=")[1],
    );

    expect(message).toContain(en.reviews.inquiry.messageIntro);
    expect(message).toContain(en.reviews.inquiry.nonBindingNotice);
  });

  it("trims values before they reach the message", () => {
    const message = decodeURIComponent(
      buildReviewInquiryUrl(
        { ...complete, businessName: "  Bellavista  " },
        "de",
      ).split("?text=")[1],
    );

    expect(message).toContain("Bellavista\n");
    expect(message).not.toContain("  Bellavista");
  });
});

describe("ReviewInquiryConfigurator", () => {
  it("labels every control and marks nothing invalid before submission", () => {
    render(<ReviewInquiryConfigurator locale="de" />);

    for (const field of de.reviews.inquiry.fields) {
      const control = screen.getByLabelText(field.label);

      expect(control).toBeInTheDocument();
      expect(control).not.toHaveAttribute("aria-invalid");
    }
  });

  it("reports field-specific errors and focuses the first invalid control", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);

    await user.click(
      screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }),
    );

    expect(screen.getAllByText(de.reviews.inquiry.requiredError).length).toBe(9);
    expect(screen.getByLabelText(de.reviews.inquiry.fields[0].label)).toHaveFocus();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("distinguishes the quantity and link messages from a missing value", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);

    const labelFor = (name: string) =>
      de.reviews.inquiry.fields.find((field) => field.name === name)!.label;

    await user.type(screen.getByLabelText(labelFor("quantity")), "0");
    await user.type(
      screen.getByLabelText(labelFor("googleUrl")),
      "http://example.com",
    );
    await user.click(
      screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }),
    );

    expect(screen.getByText(de.reviews.inquiry.quantityError)).toBeVisible();
    expect(screen.getByText(de.reviews.inquiry.urlError)).toBeVisible();
  });

  it("builds the WhatsApp link only after the whole inquiry is valid", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);

    await user.selectOptions(
      screen.getByLabelText(de.reviews.inquiry.fields[0].label),
      de.reviews.inquiry.productOptions.card,
    );
    for (const [name, value] of Object.entries(complete)) {
      if (name === "product") continue;

      const field = de.reviews.inquiry.fields.find(
        (candidate) => candidate.name === name,
      )!;
      await user.type(screen.getByLabelText(field.label), value);
    }

    await user.click(
      screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }),
    );

    const link = screen.getByRole("link", {
      name: new RegExp(de.reviews.inquiry.submitLabel),
    });

    expect(link.getAttribute("href")).toMatch(
      /^https:\/\/wa\.me\/41789008500\?text=/,
    );
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain(
      complete.businessName,
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link.getAttribute("rel")).toContain("noopener");
  });

  it("returns to the form with the values intact", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="de" />);

    await user.selectOptions(
      screen.getByLabelText(de.reviews.inquiry.fields[0].label),
      de.reviews.inquiry.productOptions.stand,
    );
    for (const [name, value] of Object.entries(complete)) {
      if (name === "product") continue;

      const field = de.reviews.inquiry.fields.find(
        (candidate) => candidate.name === name,
      )!;
      await user.type(screen.getByLabelText(field.label), value);
    }
    await user.click(
      screen.getByRole("button", { name: de.reviews.inquiry.submitLabel }),
    );
    await user.click(
      screen.getByRole("button", { name: de.reviews.inquiry.editLabel }),
    );

    const businessLabel = de.reviews.inquiry.fields.find(
      (field) => field.name === "businessName",
    )!.label;

    expect(screen.getByLabelText(businessLabel)).toHaveValue(
      complete.businessName,
    );
    expect(screen.getByLabelText(de.reviews.inquiry.fields[0].label)).toHaveValue(
      de.reviews.inquiry.productOptions.stand,
    );
  });
});
