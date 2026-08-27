import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("presents the SILVAN positioning message", () => {
    render(<Home />);

    expect(screen.getByText("SILVAN")).toBeInTheDocument();
    expect(
      screen.getByText("Websites · Google Reviews · Online-Präsenz · Automation"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Mehr Kunden. Weniger Aufwand." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ich entwickle digitale Lösungen, die Ihr Unternehmen sichtbar machen und wiederkehrende Arbeit reduzieren.",
      ),
    ).toBeInTheDocument();
  });
});
