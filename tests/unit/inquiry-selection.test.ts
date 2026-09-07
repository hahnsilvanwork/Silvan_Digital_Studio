import { describe, expect, it } from "vitest";
import { getInquiryPreset } from "../../src/lib/inquiry-selection";

describe("catalogue enquiry handoff", () => {
  it("maps real models to their package, application and shape", () => {
    expect(getInquiryPreset("menu-personalized-white")).toEqual({destination:"menu",product:"personalized-card",shape:"round"});
    expect(getInquiryPreset("review-stand-white")).toEqual({destination:"reviews",product:"standard-stand",shape:""});
    expect(getInquiryPreset("booking-custom-blue")).toEqual({destination:"booking",product:"fully-custom-card",shape:"square"});
  });
  it("ignores untrusted model IDs", () => {
    expect(getInquiryPreset("<script>alert(1)</script>")).toBeNull();
  });
});
