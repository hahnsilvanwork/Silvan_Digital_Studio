"use client";

import { useEffect, useRef, useState } from "react";

import type { ProductVisualization } from "../../content/types";
import { SplineProduct } from "./SplineProduct";
import type { ScenePresentation } from "./spline-scene-controls";
import styles from "./products.module.css";

export interface ProductShowcaseProps extends ScenePresentation {
  readonly products: readonly ProductVisualization[];
  readonly selectorLabel: string;
  readonly priority?: boolean;
  /** Cycles through the products while nobody has chosen one. */
  readonly autoAdvanceMs?: number;
  /** The hero presents on its own; the buttons belong to the product section. */
  readonly selectable?: boolean;
  readonly className?: string;
}

export function ProductShowcase({
  products,
  selectorLabel,
  priority = false,
  autoAdvanceMs,
  selectable = true,
  secondsPerRevolution,
  sweepDegrees,
  className,
}: ProductShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [chosen, setChosen] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [showing3d, setShowing3d] = useState(false);

  const count = products.length;

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !window.IntersectionObserver) return;

    const observer = new window.IntersectionObserver(([entry]) =>
      setOnScreen(entry.isIntersecting),
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Cycling before the 3D has taken over would move the product on while
    // the visitor is still looking at the still of the previous one.
    if (!autoAdvanceMs || chosen || count < 2 || !onScreen || !showing3d) return;

    // Advancing out of sight would download scene after scene for nobody.
    const timer = window.setInterval(
      () => setIndex((current) => (current + 1) % count),
      autoAdvanceMs,
    );

    return () => window.clearInterval(timer);
  }, [autoAdvanceMs, chosen, count, onScreen, showing3d]);

  useEffect(() => {
    if (!showing3d || count < 2) return;

    // Warms the HTTP cache so switching product costs only the scene build,
    // not a round trip. The files are a few dozen kilobytes each.
    const aborter = new AbortController();
    for (const { sceneUrl } of products) {
      void fetch(sceneUrl, { signal: aborter.signal }).catch(() => {
        // A cold cache on the next switch is the worst case, not an error.
      });
    }

    return () => aborter.abort();
  }, [count, products, showing3d]);

  const active = count > 0 ? products[index % count] : undefined;

  if (!active) return null;

  return (
    <div
      className={[styles.showcase, className].filter(Boolean).join(" ")}
      ref={rootRef}
    >
      <SplineProduct
        ariaLabel={active.ariaLabel}
        fallbackImage={active.fallbackImage}
        onReady={() => setShowing3d(true)}
        priority={priority}
        secondsPerRevolution={secondsPerRevolution}
        sweepDegrees={sweepDegrees}
        sceneUrl={active.sceneUrl}
      />

      {selectable && count > 1 ? (
        <div aria-label={selectorLabel} className={styles.selector} role="group">
          {products.map((product, position) => (
            <button
              aria-pressed={product.id === active.id}
              data-touch-target
              key={product.id}
              onClick={() => {
                setIndex(position);
                // Someone who picked a product should keep looking at it.
                setChosen(true);
              }}
              type="button"
            >
              {product.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
