"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { useSplineSceneSlot } from "./SplineSceneProvider";
import { loadSplineViewer } from "./spline-viewer-loader";
import styles from "./products.module.css";

// A slow scene must not block the other one forever. It must not be torn down
// either: on a weak phone the first frame can still be seconds away.
const SLOT_RELEASE_MS = 10_000;
const THRESHOLDS = [0, 0.25, 0.5, 0.75, 1];

export interface SplineProductProps {
  readonly sceneUrl: string;
  readonly fallbackImage?: string;
  readonly ariaLabel: string;
  readonly priority?: boolean;
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

interface ActiveSplineProps extends FallbackProps {
  readonly sceneUrl: string;
  readonly onSettled: () => void;
}

function ActiveSpline({
  sceneUrl,
  fallbackImage,
  priority,
  onSettled,
}: ActiveSplineProps) {
  const viewerRef = useRef<HTMLElement>(null);
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
      setRuntimeReady(false);
      setState("error");
      onSettled();
    };
    const complete = () => {
      window.clearTimeout(releaseSlot);
      setState("ready");
      onSettled();
    };
    const releaseSlot = window.setTimeout(onSettled, SLOT_RELEASE_MS);

    viewer.addEventListener("load-complete", complete, { once: true });
    viewer.addEventListener("context-loss", lost, { once: true });

    return () => {
      window.clearTimeout(releaseSlot);
      viewer.removeEventListener("load-complete", complete);
      viewer.removeEventListener("context-loss", lost);
    };
  }, [onSettled, runtimeReady]);

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
}: SplineProductProps) {
  const slotId = useId();
  const frameRef = useRef<HTMLElement>(null);
  // Server rendering cannot know the preference, and React keeps the server
  // attribute when a hydration render disagrees. Starting at false and letting
  // the effect below raise it guarantees a real re-render that reaches the DOM.
  const [reducedMotion, setReducedMotion] = useState(false);
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
    // Asking once is enough. Scrolling away must not revoke the scene, because
    // rebuilding a WebGPU context re-downloads and re-initialises everything.
    if (!frame || reducedMotion || hasStarted) return;

    // Read the preference again rather than trusting this render: on the first
    // commit the state above is still the hydration default, and a browser can
    // deliver the first intersection before React re-renders with the truth.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    if (!window.IntersectionObserver) {
      requestStart(0);
      return;
    }

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
  }, [hasStarted, priority, reducedMotion, requestStart]);

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
          onSettled={finishStart}
          priority={priority}
          sceneUrl={sceneUrl}
        />
      ) : (
        <span className={styles.active} data-spline-state={inactiveState}>
          <Fallback fallbackImage={fallbackImage} priority={priority} />
        </span>
      )}
    </figure>
  );
}
