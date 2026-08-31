/**
 * Thin, defensive wrapper around the Spline runtime that a `<spline-viewer>`
 * creates. Everything here is presentation polish: if a future viewer release
 * moves these internals, the product still renders, it just stops turning.
 */

/** A calm product turntable rather than a 3D demo. */
export const DEFAULT_SECONDS_PER_REVOLUTION = 45;

/**
 * How far the product swings either side of facing the visitor. A full
 * revolution would spend half its time showing the blank back of a tag, which
 * is the least interesting thing about it, so the product sweeps across its
 * front instead and turns back.
 */
export const DEFAULT_SWEEP_DEGREES = 30;

// Measured against viewer 2.0.16 by sampling the orbit angle: the time for a
// full revolution is 18.5 / autoRotateSpeed seconds.
const SPEED_FOR_ONE_REVOLUTION = 18.5;

// Also measured on 2.0.16: rotateLeft feeds a damped loop that keeps applying
// the delta, so the camera settles at roughly 6.2 times the argument.
const ROTATE_LEFT_GAIN = 6.2;

// How long a freshly loaded scene needs before its camera has arrived.
const CAMERA_SETTLE_MS = 600;

interface SplineOrbitControls {
  spherical?: { theta: number };
  autoRotate: boolean;
  autoRotateSpeed: number;
  autoRotateClockwise: boolean;
  hoverRotatePanMode: number;
  rotateLeft?: (angle: number) => void;
}

export interface ScenePresentation {
  /** Pace of the sweep, expressed as the time a full turn would take. */
  readonly secondsPerRevolution?: number;
  /** Total width of the sweep across the front of the product. */
  readonly sweepDegrees?: number;
}

/**
 * Longest a single sweep may take. autoRotate advances per frame, so the pace
 * drifts with the frame rate; this only exists so a stalled scene cannot leave
 * the product turning for ever.
 */
export function sweepTimeoutMs({
  secondsPerRevolution = DEFAULT_SECONDS_PER_REVOLUTION,
  sweepDegrees = DEFAULT_SWEEP_DEGREES,
}: ScenePresentation = {}): number {
  return Math.round((sweepDegrees / (360 / secondsPerRevolution)) * 3000);
}

/** Current orbit angle in radians, or null if the runtime moved it. */
export function getTurntableAngle(app: SplineApplication): number | null {
  try {
    return app._controls?.orbitControls?.spherical?.theta ?? null;
  } catch {
    return null;
  }
}

export interface SplineApplication {
  play?: () => void;
  stop?: () => void;
  load?: (url: string) => Promise<void>;
  setBackgroundColor?: (color: string) => void;
  _controls?: { orbitControls?: SplineOrbitControls };
}

interface SplineViewerElement extends Element {
  _spline?: SplineApplication;
}

export function getSplineApplication(
  viewer: Element | null,
): SplineApplication | null {
  return (viewer as SplineViewerElement | null)?._spline ?? null;
}

/**
 * Turns the scene into a slow turntable and removes the pointer-driven
 * rotation, so the product reads the same way with or without a mouse.
 */
/**
 * Returns the angle the product faces the visitor from, which is the centre
 * the sweep swings around. It has to be read here, before the camera is
 * nudged: afterwards the damped loop is still travelling, so any later read
 * lands somewhere between the two.
 */
export function presentScene(
  app: SplineApplication,
  {
    secondsPerRevolution = DEFAULT_SECONDS_PER_REVOLUTION,
    sweepDegrees = DEFAULT_SWEEP_DEGREES,
  }: ScenePresentation = {},
): number | null {
  try {
    app.setBackgroundColor?.("transparent");

    const controls = app._controls?.orbitControls;
    if (!controls) return null;

    const centre = controls.spherical?.theta ?? null;

    controls.hoverRotatePanMode = 0;
    controls.autoRotate = true;
    controls.autoRotateClockwise = true;
    controls.autoRotateSpeed = SPEED_FOR_ONE_REVOLUTION / secondsPerRevolution;

    // Every scene turns left on its own, so the sweep starts half a sweep to
    // the right. The front then travels through the middle of the view
    // instead of turning away from the visitor immediately.
    const radians = ((sweepDegrees / 2) * Math.PI) / 180;
    controls.rotateLeft?.(-radians / ROTATE_LEFT_GAIN);

    return centre;
  } catch {
    // Decorative only.
    return null;
  }
}

/** Reverses the sweep so the product comes back rather than turning away. */
export function reverseTurntable(app: SplineApplication): void {
  try {
    const controls = app._controls?.orbitControls;
    if (!controls) return;

    controls.autoRotateClockwise = !controls.autoRotateClockwise;
  } catch {
    // Decorative only.
  }
}

/**
 * Holds the turntable still or lets it turn again. Spline renders a coarse
 * preview while the camera moves and only refines once it stops, so the
 * product spends part of its cycle standing still and looking its best.
 */
export function setTurntableTurning(
  app: SplineApplication,
  turning: boolean,
): void {
  try {
    const controls = app._controls?.orbitControls;
    if (!controls) return;

    controls.autoRotate = turning;
  } catch {
    // Decorative only.
  }
}

/** Frees the GPU while a scene is off screen without disposing it. */
export function setSceneRunning(app: SplineApplication, running: boolean): void {
  try {
    if (running) app.play?.();
    else app.stop?.();
  } catch {
    // Decorative only.
  }
}

/**
 * Loads another product into the running renderer. This reuses the canvas and
 * its GPU context, which is what keeps switching products cheap.
 */
export async function swapScene(
  app: SplineApplication,
  sceneUrl: string,
  presentation: ScenePresentation = {},
): Promise<number | null> {
  await app.load?.(sceneUrl);
  // The incoming scene brings its own camera and takes a moment to arrive at
  // it. Reading the centre any earlier anchors the sweep somewhere between
  // the two products, and it then drifts away from the front.
  await new Promise((settled) => setTimeout(settled, CAMERA_SETTLE_MS));

  return presentScene(app, presentation);
}
