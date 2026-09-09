import { describe, expect, it } from "vitest";
import { applyInquiryPreset, getInquiryPreset } from "../../src/lib/inquiry-selection";

import { EMPTY_REVIEW_INQUIRY } from "../../src/lib/validation";

describe("catalogue enquiry handoff", () => {
  it("maps real models to their package, application and shape", () => {
    expect(getInquiryPreset("menu-personalized-white")).toEqual({destination:"menu",product:"fully-custom-card",shape:"round",size:""});
    expect(getInquiryPreset("review-stand-white")).toEqual({destination:"reviews",product:"standard-stand",shape:"",size:""});
    expect(getInquiryPreset("booking-custom-blue")).toEqual({destination:"booking",product:"fully-custom-card",shape:"square",size:""});
  });
  it("asks visitors to choose a confirmed size for round and square cards", () => {
    for (const id of ["menu-personalized-white", "menu-round-black", "menu-square-black", "review-personalized-black", "booking-custom-blue"]) {
      expect(getInquiryPreset(id)?.size).toBe("");
      expect(applyInquiryPreset({ ...EMPTY_REVIEW_INQUIRY, size: "100" }, id).size).toBe("");
    }
  });
  it("ignores untrusted model IDs", () => {
    expect(getInquiryPreset("<script>alert(1)</script>")).toBeNull();
  });
});
