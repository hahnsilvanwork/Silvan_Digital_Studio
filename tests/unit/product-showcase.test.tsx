import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../src/components/products/SplineProduct", () => ({
  SplineProduct: ({ sceneUrl }: { readonly sceneUrl: string }) => (
    <output data-testid="active-scene">{sceneUrl}</output>
  ),
}));

import { ProductShowcase } from "../../src/components/products/ProductShowcase";

const products = [
  {
    id: "white",
    title: "White tag",
    sceneUrl: "https://example.com/white.splinecode",
    ariaLabel: "White tag in 3D",
  },
  {
    id: "black",
    title: "Black tag",
    sceneUrl: "https://example.com/black.splinecode",
    ariaLabel: "Black tag in 3D",
  },
] as const;

describe("ProductShowcase", () => {
  it("omits controls when there is only one product", () => {
    render(
      <ProductShowcase
        products={products.slice(0, 1)}
        selectorLabel="Choose"
      />,
    );

    expect(screen.queryByRole("group", { name: "Choose" })).toBeNull();
    expect(screen.getAllByTestId("active-scene")).toHaveLength(1);
  });

  it("replaces the active scene when another product is selected", async () => {
    const user = userEvent.setup();
    render(<ProductShowcase products={products} selectorLabel="Choose" />);

    const white = screen.getByRole("button", { name: "White tag" });
    const black = screen.getByRole("button", { name: "Black tag" });

    expect(white).toHaveAttribute("aria-pressed", "true");
    await user.click(black);

    expect(black).toHaveAttribute("aria-pressed", "true");
    expect(screen.getAllByTestId("active-scene")).toHaveLength(1);
    expect(screen.getByTestId("active-scene")).toHaveTextContent(
      "black.splinecode",
    );
  });
});
