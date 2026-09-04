"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ProductHeroImage } from "../../content/types";
import styles from "./products.module.css";

const HERO_INTERVAL_MS = 5_500;

interface ProductHeroProps {
  readonly images: readonly ProductHeroImage[];
  readonly indicatorLabel: string;
}

export function ProductHero({ images, indicatorLabel }: ProductHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(Boolean(media?.matches));
    const updateVisibility = () =>
      setPaused(document.visibilityState === "hidden");

    updateMotion();
    updateVisibility();
    media?.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      media?.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || images.length < 2) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, HERO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [images.length, paused, reducedMotion]);

  if (images.length === 0) return null;

  return (
    <figure className={styles.heroMedia} data-product-hero>
      <div className={styles.heroFrames}>
        {images.map((image, index) => (
          <Image
            alt={image.alt}
            className={styles.heroImage}
            data-active={index === activeIndex}
            data-fit={image.fit ?? "cover"}
            fill
            key={image.src}
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(min-width: 64rem) 42vw, 100vw"
            src={image.src}
          />
        ))}
      </div>
      <figcaption className={styles.heroIndicators}>
        <span className="visually-hidden">{indicatorLabel}: </span>
        {images.map((image, index) => (
          <span
            aria-hidden="true"
            className={styles.heroIndicator}
            data-active={index === activeIndex}
            key={image.src}
          />
        ))}
        <span className="visually-hidden">
          {activeIndex + 1} / {images.length}
        </span>
      </figcaption>
    </figure>
  );
}
