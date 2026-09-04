import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const loadSplineViewer = vi.hoisted(() => vi.fn(() => Promise.resolve()));

vi.mock("../../src/components/products/spline-viewer-loader", () => ({
  loadSplineViewer,
}));

import { SplineProduct } from "../../src/components/products/SplineProduct";
import { SplineSceneProvider } from "../../src/components/products/SplineSceneProvider";

interface FakeObserver {
  readonly callback: IntersectionObserverCallback;
  connected: boolean;
}

let observers: FakeObserver[] = [];

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

function deliver(index: number, isIntersecting: boolean) {
  const observer = observers[index];
  // A disconnected observer delivers nothing, which is how the component
  // stops itself from starting a scene it no longer wants.
  if (!observer?.connected) return;

  act(() =>
    observer.callback(
      [
        {
          isIntersecting,
          boundingClientRect: isIntersecting
            ? { top: 0, bottom: 300 }
            : { top: -4000, bottom: -3700 },
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    ),
  );
}

// Every product creates two observers: a generous one that decides when the
// scene may start, and a viewport-exact one that decides whether it is worth
// rendering right now.
const startObserver = (product: number) => product * 2;
const visibilityObserver = (product: number) => product * 2 + 1;

function enterViewport(product = 0) {
  deliver(startObserver(product), true);
  deliver(visibilityObserver(product), true);
}

/** Leaves the viewport while still inside the generous start margin. */
function leaveViewport(product = 0) {
  deliver(visibilityObserver(product), false);
}

function subject(sceneUrl = "https://example.com/white.splinecode") {
  const tree = (url: string) => (
    <SplineSceneProvider>
      <SplineProduct ariaLabel="White round tag" sceneUrl={url} />
    </SplineSceneProvider>
  );
  const view = render(tree(sceneUrl));

  return { ...view, show: (url: string) => view.rerender(tree(url)) };
}

function fakeApplication() {
  return {
    load: vi.fn(() => Promise.resolve()),
    play: vi.fn(),
    stop: vi.fn(),
    setBackgroundColor: vi.fn(),
    _controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 2,
        autoRotateClockwise: true,
        hoverRotatePanMode: 1,
        rotateLeft: vi.fn(),
        spherical: { theta: 0 },
      },
    },
  };
}

