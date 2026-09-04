import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { NfcProduct } from "../../src/content/types";

vi.mock("../../src/components/products/SplineProduct", () => ({
  SplineProduct: ({
    sceneUrl,
    onError,
  }: {
    sceneUrl: string;
    onError?: () => void;
  }) => (
    <div data-testid="viewer">
      {sceneUrl}
      <button onClick={onError} type="button">
        Fail viewer
      </button>
    </div>
  ),
}));

import { ProductCatalog } from "../../src/components/products/ProductCatalog";

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
  },
};

beforeEach(() => {
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
});

describe("ProductCatalog", () => {
  it("makes every product family and its inventory visible before filtering", () => {
    render(<ProductCatalog {...props} />);

    expect(screen.getByText("Choose an application")).toBeVisible();
    for (const category of props.categories) {
      expect(
        screen.getByRole("button", {
          name: `${category.label} 1 product`,
        }),
      ).toBeVisible();
    }
    expect(
      screen.getByRole("heading", { name: "Google Reviews · 1 product" }),
    ).toBeVisible();
  });

  it("filters image-first cards with semantic category controls", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);

    const categories = screen.getByRole("group", { name: "Choose category" });
    expect(within(categories).getByRole("button", { name: /Google Reviews/ }))
      .toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: "Review card photo" })).toBeVisible();
    expect(screen.getByText("CHF 49.–")).toBeVisible();
    expect(screen.getByText("80 × 80 mm")).toBeVisible();

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
    expect(within(dialog).getByTestId("viewer")).toHaveTextContent(
      "https://example.com/review.splinecode",
    );
    expect(within(dialog).getByText("Rotate with mouse or finger")).toBeVisible();

    await user.click(within(dialog).getByRole("button", { name: "Close 3D view" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.queryByTestId("viewer")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes on the native cancel event and restores focus", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);
    const trigger = screen.getByRole("button", { name: "View in 3D" });
    await user.click(trigger);
    const dialog = screen.getByRole("dialog");

    fireEvent(dialog, new Event("cancel", { cancelable: true }));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("keeps the still after an error and retries only the selected scene", async () => {
    const user = userEvent.setup();
    render(<ProductCatalog {...props} />);
    await user.click(screen.getByRole("button", { name: "View in 3D" }));
    const dialog = screen.getByRole("dialog");

    await user.click(within(dialog).getByRole("button", { name: "Fail viewer" }));
    expect(within(dialog).getByText("3D model failed")).toBeVisible();
    expect(dialog.querySelector("img")).toBeVisible();
    expect(within(dialog).queryByTestId("viewer")).toBeNull();

    await user.click(within(dialog).getByRole("button", { name: "Try again" }));
    expect(within(dialog).getByTestId("viewer")).toHaveTextContent(
      "https://example.com/review.splinecode",
    );
  });
});
