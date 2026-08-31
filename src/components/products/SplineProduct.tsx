"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { useSplineSceneSlot } from "./SplineSceneProvider";
import {
  getSplineApplication,
  presentScene,
  DEFAULT_SWEEP_DEGREES,
  getTurntableAngle,
  reverseTurntable,
  setSceneRunning,
  setTurntableTurning,
  sweepTimeoutMs,
  swapScene,
  type ScenePresentation,
  type SplineApplication,
} from "./spline-scene-controls";
import { loadSplineViewer } from "./spline-viewer-loader";
import styles from "./products.module.css";

// A slow scene must not block the other one forever. It must not be torn down
// either: on a weak phone the first frame can still be seconds away.
const SLOT_RELEASE_MS = 10_000;
const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

// Spline renders a coarse preview while the camera moves and only sharpens
// once it stops, so the product sweeps and then rests. The rest is long
// enough for the image to settle, measured on 2.0.16, and it is also when the
// renderer stops asking for frames.
const REST_MS = 4000;

// The angle is watched rather than the clock: autoRotate advances per frame,
// so a fast machine would otherwise sweep far enough to show the blank back.
const ANGLE_POLL_MS = 200;

export interface SplineProductProps extends ScenePresentation {
  readonly sceneUrl: string;
  readonly fallbackImage?: string;
  readonly ariaLabel: string;
  readonly priority?: boolean;
  /** Fires once, when the 3D has taken over from the still. */
  readonly onReady?: () => void;
}

type LoadState = "idle" | "loading" | "ready" | "error" | "reduced-motion";

interface FallbackProps {
  readonly fallbackImage?: string;
  readonly priority: boolean;
}

function Fallback({ fallbackImage, priority }: FallbackProps) {
  const [visible, setVisible] = useState(Boolean(fallbackImage));

  return (
    <span aria-hidden="true" className={styles.fallback}>
      {fallbackImage && visible ? (
        <Image
          alt=""
          className={styles.fallbackImage}
          fill
          loading={priority ? "eager" : "lazy"}
          onError={() => setVisible(false)}
          sizes="(min-width: 64rem) 40vw, 100vw"
          src={fallbackImage}
        />
      ) : null}
    </span>
  );
}

interface ActiveSplineProps extends FallbackProps, ScenePresentation {
  readonly sceneUrl: string;
  readonly running: boolean;
  readonly onSettled: () => void;
  readonly onReady?: () => void;
}

