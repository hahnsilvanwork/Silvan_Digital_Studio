'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './hover-preview.module.css';

export interface PreviewImage { readonly key: string; readonly src: string; readonly width: number; readonly height: number }

/**
 * Wraps a list whose rows carry `data-preview="<key>"`. On a fine pointer a
 * small real image of that service follows the cursor, eased with
 * requestAnimationFrame. Decorative only (aria-hidden); touch, keyboard and
 * reduced-motion users get the plain list.
 */
export function HoverPreview({ images, children }: { readonly images: readonly PreviewImage[]; readonly children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const root = wrap.current;
    const floating = card.current;
    if (!root || !floating || typeof window.matchMedia !== 'function') return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const target = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };
    let frame = 0;
    let running = false;
    const tick = () => {
      position.x += (target.x - position.x) * 0.18;
      position.y += (target.y - position.y) * 0.18;
      floating.style.transform = `translate3d(${position.x}px, ${position.y}px, 0)`;
      if (Math.abs(target.x - position.x) + Math.abs(target.y - position.y) > 0.5) frame = requestAnimationFrame(tick);
      else running = false;
    };
    const move = (event: PointerEvent) => {
      const row = (event.target as Element).closest<HTMLElement>('[data-preview]');
      setActive(row?.dataset.preview ?? null);
      target.x = event.clientX + 28;
      target.y = event.clientY - 90;
      if (!running) { running = true; frame = requestAnimationFrame(tick); }
    };
    const enter = (event: PointerEvent) => { position.x = target.x = event.clientX + 28; position.y = target.y = event.clientY - 90; };
    const leave = () => setActive(null);
    root.addEventListener('pointerenter', enter);
    root.addEventListener('pointermove', move);
    root.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(frame); root.removeEventListener('pointerenter', enter); root.removeEventListener('pointermove', move); root.removeEventListener('pointerleave', leave); };
  }, []);

  return <div ref={wrap} className={styles.wrap}>
    {children}
    <div ref={card} className={styles.card} data-active={active !== null} aria-hidden="true">
      {images.map(image => <Image key={image.key} className={styles.image} data-shown={active === image.key} src={image.src} width={image.width} height={image.height} sizes="280px" alt="" />)}
    </div>
  </div>;
}
