import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { getContent } from "../lib/locales";
import Home from "./page";

const { hero } = getContent("de").home;

describe("Home", () => {
  it("presents the approved SILVAN positioning message inside the main region", () => {
    render(<Home />);

    const main = screen.getByRole("main");

    expect(within(main).getByText(hero.serviceLine)).toBeInTheDocument();
    expect(
      within(main).getByRole("heading", { level: 1, name: hero.headline }),
    ).toBeInTheDocument();
    expect(within(main).getByText(hero.supporting)).toBeInTheDocument();
  });

  it("wraps the page in the global chrome", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: getContent("de").a11y.skipToContent }),
    ).toHaveAttribute("href", "#main-content");
    expect(document.getElementById("main-content")).toBe(
      screen.getByRole("main"),
    );
  });
});
