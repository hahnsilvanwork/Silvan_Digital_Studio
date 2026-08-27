import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import "../../src/app/globals.css";
import { DesignSystemFixture } from "../fixtures/design-system-fixture";

describe("design-system fixture", () => {
  it("compiles both CSS modules into distinct scoped classes", () => {
    render(<DesignSystemFixture />);

    const fixture = screen.getByTestId("design-system-fixture");
    const classNames = fixture.className.split(" ");

    expect(classNames).toHaveLength(2);
    // A CSS module that failed to compile yields the bare key, which would let
    // an unscoped or missing class pass unnoticed.
    expect(classNames).not.toContain("shell");
    expect(classNames).not.toContain("page");
    expect(new Set(classNames).size).toBe(2);
  });

  it("marks every interactive element as a touch target", () => {
    render(<DesignSystemFixture />);

    const lightAnchor = screen.getByRole("link", { name: "Fixture link" });
    const darkAnchor = screen.getByRole("link", { name: "Dark-band link" });
    const button = screen.getByRole("button", { name: "Fixture button" });

    for (const target of [lightAnchor, darkAnchor, button]) {
      expect(target).toHaveAttribute("data-touch-target");
    }
  });
});
