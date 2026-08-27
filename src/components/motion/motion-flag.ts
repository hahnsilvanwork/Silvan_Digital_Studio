/**
 * Runs before the first paint, so a reveal never flashes its final state first.
 *
 * It sets the flag that arms the hidden reveal states, and starts a fallback
 * timer that clears the flag again if the application bundle never boots --
 * without that, a failed or blocked bundle would leave the page permanently
 * blank below the fold.
 */
export const MOTION_FLAG_SCRIPT = `(function(){var d=document.documentElement;try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){d.dataset.motion="reduce";return}d.dataset.motion="on";window.setTimeout(function(){if(d.dataset.motion==="on"&&d.dataset.motionReady!=="true"){d.dataset.motion="off"}},2500)}catch(e){d.dataset.motion="off"}})();`;
