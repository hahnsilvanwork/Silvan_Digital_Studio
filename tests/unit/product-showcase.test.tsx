import { act, fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { NfcProduct } from "../../src/content/types";

vi.mock("../../src/components/products/SplineProduct", () => ({
  SplineProduct: ({
    sceneUrl,
    onError,
    active,
  }: {
    sceneUrl: string;
    onError?: () => void;
    active?: boolean;
  }) => (
    <div data-active={active ? "true" : "false"} data-testid="viewer">
      {sceneUrl}
      <button onClick={onError} type="button">
        Fail viewer
      </button>
    </div>
  ),
}));

import { ProductCatalog } from "../../src/components/products/ProductCatalog";

let resizeCallbacks: ResizeObserverCallback[] = [];

function measureDialog(width = 360, height = 420) {
  const callback = resizeCallbacks.at(-1);
  if (!callback) throw new Error("Dialog stage was not observed");

  act(() =>
    callback(
      [{ contentRect: { width, height } as DOMRectReadOnly } as ResizeObserverEntry],
      {} as ResizeObserver,
    ),
  );
}

const products: readonly NfcProduct[] = [
  {
    id: "review",
    category: "reviews",
    title: "Round review card",
    price: "CHF 49.–",
    description: "Review description",
    image: { src: "/review.webp", alt: "Review card photo" },
    details: ["Round", "80 × 80 mm"],
    scene: {
      url: "https://example.com/review.splinecode",
      fallbackImage: "/fallback.webp",
      ariaLabel: "Interactive review card",
    },
  },
  {
    id: "review-white",
    category: "reviews",
    title: "White review card",
    price: "CHF 49.–",
    description: "White review description",
    image: { src: "/review-white.webp", alt: "White review card photo" },
    details: ["Round", "100 × 100 mm"],
  },
  {
    id: "review-blue",
    category: "reviews",
    title: "Blue review card",
    price: "CHF 49.–",
    description: "Blue review description",
    image: { src: "/review-blue.webp", alt: "Blue review card photo" },
    details: ["Square", "80 × 80 mm"],
  },
  {
    id: "menu",
    category: "menu",
    title: "Menu card",
    price: "CHF 49.–",
    description: "Menu description",
    image: { src: "/menu.webp", alt: "Menu card photo" },
    details: ["Square", "100 × 100 mm"],
  },
  {
    id: "custom",
    category: "custom",
    title: "Booking card",
    price: "CHF 99.–",
    description: "Custom description",
    image: { src: "/custom.webp", alt: "Booking card photo" },
    details: ["Custom"],
  },
];

const props = {
  products,
  categories: [
    { id: "reviews", label: "Google Reviews" },
    { id: "menu", label: "Menu" },
    { id: "custom", label: "Custom" },
  ] as const,
  labels: {
    category: "Choose category",
    categoryPrompt: "Choose an application",
    productSingular: "product",
    productPlural: "products",
    view3d: "View in 3D",
    comingSoon: "3D model coming soon",
    close: "Close 3D view",
    loading: "Loading 3D model",
    error: "3D model failed",
    retry: "Try again",
    interact: "Rotate with mouse or finger",
    previousProduct: "Previous product",
    nextProduct: "Next product",
    productPosition: "Product",
    productPositionOf: "of",
  },
};

beforeEach(() => {
  resizeCallbacks = [];
  vi.stubGlobal(
    "ResizeObserver",
    class {
      constructor(callback: ResizeObserverCallback) {
        resizeCallbacks.push(callback);
      }
      observe() {}
      disconnect() {}
      unobserve() {}
    },
  );
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value() {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value() {
      this.removeAttribute("open");
    },
  });
  Object.defineProperty(HTMLElement.prototype, "scrollTo", {
    configurable: true,
    value: vi.fn(),
  });
});

