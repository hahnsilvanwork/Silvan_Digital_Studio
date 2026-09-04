"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { ProductHeroImage } from "../../content/types";
import styles from "./products.module.css";

const HERO_INTERVAL_MS = 5_500;

interface ProductHeroProps {
  readonly images: readonly ProductHeroImage[];
  readonly indicatorLabel: string;
  readonly pauseLabel: string;
  readonly resumeLabel: string;
}

export function ProductHero({
  images,
  indicatorLabel,
  pauseLabel,
  resumeLabel,
}: ProductHeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [visibilityPaused, setVisibilityPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(Boolean(media?.matches));
    const updateVisibility = () =>
      setVisibilityPaused(document.visibilityState === "hidden");

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
    if (userPaused || visibilityPaused || reducedMotion || images.length < 2)
      return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, HERO_INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [images.length, reducedMotion, userPaused, visibilityPaused]);

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
      <figcaption className={styles.heroControls}>
        <div
          aria-label={indicatorLabel}
          className={styles.heroIndicators}
          role="group"
        >
          {images.map((image, index) => (
            <button
              aria-label={`${indicatorLabel} ${index + 1}: ${image.alt}`}
              aria-pressed={index === activeIndex}
              className={styles.heroIndicator}
              data-active={index === activeIndex}
              data-touch-target
              key={image.src}
              onClick={() => {
                setActiveIndex(index);
                setUserPaused(true);
              }}
              type="button"
            />
          ))}
        </div>
        <span className="visually-hidden">
          {activeIndex + 1} / {images.length}
        </span>
        {images.length > 1 && !reducedMotion ? (
          <button
            aria-label={userPaused ? resumeLabel : pauseLabel}
            className={styles.heroPause}
            data-touch-target
            onClick={() => setUserPaused((current) => !current)}
            title={userPaused ? resumeLabel : pauseLabel}
            type="button"
          >
            <span aria-hidden="true">{userPaused ? "▶" : "Ⅱ"}</span>
          </button>
        ) : null}
      </figcaption>
    </figure>
  );
}
