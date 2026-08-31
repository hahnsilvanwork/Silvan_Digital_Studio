"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";

import { useSplineSceneLease } from "./SplineSceneProvider";
import { loadSplineViewer } from "./spline-viewer-loader";
import styles from "./products.module.css";

const LOAD_TIMEOUT_MS = 20_000;
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
}

function ActiveSpline({
  sceneUrl,
  fallbackImage,
  priority,
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
        if (!cancelled) setState("error");
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer || !runtimeReady) return;

    const failed = () => {
      window.clearTimeout(timeout);
      setRuntimeReady(false);
      setState("error");
    };
    const complete = () => {
      window.clearTimeout(timeout);
      setState("ready");
    };
    const timeout = window.setTimeout(failed, LOAD_TIMEOUT_MS);

    viewer.addEventListener("load-complete", complete, { once: true });
    viewer.addEventListener("context-loss", failed, { once: true });

    return () => {
      window.clearTimeout(timeout);
      viewer.removeEventListener("load-complete", complete);
      viewer.removeEventListener("context-loss", failed);
    };
  }, [runtimeReady]);

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
  const leaseId = useId();
  const frameRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches),
  );
  const { isActive, reportProximity } = useSplineSceneLease(leaseId);

  useEffect(() => {
    if (!window.matchMedia) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);

    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    if (!window.IntersectionObserver) {
      reportProximity(!reducedMotion, 0);
      return () => reportProximity(false, Number.POSITIVE_INFINITY);
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        const center =
          (entry.boundingClientRect.top + entry.boundingClientRect.bottom) / 2;

        reportProximity(
          entry.isIntersecting && !reducedMotion,
          Math.abs(center - window.innerHeight / 2),
        );
      },
      {
        rootMargin: priority ? "50% 0px" : "12.5% 0px",
        threshold: THRESHOLDS,
      },
    );

    observer.observe(frame);

    return () => {
      observer.disconnect();
      reportProximity(false, Number.POSITIVE_INFINITY);
    };
  }, [priority, reducedMotion, reportProximity]);

  const inactiveState: LoadState = reducedMotion ? "reduced-motion" : "idle";

  return (
    <figure
      aria-label={ariaLabel}
      className={styles.product}
      ref={frameRef}
      role="img"
    >
      {isActive && !reducedMotion ? (
        <ActiveSpline
          fallbackImage={fallbackImage}
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
