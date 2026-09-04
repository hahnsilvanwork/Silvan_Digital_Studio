import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ProductHero } from "../../src/components/products/ProductHero";

const images = [
  { src: "/first.webp", alt: "First product" },
  { src: "/second.webp", alt: "Second product", fit: "contain" },
  { src: "/third.webp", alt: "Third product" },
] as const;

const heroProps = {
  images,
  indicatorLabel: "Shown image",
  pauseLabel: "Pause rotation",
  resumeLabel: "Resume rotation",
};

function mediaQuery(matches: boolean): MediaQueryList {
  return {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  };
}

describe("ProductHero", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery(false)));
    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("renders the first product immediately and advances every 5.5 seconds", () => {
    render(<ProductHero {...heroProps} />);

    expect(screen.getByRole("img", { name: "First product" })).toHaveAttribute(
      "data-active",
      "true",
    );

    act(() => vi.advanceTimersByTime(5_500));

    expect(screen.getByRole("img", { name: "Second product" })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(document.querySelector("spline-viewer")).toBeNull();
  });

  it("preserves the natural fit selected for a wide overview", () => {
    render(<ProductHero {...heroProps} />);

    expect(screen.getByRole("img", { name: "First product" })).toHaveAttribute(
      "data-fit",
      "cover",
    );
    expect(screen.getByRole("img", { name: "Second product" })).toHaveAttribute(
      "data-fit",
      "contain",
    );
  });

  it("pauses while the document is hidden and resumes when visible", () => {
    render(<ProductHero {...heroProps} />);

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "hidden",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => vi.advanceTimersByTime(11_000));
    expect(screen.getByRole("img", { name: "First product" })).toHaveAttribute(
      "data-active",
      "true",
    );

    Object.defineProperty(document, "visibilityState", {
      configurable: true,
      value: "visible",
    });
    act(() => document.dispatchEvent(new Event("visibilitychange")));
    act(() => vi.advanceTimersByTime(5_500));
    expect(screen.getByRole("img", { name: "Second product" })).toHaveAttribute(
      "data-active",
      "true",
    );
  });

  it("stays on the first product for reduced motion", () => {
    vi.stubGlobal("matchMedia", vi.fn(() => mediaQuery(true)));
    render(<ProductHero {...heroProps} />);

    act(() => vi.advanceTimersByTime(22_000));

    expect(screen.getByRole("img", { name: "First product" })).toHaveAttribute(
      "data-active",
      "true",
    );
  });

  it("lets visitors select an image and pauses automatic advancement", () => {
    render(<ProductHero {...heroProps} />);

    const secondImage = screen.getByRole("button", {
      name: "Shown image 2: Second product",
    });
    fireEvent.click(secondImage);
    act(() => vi.advanceTimersByTime(11_000));

    expect(screen.getByRole("img", { name: "Second product" })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(secondImage).toHaveAttribute("aria-pressed", "true");
  });

  it("offers pause and resume controls for automatic advancement", () => {
    render(<ProductHero {...heroProps} />);

    fireEvent.click(screen.getByRole("button", { name: "Pause rotation" }));
    act(() => vi.advanceTimersByTime(11_000));
    expect(screen.getByRole("img", { name: "First product" })).toHaveAttribute(
      "data-active",
      "true",
    );

    fireEvent.click(screen.getByRole("button", { name: "Resume rotation" }));
    act(() => vi.advanceTimersByTime(5_500));
    expect(screen.getByRole("img", { name: "Second product" })).toHaveAttribute(
      "data-active",
      "true",
    );
  });
});
