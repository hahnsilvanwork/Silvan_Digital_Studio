import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { NfcMotionHero } from '../../src/components/products/NfcMotionHero';
afterEach(() => {cleanup(); vi.unstubAllGlobals();});
it.each(['de','en'] as const)('keeps explicit pause across viewport and tab changes in %s', locale => {
 let observe: IntersectionObserverCallback = () => {};
 vi.stubGlobal('IntersectionObserver', class { constructor(callback: IntersectionObserverCallback) {observe=callback;} observe(){} disconnect(){} });
 vi.stubGlobal('matchMedia', () => ({matches:false,addEventListener(){},removeEventListener(){}}));
 const {container}=render(<NfcMotionHero locale={locale}/>);
 const film=container.querySelector('[data-nfc-motion]');
 expect(film).toHaveAttribute('data-running','true');
 fireEvent.click(screen.getByRole('button',{name:locale==='de'?'Animation pausieren':'Pause animation'}));
 act(()=>{observe([{isIntersecting:false}] as IntersectionObserverEntry[], {} as IntersectionObserver); observe([{isIntersecting:true}] as IntersectionObserverEntry[], {} as IntersectionObserver); document.dispatchEvent(new Event('visibilitychange'));});
 expect(film).toHaveAttribute('data-running','false');
 const resume=screen.getByRole('button',{name:locale==='de'?'Animation fortsetzen':'Resume animation'});
 expect(resume).toHaveAttribute('aria-pressed','true'); fireEvent.click(resume); expect(film).toHaveAttribute('data-running','true');
});
it('keeps reduced motion static without offering a misleading play action',()=>{vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener(){},removeEventListener(){}})); const {container}=render(<NfcMotionHero locale="en"/>); expect(container.querySelector('[data-nfc-motion]')).toHaveAttribute('data-static','true');expect(screen.queryByRole('button')).toBeNull();});