async function loadedViewer() {
  const viewer = await mountedViewer();
  const app = fakeApplication();
  Object.assign(viewer, { _spline: app });

  act(() => {
    viewer.dispatchEvent(new CustomEvent("load-complete"));
  });

  return { viewer, app };
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
  observers = [];
  vi.stubGlobal(
    "IntersectionObserver",
    class implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "0px";
      readonly thresholds = [0];
      private readonly entry: FakeObserver;

      constructor(callback: IntersectionObserverCallback) {
        this.entry = { callback, connected: true };
        observers.push(this.entry);
      }

      disconnect() {
        this.entry.connected = false;
      }
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

  it("keeps the scene alive across repeated scrolling", async () => {
    subject();
    enterViewport();

    const { viewer } = await loadedViewer();

    // Rebuilding the WebGPU context on every scroll pass is what made the
    // viewer re-download its scene and log swapchain errors.
    for (let pass = 0; pass < 3; pass += 1) {
      leaveViewport();
      enterViewport();
    }

    expect(document.querySelector("spline-viewer")).toBe(viewer);
    expectState("ready");
  });

  it("turns the product slowly instead of reacting to the pointer", async () => {
    subject();
    enterViewport();

    const { app } = await loadedViewer();

    expect(app._controls.orbitControls.autoRotate).toBe(true);
    expect(app._controls.orbitControls.hoverRotatePanMode).toBe(0);
    expect(app.setBackgroundColor).toHaveBeenCalledWith("transparent");
  });

  it("sweeps, rests, then comes back instead of turning away", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    try {
      subject();
      enterViewport();

      const { app } = await loadedViewer();
      const controls = app._controls.orbitControls;
      const sweep = (30 * Math.PI) / 180;
      const start = controls.spherical.theta;

      expect(controls.autoRotate).toBe(true);
      const firstDirection = controls.autoRotateClockwise;

      // Still inside the sweep: it must keep going.
      controls.spherical.theta = start - sweep / 4;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(400);
      });
      expect(controls.autoRotate).toBe(true);

      // The far edge of the sweep, reached by angle rather than by clock,
      // because autoRotate advances per frame and a fast machine would
      // otherwise carry on into the blank back of the product.
      controls.spherical.theta = start - sweep;
      await act(async () => {
        await vi.advanceTimersByTimeAsync(400);
      });
      expect(controls.autoRotate).toBe(false);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(4000);
      });
      expect(controls.autoRotate).toBe(true);
      // Nobody wants to watch the blank back of a tag, so it comes back.
      expect(controls.autoRotateClockwise).toBe(!firstDirection);

      // Setting off from the edge must not count as reaching the edge, or the
      // product would rest again immediately and stutter in place.
      await act(async () => {
        await vi.advanceTimersByTimeAsync(400);
      });
      expect(controls.autoRotate).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it("pauses the scene off screen and resumes it without rebuilding", async () => {
    subject();
    enterViewport();

    const { viewer, app } = await loadedViewer();

    leaveViewport();
    expect(app.stop).toHaveBeenCalled();
    expect(document.querySelector("spline-viewer")).toBe(viewer);

    app.play.mockClear();
    enterViewport();
    expect(app.play).toHaveBeenCalled();
  });

  it("swaps another product into the running viewer", async () => {
    const { show } = subject();
    enterViewport();

    const { viewer, app } = await loadedViewer();

    await act(async () => {
      show("https://example.com/black.splinecode");
    });

    // Reusing the canvas keeps the GPU context alive, so switching products
    // costs a scene download instead of a full viewer rebuild.
    expect(app.load).toHaveBeenCalledWith(
      "https://example.com/black.splinecode",
    );
    expect(document.querySelector("spline-viewer")).toBe(viewer);
  });

  it("frees the start slot when a loading scene scrolls out of sight", async () => {
    render(
      <SplineSceneProvider>
        <SplineProduct ariaLabel="First" sceneUrl="https://example.com/a.js" />
        <SplineProduct ariaLabel="Second" sceneUrl="https://example.com/b.js" />
      </SplineSceneProvider>,
    );

    enterViewport(0);
    await waitFor(() =>
      expect(document.querySelectorAll("spline-viewer")).toHaveLength(1),
    );
    enterViewport(1);
    expect(document.querySelectorAll("spline-viewer")).toHaveLength(1);

    leaveViewport(0);

    // The viewer suspends its own loading off screen, so holding the slot
    // would keep the scene the visitor can actually see waiting.
    await waitFor(() =>
      expect(document.querySelectorAll("spline-viewer")).toHaveLength(2),
    );
  });

  it("keeps a slow scene mounted instead of tearing it down", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    try {
      subject();
      enterViewport();

      const viewer = await mountedViewer();

      await act(async () => {
        await vi.advanceTimersByTimeAsync(30_000);
      });

      // A phone that needs half a minute still deserves its product shot; the
      // scene stays and reveals itself whenever it finally reports back.
      expect(document.querySelector("spline-viewer")).toBe(viewer);
      expectState("loading");

      act(() => {
        viewer.dispatchEvent(new CustomEvent("load-complete"));
      });

      expectState("ready");
    } finally {
      vi.useRealTimers();
    }
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

  it("reports a runtime failure to an on-demand dialog", async () => {
    const onError = vi.fn();
    loadSplineViewer.mockRejectedValueOnce(new Error("offline"));
    render(
      <SplineSceneProvider>
        <SplineProduct
          ariaLabel="White round tag"
          onError={onError}
          sceneUrl="https://example.com/white.splinecode"
        />
      </SplineSceneProvider>,
    );
    enterViewport();

    await waitFor(() => expect(onError).toHaveBeenCalledTimes(1));
  });

  it("allows an explicitly requested reduced-motion scene without auto rotation", async () => {
    vi.stubGlobal("matchMedia", vi.fn(() => matchMedia(true)));
    render(
      <SplineSceneProvider>
        <SplineProduct
          allowReducedMotion
          ariaLabel="White round tag"
          sceneUrl="https://example.com/white.splinecode"
        />
      </SplineSceneProvider>,
    );
    enterViewport();

    const { app } = await loadedViewer();
    expect(app._controls.orbitControls.autoRotate).toBe(false);
  });

  it("stops a ready renderer before an on-demand dialog removes it", async () => {
    const tree = (active: boolean) => (
      <SplineSceneProvider>
        <SplineProduct
          active={active}
          ariaLabel="White round tag"
          sceneUrl="https://example.com/white.splinecode"
        />
      </SplineSceneProvider>
    );
    const view = render(tree(true));
    enterViewport();
    const { app } = await loadedViewer();

    view.rerender(tree(false));

    await waitFor(() => expect(app.stop).toHaveBeenCalled());
  });
});
