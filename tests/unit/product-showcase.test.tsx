import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

const mounts = vi.hoisted(() => ({ count: 0 }));

vi.mock("../../src/components/products/SplineProduct", async () => {
  const { useEffect } = await import("react");

  return {
    SplineProduct: ({
      sceneUrl,
      onReady,
    }: {
      readonly sceneUrl: string;
      readonly onReady?: () => void;
    }) => {
      // Counts mounts, not renders: only a remount would drop the real
      // viewer's GPU context.
      useEffect(() => {
        mounts.count += 1;
      }, []);

      return (
        <output data-testid="active-scene">
          {sceneUrl}
          <button onClick={() => onReady?.()} type="button">
            report ready
          </button>
        </output>
      );
    },
  };
});

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

afterEach(() => {
  mounts.count = 0;
  vi.useRealTimers();
});

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

  it("shows one product for the whole visit", () => {
    vi.useFakeTimers();
    render(
      <ProductShowcase
        products={products}
        rotatePerVisit
        selectorLabel="Choose"
      />,
    );

    const shown = screen.getByTestId("active-scene").textContent;
    fireEvent.click(screen.getByRole("button", { name: "report ready" }));
    act(() => void vi.advanceTimersByTime(120_000));

    // Loading another scene blocks the main thread for up to nine hundred
    // milliseconds, so the product on show must not change under the visitor.
    expect(screen.getByTestId("active-scene")).toHaveTextContent(shown ?? "");
  });

  it("moves to the next product on the next visit", () => {
    const seen = new Set<string>();

    for (let visit = 0; visit < products.length; visit += 1) {
      const view = render(
        <ProductShowcase
          products={products}
          rotatePerVisit
          selectorLabel="Choose"
        />,
      );

      seen.add(screen.getByTestId("active-scene").textContent ?? "");
      view.unmount();
    }

    // Variety comes from returning visitors seeing a different product, not
    // from swapping one out while somebody is looking at it.
    expect(seen.size).toBe(products.length);
  });

  it("never rebuilds the viewer when the product changes", async () => {
    const user = userEvent.setup();
    render(<ProductShowcase products={products} selectorLabel="Choose" />);

    expect(mounts.count).toBe(1);
    await user.click(screen.getByRole("button", { name: "Black tag" }));

    // The viewer swaps its scene in place; remounting would drop the GPU
    // context and reload the whole runtime.
    expect(mounts.count).toBe(1);
    expect(screen.getByTestId("active-scene")).toHaveTextContent("black");
  });
});