function ActiveSpline({
  sceneUrl,
  fallbackImage,
  priority,
  running,
  onSettled,
  onReady,
  secondsPerRevolution,
  sweepDegrees,
}: ActiveSplineProps) {
  const viewerRef = useRef<HTMLElement>(null);
  const appRef = useRef<SplineApplication | null>(null);
  const centreRef = useRef<number | null>(null);
  // Bumped whenever a scene anchors its centre, so the sweep restarts around
  // the product that is actually on screen.
  const [centreVersion, setCentreVersion] = useState(0);
  const shownUrl = useRef(sceneUrl);
  const [runtimeReady, setRuntimeReady] = useState(false);
  const [state, setState] = useState<LoadState>("loading");

  useEffect(() => {
    let cancelled = false;

    loadSplineViewer().then(
      () => {
        if (!cancelled) setRuntimeReady(true);
      },
      () => {
        if (cancelled) return;

        setState("error");
        onSettled();
      },
    );

    return () => {
      cancelled = true;
    };
  }, [onSettled]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !runtimeReady) return;

    const lost = () => {
      window.clearTimeout(releaseSlot);
      appRef.current = null;
      setRuntimeReady(false);
      setState("error");
      onSettled();
    };
    const complete = () => {
      window.clearTimeout(releaseSlot);

      const app = getSplineApplication(viewer);
      appRef.current = app;
      if (app) {
        centreRef.current = presentScene(app, {
          secondsPerRevolution,
          sweepDegrees,
        });
        setCentreVersion((version) => version + 1);
      }

      setState("ready");
      onSettled();
      onReady?.();
    };
    const releaseSlot = window.setTimeout(onSettled, SLOT_RELEASE_MS);

    viewer.addEventListener("load-complete", complete, { once: true });
    viewer.addEventListener("context-loss", lost, { once: true });

    return () => {
      window.clearTimeout(releaseSlot);
      viewer.removeEventListener("load-complete", complete);
      viewer.removeEventListener("context-loss", lost);
    };
  }, [onReady, onSettled, runtimeReady, secondsPerRevolution, sweepDegrees]);

  useEffect(() => {
    const app = appRef.current;
    if (!app || state !== "ready") return;

    // Pausing an off-screen scene frees the GPU without disposing anything,
    // so coming back is instant instead of another full start-up.
    setSceneRunning(app, running);
  }, [running, state]);

  useEffect(() => {
    if (running || state !== "loading") return;

    // The viewer suspends its own loading while it is off screen, so a scene
    // the visitor scrolled past would otherwise hold the start slot until the
    // safety timeout and keep the scene they can actually see waiting.
    onSettled();
  }, [onSettled, running, state]);

  useEffect(() => {
    const app = appRef.current;
    if (!app || state !== "ready" || !running) return;

    const sweep = ((sweepDegrees ?? DEFAULT_SWEEP_DEGREES) * Math.PI) / 180;
    const timeout = sweepTimeoutMs({ secondsPerRevolution, sweepDegrees });

    let timer = 0;
    let deadline = 0;
    // A sweep begins at its own edge, and damping can carry it a little past.
    // The edge only counts once the product has travelled back inside, which
    // is what stops it from resting again the instant it sets off.
    let insideSweep = false;

    const rest = () => {
      setTurntableTurning(app, false);
      timer = window.setTimeout(() => {
        reverseTurntable(app);
        setTurntableTurning(app, true);
        insideSweep = false;
        deadline = Date.now() + timeout;
        timer = window.setTimeout(watch, ANGLE_POLL_MS);
      }, REST_MS);
    };

    const watch = () => {
      const angle = getTurntableAngle(app);
      // Read through the ref: switching product loads another scene, which
      // brings its own camera and therefore its own centre to swing around.
      const centre = centreRef.current;
      const offCentre =
        angle === null || centre === null ? null : Math.abs(angle - centre);

      if (offCentre !== null && offCentre < sweep / 2) insideSweep = true;

      const reachedEdge =
        insideSweep && offCentre !== null && offCentre >= sweep / 2;

      if (reachedEdge || Date.now() > deadline) rest();
      else timer = window.setTimeout(watch, ANGLE_POLL_MS);
    };

    setTurntableTurning(app, true);
    deadline = Date.now() + timeout;
    timer = window.setTimeout(watch, ANGLE_POLL_MS);

    return () => {
      window.clearTimeout(timer);
      setTurntableTurning(app, false);
    };
  }, [centreVersion, running, secondsPerRevolution, state, sweepDegrees]);

  useEffect(() => {
    const app = appRef.current;
    if (!app || state !== "ready" || sceneUrl === shownUrl.current) return;

    let cancelled = false;
    shownUrl.current = sceneUrl;
    // Hold the turntable while the next product arrives. Swapping mid-sweep
    // leaves the camera in flight, and the centre read afterwards lands
    // somewhere between the two products rather than on the new one's front.
    setTurntableTurning(app, false);
    // The previous product stays on screen until the new one is ready, which
    // reads far calmer than blanking the frame between products.
    swapScene(app, sceneUrl, { secondsPerRevolution, sweepDegrees })
      .then((centre) => {
        if (cancelled) return;

        centreRef.current = centre;
        setCentreVersion((version) => version + 1);
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [sceneUrl, secondsPerRevolution, state, sweepDegrees]);

  return (
    <span className={styles.active} data-spline-state={state}>
      <Fallback fallbackImage={fallbackImage} priority={priority} />
      {runtimeReady ? (
        <spline-viewer
          aria-hidden="true"
          background="transparent"
          className={styles.viewer}
          ref={viewerRef}
          url={sceneUrl}
        />
      ) : null}
    </span>
  );
}

export function SplineProduct({
  sceneUrl,
  fallbackImage,
  ariaLabel,
  priority = false,
  onReady,
  secondsPerRevolution,
  sweepDegrees,
}: SplineProductProps) {
  const slotId = useId();
  const frameRef = useRef<HTMLElement>(null);
  // Server rendering cannot know the preference, and React keeps the server
  // attribute when a hydration render disagrees. Starting at false and letting
  // the effect below raise it guarantees a real re-render that reaches the DOM.
  const [reducedMotion, setReducedMotion] = useState(false);
  // Without an observer everything counts as visible, which is also the right
  // answer for the moment before the first intersection is delivered.
  const [onScreen, setOnScreen] = useState(true);
  const { hasStarted, requestStart, finishStart } = useSplineSceneSlot(slotId);

  useEffect(() => {
    if (!window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reducedMotion) return;

    // Read the preference again rather than trusting this render: on the first
    // commit the state above is still the hydration default, and a browser can
    // deliver the first intersection before React re-renders with the truth.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    if (!window.IntersectionObserver) {
      requestStart(0);
      return;
    }

    // Starts early, while the product is still approaching the viewport.
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const center =
          (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;

        requestStart(Math.abs(center - window.innerHeight / 2));
      },
      {
        rootMargin: priority ? "50% 0px" : "12.5% 0px",
        threshold: THRESHOLDS,
      },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, [priority, reducedMotion, requestStart]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || reducedMotion || !window.IntersectionObserver) return;

    // Deliberately without the head start above: the viewer suspends its own
    // loading the moment it truly leaves the viewport, so anything wider than
    // the real viewport would call a stalled scene "visible" and keep the
    // scene the visitor is actually looking at waiting for a free start slot.
    const observer = new window.IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: THRESHOLDS },
    );

    observer.observe(frame);

    return () => observer.disconnect();
  }, [reducedMotion]);

  const inactiveState: LoadState = reducedMotion ? "reduced-motion" : "idle";

  return (
    <figure
      aria-label={ariaLabel}
      className={styles.product}
      ref={frameRef}
      role="img"
    >
      {hasStarted ? (
        <ActiveSpline
          fallbackImage={fallbackImage}
          onReady={onReady}
          onSettled={finishStart}
          priority={priority}
          running={onScreen}
          sceneUrl={sceneUrl}
          secondsPerRevolution={secondsPerRevolution}
          sweepDegrees={sweepDegrees}
        />
      ) : (
        <span className={styles.active} data-spline-state={inactiveState}>
          <Fallback fallbackImage={fallbackImage} priority={priority} />
        </span>
      )}
    </figure>
  );
}
