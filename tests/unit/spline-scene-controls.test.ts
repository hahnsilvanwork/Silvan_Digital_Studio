import { describe, expect, it, vi } from "vitest";

import {
  SECONDS_PER_REVOLUTION,
  getSplineApplication,
  presentScene,
  setSceneRunning,
  swapScene,
} from "../../src/components/products/spline-scene-controls";

function orbitControls() {
  return {
    autoRotate: false,
    autoRotateSpeed: 2,
    autoRotateClockwise: true,
    hoverRotatePanMode: 1,
  };
}

function application(controls = orbitControls()) {
  return {
    load: vi.fn(() => Promise.resolve()),
    play: vi.fn(),
    stop: vi.fn(),
    setBackgroundColor: vi.fn(),
    _controls: { orbitControls: controls },
  };
}

describe("spline scene controls", () => {
  it("replaces hover interaction with a slow turntable", () => {
    const controls = orbitControls();

    presentScene(application(controls));

    expect(controls.hoverRotatePanMode).toBe(0);
    expect(controls.autoRotate).toBe(true);
    // Measured against viewer 2.0.16: seconds per turn is 18.5 / speed.
    expect(18.5 / controls.autoRotateSpeed).toBeCloseTo(
      SECONDS_PER_REVOLUTION,
      0,
    );
  });

  it("keeps the scene transparent so it sits on the page background", () => {
    const app = application();

    presentScene(app);

    expect(app.setBackgroundColor).toHaveBeenCalledWith("transparent");
  });

  it("pauses and resumes without disposing anything", () => {
    const app = application();

    setSceneRunning(app, false);
    expect(app.stop).toHaveBeenCalledTimes(1);

    setSceneRunning(app, true);
    expect(app.play).toHaveBeenCalledTimes(1);
  });

  it("swaps a scene in place and re-applies the presentation", async () => {
    const controls = orbitControls();
    const app = application(controls);

    await swapScene(app, "https://prod.spline.design/black/scene.splinecode");

    expect(app.load).toHaveBeenCalledWith(
      "https://prod.spline.design/black/scene.splinecode",
    );
    // Loading a scene resets the camera rig and the background.
    expect(controls.autoRotate).toBe(true);
    expect(app.setBackgroundColor).toHaveBeenCalledWith("transparent");
  });

  it("survives a runtime that no longer exposes its controls", () => {
    const app = { play: vi.fn(), stop: vi.fn() };

    // The rotation is decorative. A viewer update that moves these internals
    // must cost the turntable, never the page.
    expect(() => presentScene(app)).not.toThrow();
    expect(() => setSceneRunning(app, true)).not.toThrow();
    expect(getSplineApplication(document.createElement("div"))).toBeNull();
  });
});
