import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { NfcMotionHero } from '../../src/components/products/NfcMotionHero';
beforeEach(() => {
 vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue(undefined);
 vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) { fireEvent.pause(this); });
});
afterEach(() => {cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks();});
it.each(['de','en'] as const)('keeps explicit pause across viewport and tab changes in %s', locale => {
 let observe: IntersectionObserverCallback = () => {};
 vi.stubGlobal('IntersectionObserver', class { constructor(callback: IntersectionObserverCallback) {observe=callback;} observe(){} disconnect(){} });
 vi.stubGlobal('matchMedia', () => ({matches:false,addEventListener(){},removeEventListener(){}}));
 const {container}=render(<NfcMotionHero locale={locale}/>);
 fireEvent.playing(container.querySelector('video')!);
 const film=container.querySelector('[data-nfc-motion]');
 expect(film).toHaveAttribute('data-running','true');
 fireEvent.click(screen.getByRole('button',{name:locale==='de'?'Animation pausieren':'Pause animation'}));
 act(()=>{observe([{isIntersecting:false}] as IntersectionObserverEntry[], {} as IntersectionObserver); observe([{isIntersecting:true}] as IntersectionObserverEntry[], {} as IntersectionObserver); document.dispatchEvent(new Event('visibilitychange'));});
 expect(film).toHaveAttribute('data-running','false');
 const resume=screen.getByRole('button',{name:locale==='de'?'Animation fortsetzen':'Resume animation'});
 expect(resume).toHaveAttribute('aria-pressed','true'); fireEvent.click(resume); fireEvent.playing(container.querySelector('video')!); expect(film).toHaveAttribute('data-running','true');
});
it('keeps reduced motion static without downloading the film',()=>{vi.stubGlobal('matchMedia',()=>({matches:true,addEventListener(){},removeEventListener(){}})); const {container}=render(<NfcMotionHero locale="en"/>); expect(container.querySelector('[data-nfc-motion]')).toHaveAttribute('data-static','true');expect(container.querySelector('video')).not.toHaveAttribute('src');expect(screen.queryByRole('button')).toBeNull();});
it('retains the poster when the film cannot load',()=>{vi.stubGlobal('matchMedia',()=>({matches:false,addEventListener(){},removeEventListener(){}})); const {container}=render(<NfcMotionHero locale="de"/>); fireEvent.error(container.querySelector('video')!); expect(container.querySelector('[data-nfc-motion]')).toHaveAttribute('data-static','true'); expect(container.querySelector('img')).toHaveAttribute('data-visible','true'); expect(screen.getByText('Standbild der Karten.')).toBeVisible(); expect(screen.queryByRole('button')).toBeNull();});
