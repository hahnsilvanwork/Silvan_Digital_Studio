'use client';

import { useEffect, useRef } from 'react';

/**
 * A soft light that follows the pointer across the navy opening. Purely
 * decorative: it only moves a CSS custom property, never the layout, and stays
 * off for touch, coarse pointers and reduced motion.
 */
export function HeroGlow({ className }: { readonly className: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const glow = ref.current;
    const hero = glow?.parentElement;
    if (!glow || !hero || typeof window.matchMedia !== 'function') return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || calm.matches) return;
    let frame = 0;
    const move = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const box = hero.getBoundingClientRect();
        glow.style.setProperty('--gx', `${event.clientX - box.left}px`);
        glow.style.setProperty('--gy', `${event.clientY - box.top}px`);
        glow.dataset.active = 'true';
      });
    };
    const leave = () => { glow.dataset.active = 'false'; };
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', leave);
    return () => { cancelAnimationFrame(frame); hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); };
  }, []);

  return <span ref={ref} className={className} aria-hidden="true" data-active="false" />;
}
