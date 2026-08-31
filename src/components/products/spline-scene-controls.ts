/**
 * Thin, defensive wrapper around the Spline runtime that a `<spline-viewer>`
 * creates. Everything here is presentation polish: if a future viewer release
 * moves these internals, the product still renders, it just stops turning.
 */

/** A calm product turntable rather than a 3D demo. */
export const SECONDS_PER_REVOLUTION = 30;

// Measured against viewer 2.0.16 by sampling the orbit angle: the time for a
// full revolution is 18.5 / autoRotateSpeed seconds.
const SPEED_FOR_ONE_REVOLUTION = 18.5;

interface SplineOrbitControls {
  autoRotate: boolean;
  autoRotateSpeed: number;
  autoRotateClockwise: boolean;
  hoverRotatePanMode: number;
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
export function presentScene(app: SplineApplication): void {
  try {
    app.setBackgroundColor?.("transparent");

    const controls = app._controls?.orbitControls;
    if (!controls) return;

    controls.hoverRotatePanMode = 0;
    controls.autoRotate = true;
    controls.autoRotateClockwise = true;
    controls.autoRotateSpeed =
      SPEED_FOR_ONE_REVOLUTION / SECONDS_PER_REVOLUTION;
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
): Promise<void> {
  await app.load?.(sceneUrl);
  presentScene(app);
}
