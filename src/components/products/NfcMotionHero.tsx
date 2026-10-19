"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../content/types";
import styles from "./nfc-motion.module.css";

type DataConnection = EventTarget & { readonly saveData?: boolean };

/** The owner's card film, paced by sequence into a 12-second loop. */
export function NfcMotionHero({ locale }: { readonly locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [available, setAvailable] = useState(false);
  const [staticMotion, setStaticMotion] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const de = locale === "de";

  useEffect(() => {
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & { connection?: DataConnection }).connection;
    let inView = true;
    const update = () => {
      setStaticMotion((preference?.matches ?? true) || Boolean(connection?.saveData));
      setAvailable(inView && document.visibilityState !== "hidden");
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.1 });
    if (root.current) observer?.observe(root.current);
    preference?.addEventListener("change", update);
    connection?.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer?.disconnect();
      preference?.removeEventListener("change", update);
      connection?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    if (available && !staticMotion && !paused && !failed) {
      video.muted = true;
      video.defaultMuted = true;
      if (!video.getAttribute("src")) video.src = "/videos/nfc-cards-fast.mp4?v=12s";
      video.play().catch((error: unknown) => {
        if (!disposed && !(error instanceof DOMException && error.name === "AbortError")) setPaused(true);
      });
    } else {
      if (!video.paused) video.pause();
    }
    return () => { disposed = true; if (!video.paused) video.pause(); };
  }, [available, staticMotion, paused, failed]);

  const showVideo = hasFrame && !staticMotion && !failed;
  return (
    <figure ref={root} className={styles.film} data-nfc-motion data-running={playing && available && !staticMotion && !paused && !failed} data-static={staticMotion || failed}>
      <div className={styles.stage}>
        <Image src="/videos/nfc-cards-poster.webp" alt="" width={1280} height={720} priority unoptimized className={styles.poster} data-visible={!showVideo} />
        <video ref={videoRef} className={styles.video} data-visible={showVideo} muted playsInline loop preload="none" tabIndex={-1} aria-hidden="true"
          onPlaying={() => { setHasFrame(true); setPlaying(true); }}
          onPause={() => setPlaying(false)}
          onError={() => { setFailed(true); setPlaying(false); }}
        />
        {!staticMotion && !failed && <button type="button" className={styles.motionControl} data-touch-target aria-pressed={paused}
          aria-label={paused ? (de ? "Animation fortsetzen" : "Resume animation") : (de ? "Animation pausieren" : "Pause animation")}
          title={paused ? (de ? "Animation fortsetzen" : "Resume animation") : (de ? "Animation pausieren" : "Pause animation")}
          onClick={() => setPaused(current => !current)}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            {paused ? <path d="m5 3 8 5-8 5z" /> : <path d="M4 3h3v10H4zm5 0h3v10H9z" />}
          </svg>
        </button>}
      </div>
      <figcaption className={styles.caption}>
        <span>{failed
          ? (de ? "Standbild der Karten." : "Still image of the cards.")
          : (de ? "Kurzfilm: die Karten aus der Nähe." : "Short film: the cards up close.")}</span>
      </figcaption>
    </figure>
  );
}
