import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it } from "vitest";
import { ReviewInquiryConfigurator } from "../../src/components/reviews/ReviewInquiryConfigurator";
import { setCatalogueSelection } from "../../src/components/reviews/use-catalogue-selection";
import { photoImports } from "../../src/content/photo-products";

afterEach(() => window.history.replaceState(null, "", "/"));

describe("photographed product inquiry selection", () => {
  it("replaces a previous square size when selecting a rectangular model", async () => {
    const user = userEvent.setup();
    render(<ReviewInquiryConfigurator locale="en" />);
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    await user.selectOptions(screen.getByLabelText("Shape"), "square");
    await user.selectOptions(screen.getByLabelText("Size"), "100");
    const card = photoImports.find((product) => product.kind === "card")!;
    act(() => setCatalogueSelection(card.category, card.id));
    await act(() => new Promise<void>((resolve) => requestAnimationFrame(() => resolve())));
    await user.click(screen.getByRole('button', { name: 'Adjust selection' }));
    expect(screen.getByLabelText("Shape")).toHaveValue("rectangle");
    expect(screen.getByLabelText("Size")).toHaveValue("confirm");
    expect(within(screen.getByLabelText("Size")).queryByRole("option", { name: "100 × 100 mm" })).toBeNull();
    expect(screen.getByLabelText("Product")).toHaveValue("standard-card");
    await user.selectOptions(screen.getByLabelText("Shape"), "round");
    expect(screen.getByLabelText("Size")).toHaveValue("");
  });
});
