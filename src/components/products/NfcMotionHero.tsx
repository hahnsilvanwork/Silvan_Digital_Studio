"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Locale } from "../../content/types";
import styles from "./nfc-motion.module.css";
import { NfcDemoScreen } from "./NfcDemoScreen";

const scenes = [
  { name: "Menu", image: "menu-round-black-78746a65bfe4.png", detail: ["Karte antippen. Menü öffnen.", "Tap the card. Open the menu."], kind: "menu" },
  { name: "Google", image: "review-round-black-4554e8ac3153.png", detail: ["Der kurze Weg zur Bewertung.", "A direct link to leave a review."], kind: "review" },
  { name: "Instagram", image: "nfc-014-instagram-e94ce06a2966.png", detail: ["Ihr Profil. Direkt erreichbar.", "Your profile. One tap away."], kind: "instagram" },
  { name: "Facebook", image: "nfc-020-facebook-10ab09650ef7.png", detail: ["Ihre Seite direkt auf dem Handy.", "Your page, right on their phone."], kind: "facebook" },
  { name: "Airbnb", image: "nfc-032-airbnb-87be1722e571.png", detail: ["Alle Infos zum Aufenthalt.", "Everything about their stay."], kind: "stay" },
] as const;

/** A local, silent motion composition: original photography + illustrative HTML screens. */
export function NfcMotionHero({ locale }: { readonly locale: Locale }) {
  const root = useRef<HTMLElement>(null);
  const [available, setAvailable] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [paused, setPaused] = useState(false);
  const de = locale === "de";

  useEffect(() => {
    const media = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    let inView = true;
    const update = () => {
      setReduced(media?.matches ?? true);
      setAvailable(inView && document.visibilityState !== "hidden");
    };
    const observer = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    }, { threshold: 0.05 });
    if (root.current) observer?.observe(root.current);
    media?.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer?.disconnect();
      media?.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <figure ref={root} className={styles.film} data-nfc-motion data-running={available && !reduced && !paused} data-static={reduced}>
      <div className={styles.stage} aria-hidden="true">
        <div className={styles.light} />
        <div className={styles.topline}><span className={styles.signature}>SILVAN</span><span>NFC &amp; QR</span></div>
        {scenes.map((scene, index) => (
          <div className={styles.scene} data-index={index} key={scene.name} style={{ "--delay": `${index * 7.5}s` } as CSSProperties}>
            <div className={styles.product}>
              <Image src={`/images/products/main/${scene.image}`} alt="" fill sizes="(min-width: 1024px) 340px, 65vw" loading={index === 0 ? "eager" : "lazy"} className={styles.photo} />
            </div>
            <div className={styles.signal} data-nfc-target><span /><span /></div>
            <div className={styles.phone} data-nfc-phone>
              <span className={styles.reader} data-nfc-reader />
              <span className={styles.sideKey} /><span className={styles.volumeKeys} /><div className={styles.island}><i /></div>
              <div className={styles.status}><span>9:41</span><span className={styles.statusIcons}><svg viewBox="0 0 40 12" fill="currentColor"><path d="M0 9h2v3H0zm4-3h2v6H4zm4-3h2v9H8zm4-3h2v12h-2z"/><path d="M18 3q7-6 14 0l-2 2q-5-4-10 0zm4 4q3-3 6 0l-3 4z"/><rect x="35" y="2" width="4" height="8" rx="1"/></svg></span></div>
              <div className={styles.lockScreen}><span>◌</span><small>{de ? "Mittwoch, 9. September" : "Wednesday, 9 September"}</small><strong>9:41</strong><div className={styles.lockTools}><span>◉</span><span>▣</span></div></div>
              <div className={styles.notification} data-nfc-notification><b>NFC</b><span>{de ? "Link erkannt" : "Link detected"}<small>{de ? "Antippen zum Öffnen" : "Tap to open"}</small></span></div>
              <span className={styles.tap} data-nfc-tap />
              <div className={styles.screen} data-nfc-screen>
                <NfcDemoScreen kind={scene.kind} de={de} />
              </div>
              <span className={styles.homeBar} />
            </div>
            <div className={styles.sceneLabel}><strong>{scene.name === "Menu" && de ? "Speisekarte" : scene.name}</strong><span>{scene.detail[de ? 0 : 1]}</span></div>
          </div>
        ))}
      </div>
      <figcaption className={styles.caption}>
        <span>{de ? "Produktbeispiele mit fiktiven Profilen." : "Product examples with fictional profiles."}</span>
      {!reduced ? <button type="button" className={styles.motionControl} data-touch-target aria-pressed={paused} onClick={() => setPaused(current => !current)}>
          {paused ? (de ? "Animation fortsetzen" : "Resume animation") : (de ? "Animation pausieren" : "Pause animation")}
        </button> : null}
      </figcaption>
    </figure>
  );
}
