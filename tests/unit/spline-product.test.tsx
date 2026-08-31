import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const loadSplineViewer = vi.hoisted(() => vi.fn(() => Promise.resolve()));

vi.mock("../../src/components/products/spline-viewer-loader", () => ({
  loadSplineViewer,
}));

import { SplineProduct } from "../../src/components/products/SplineProduct";
import { SplineSceneProvider } from "../../src/components/products/SplineSceneProvider";

let observerCallback: IntersectionObserverCallback;

function matchMedia(matches: boolean) {
  return {
    matches,
    media: "(prefers-reduced-motion: reduce)",
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } satisfies MediaQueryList;
}

function enterViewport() {
  act(() =>
    observerCallback(
      [
        {
          isIntersecting: true,
          boundingClientRect: { top: 0, bottom: 300 },
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    ),
  );
}

function subject() {
  return render(
    <SplineSceneProvider>
      <SplineProduct
        ariaLabel="White round tag"
        sceneUrl="https://example.com/scene.splinecode"
      />
    </SplineSceneProvider>,
  );
}

async function mountedViewer() {
  await waitFor(() =>
    expect(document.querySelector("spline-viewer")).not.toBeNull(),
  );
  // The element reaches the DOM one commit before the passive effect that
  // wires its listeners. Flush that effect so a dispatch cannot outrun it.
  await act(async () => {});

  const viewer = document.querySelector("spline-viewer");
  if (!viewer) throw new Error("Spline viewer disappeared after mounting");

  return viewer;
}

function expectState(state: string) {
  expect(
    screen.getByRole("img").querySelector("[data-spline-state]"),
  ).toHaveAttribute("data-spline-state", state);
}

beforeEach(() => {
  loadSplineViewer.mockReset();
  loadSplineViewer.mockResolvedValue();
  vi.stubGlobal(
    "IntersectionObserver",
    class implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      disconnect() {}
      observe() {}
      takeRecords() {
        return [];
      }
      unobserve() {}
    },
  );
  vi.stubGlobal("matchMedia", vi.fn(() => matchMedia(false)));
});

afterEach(() => vi.unstubAllGlobals());

describe("SplineProduct", () => {
  it("reserves the frame before creating a viewer", () => {
    subject();

    expect(
      screen.getByRole("img", { name: "White round tag" }),
    ).toBeVisible();
    expectState("idle");
    expect(document.querySelector("spline-viewer")).toBeNull();
  });

  it("mounts near the viewport and reveals only after load-complete", async () => {
    subject();
    enterViewport();

    const viewer = await mountedViewer();
    expectState("loading");

    act(() => {
      viewer.dispatchEvent(new CustomEvent("load-complete"));
    });

    expectState("ready");
  });

  it("keeps the fallback after context loss", async () => {
    subject();
    enterViewport();

    const viewer = await mountedViewer();

    act(() => {
      viewer.dispatchEvent(new CustomEvent("context-loss"));
    });

    expectState("error");
    expect(document.querySelector("spline-viewer")).toBeNull();
  });

  it("keeps the fallback when the runtime fails", async () => {
    loadSplineViewer.mockRejectedValueOnce(new Error("offline"));
    subject();
    enterViewport();

    await waitFor(() =>
      expect(
        screen.getByRole("img").querySelector("[data-spline-state]"),
      ).toHaveAttribute("data-spline-state", "error"),
    );
    expect(document.querySelector("spline-viewer")).toBeNull();
  });

  it("keeps the static representation under reduced motion", async () => {
    vi.stubGlobal("matchMedia", vi.fn(() => matchMedia(true)));
    subject();
    enterViewport();

    await waitFor(() =>
      expect(
        screen.getByRole("img").querySelector("[data-spline-state]"),
      ).toHaveAttribute("data-spline-state", "reduced-motion"),
    );
    expect(document.querySelector("spline-viewer")).toBeNull();
    expect(loadSplineViewer).not.toHaveBeenCalled();
  });
});