describe("ProductCatalog", () => {
  it("makes every product family and its inventory visible before filtering", () => {
    render(<ProductCatalog {...props} />);

    expect(screen.getByText("Choose an application")).toBeVisible();
    for (const category of props.categories) {
      const count = products.filter(
        ({ category: productCategory }) => productCategory === category.id,
      ).length;
      expect(
        screen.getByRole("button", {
          name: `${category.label} ${count} ${count === 1 ? "product" : "products"}`,
        }),
      ).toBeVisible();
    }
    expect(
      screen.getByRole("heading", { name: "Google Reviews · 3 products" }),
    ).toBeVisible();
  });

  it("navigates the product rail and resets its position per category", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);

    const previous = screen.getByRole("button", { name: "Previous product" });
    const next = screen.getByRole("button", { name: "Next product" });
    expect(screen.getByText("Product 1 of 3")).toBeVisible();
    expect(previous).toBeDisabled();

    await user.click(next);
    expect(screen.getByText("Product 2 of 3")).toBeVisible();
    expect(previous).toBeEnabled();

    await user.click(next);
    expect(screen.getByText("Product 3 of 3")).toBeVisible();
    expect(next).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Menu 1 product" }));
    expect(screen.getByText("Product 1 of 1")).toBeVisible();
    expect(screen.queryByRole("button", { name: "Previous product" })).toBeNull();
    expect(screen.queryByRole("button", { name: "Next product" })).toBeNull();
  });

  it("filters image-first cards with semantic category controls", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);

    const categories = screen.getByRole("group", { name: "Choose category" });
    expect(within(categories).getByRole("button", { name: /Google Reviews/ }))
      .toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: "Review card photo" })).toBeVisible();
    expect(screen.getAllByText("CHF 49.–")[0]).toBeVisible();
    expect(screen.getAllByText("80 × 80 mm")[0]).toBeVisible();

    await user.click(within(categories).getByRole("button", { name: /Menu/ }));

    expect(screen.getByRole("img", { name: "Menu card photo" })).toBeVisible();
    expect(screen.getByText("3D model coming soon")).toBeVisible();
    expect(screen.queryByRole("button", { name: "View in 3D" })).toBeNull();
  });

  it("mounts exactly one viewer only after an eligible action", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);

    expect(screen.queryByTestId("viewer")).toBeNull();
    const trigger = screen.getByRole("button", { name: "View in 3D" });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: "Round review card" });
    expect(within(dialog).queryByTestId("viewer")).toBeNull();
    fireEvent.resize(window);
    measureDialog();
    expect(within(dialog).getByTestId("viewer")).toHaveTextContent(
      "https://example.com/review.splinecode",
    );
    expect(within(dialog).getByText("Rotate with mouse or finger")).toBeVisible();

    await user.click(within(dialog).getByRole("button", { name: "Close 3D view" }));
    await vi.waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(screen.queryByTestId("viewer")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes on the native cancel event and restores focus", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);
    const trigger = screen.getByRole("button", { name: "View in 3D" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");
    measureDialog();

    fireEvent(dialog, new Event("cancel", { cancelable: true }));

    await vi.waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
    expect(trigger).toHaveFocus();
  });

  it("keeps the still after an error and retries only the selected scene", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);
    await user.click(screen.getByRole("button", { name: "View in 3D" }));
    const dialog = screen.getByRole("dialog");
    measureDialog();

    await user.click(within(dialog).getByRole("button", { name: "Fail viewer" }));
    expect(within(dialog).getByText("3D model failed")).toBeVisible();
    expect(dialog.querySelector("img")).toBeVisible();
    expect(within(dialog).queryByTestId("viewer")).toBeNull();

    await user.click(within(dialog).getByRole("button", { name: "Try again" }));
    expect(within(dialog).getByTestId("viewer")).toHaveTextContent(
      "https://example.com/review.splinecode",
    );
  });

  it("closes from the backdrop only after marking the renderer inactive", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);
    await user.click(screen.getByRole("button", { name: "View in 3D" }));
    const dialog = screen.getByRole("dialog");
    measureDialog();

    expect(within(dialog).getByTestId("viewer")).toHaveAttribute(
      "data-active",
      "true",
    );
    fireEvent.click(dialog);

    expect(within(dialog).getByTestId("viewer")).toHaveAttribute(
      "data-active",
      "false",
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await vi.waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  });
});
