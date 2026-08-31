import { describe, expect, it, vi } from "vitest";

import {
  DEFAULT_SECONDS_PER_REVOLUTION,
  getSplineApplication,
  presentScene,
  reverseTurntable,
  setSceneRunning,
  setTurntableTurning,
  getTurntableAngle,
  sweepTimeoutMs,
  swapScene,
} from "../../src/components/products/spline-scene-controls";

function orbitControls() {
  return {
    autoRotate: false,
    autoRotateSpeed: 2,
    autoRotateClockwise: true,
    hoverRotatePanMode: 1,
    rotateLeft: vi.fn(),
    spherical: { theta: 0.26 },
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
      DEFAULT_SECONDS_PER_REVOLUTION,
      0,
    );
  });

  it("takes a slower revolution when the placement asks for one", () => {
    const controls = orbitControls();

    presentScene(application(controls), { secondsPerRevolution: 60 });

    expect(18.5 / controls.autoRotateSpeed).toBeCloseTo(60, 0);
  });

  it("starts half a sweep to the right, against the direction of travel", () => {
    const controls = orbitControls();

    presentScene(application(controls), { sweepDegrees: 30 });

    // Scenes turn left on their own. Starting on the right is what lets the
    // front of the product cross the middle of the view instead of leaving
    // it, and rotateLeft settles at roughly 6.2x its argument.
    const [argument] = controls.rotateLeft.mock.calls[0] as [number];
    expect((argument * 6.2 * 180) / Math.PI).toBeCloseTo(-15, 0);
  });

  it("reverses at the end of a sweep instead of showing the back", () => {
    const controls = orbitControls();
    const app = application(controls);

    presentScene(app);
    expect(controls.autoRotateClockwise).toBe(true);

    reverseTurntable(app);
    expect(controls.autoRotateClockwise).toBe(false);

    reverseTurntable(app);
    expect(controls.autoRotateClockwise).toBe(true);
  });

  it("reports the orbit angle so the sweep can be bounded by it", () => {
    const controls = orbitControls();

    expect(getTurntableAngle(application(controls))).toBeCloseTo(0.26, 2);
    expect(getTurntableAngle({})).toBeNull();
  });

  it("allows a sweep far longer than it should take before giving up", () => {
    // autoRotate advances per frame, so the pace drifts with the frame rate.
    // The timeout only catches a scene that stopped turning altogether.
    const nominal = (30 / (360 / 45)) * 1000;

    expect(
      sweepTimeoutMs({ secondsPerRevolution: 45, sweepDegrees: 30 }),
    ).toBeGreaterThan(nominal * 2);
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

    await swapScene(app, "https://prod.spline.design/black/scene.splinecode", {
      secondsPerRevolution: 60,
    });

    expect(app.load).toHaveBeenCalledWith(
      "https://prod.spline.design/black/scene.splinecode",
    );
    // Loading a scene resets the camera rig and the background.
    expect(controls.autoRotate).toBe(true);
    expect(18.5 / controls.autoRotateSpeed).toBeCloseTo(60, 0);
    expect(app.setBackgroundColor).toHaveBeenCalledWith("transparent");
  });

  it("can hold the turntable still so the render can sharpen", () => {
    const controls = orbitControls();
    const app = application(controls);

    presentScene(app);
    expect(controls.autoRotate).toBe(true);

    setTurntableTurning(app, false);
    expect(controls.autoRotate).toBe(false);
    // Holding still is not pausing: the scene keeps rendering, which is the
    // whole point, because that is when Spline refines the image.
    expect(app.stop).not.toHaveBeenCalled();

    setTurntableTurning(app, true);
    expect(controls.autoRotate).toBe(true);
  });

  it("survives a runtime that no longer exposes its controls", () => {
    const app = { play: vi.fn(), stop: vi.fn() };

    // The rotation is decorative. A viewer update that moves these internals
    // must cost the turntable, never the page.
    expect(() => presentScene(app)).not.toThrow();
    expect(() => setSceneRunning(app, true)).not.toThrow();
    expect(() => setTurntableTurning(app, true)).not.toThrow();
    expect(getSplineApplication(document.createElement("div"))).toBeNull();
  });
});
