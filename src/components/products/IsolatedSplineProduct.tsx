"use client";

import { useEffect, useRef } from 'react';
import type { SplineProductProps } from './SplineProduct';
import { isViewerEvent, viewerFragment } from '../../viewer/protocol';

interface IsolatedSplineProductProps extends SplineProductProps {
  readonly onRequestClose?: () => void;
}

export function IsolatedSplineProduct({
  sceneUrl, ariaLabel, active = true, secondsPerRevolution, sweepDegrees,
  onReady, onError, onRequestClose,
}: IsolatedSplineProductProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const callbacks = useRef({ onReady, onError, onRequestClose });
  const fragment = viewerFragment(sceneUrl, secondsPerRevolution, sweepDegrees);
  const src = fragment === null ? null : `/3d/viewer.html#${fragment}`;

  useEffect(() => { callbacks.current = { onReady, onError, onRequestClose }; }, [onReady, onError, onRequestClose]);

  useEffect(() => {
    if (!src) { callbacks.current.onError?.(); return; }
    const frame = frameRef.current;
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled) { settled = true; callbacks.current.onError?.(); }
    }, 30_000);
    const receive = (event: MessageEvent) => {
      // A sandbox without allow-same-origin has an opaque ("null") origin.
      if (!frame?.contentWindow || event.source !== frame.contentWindow || event.origin !== 'null' || !isViewerEvent(event.data)) return;
      if (event.data.type === 'close') { callbacks.current.onRequestClose?.(); return; }
      if (event.data.type === 'ready') {
        if (settled) return;
        settled = true; window.clearTimeout(timeout); callbacks.current.onReady?.();
      } else {
        settled = true; window.clearTimeout(timeout); callbacks.current.onError?.();
      }
    };
    window.addEventListener('message', receive);
    return () => {
      // No private data is sent to the opaque origin, only a rendering flag.
      frame?.contentWindow?.postMessage({ type: 'activity', active: false }, '*');
      window.removeEventListener('message', receive);
      window.clearTimeout(timeout);
    };
  }, [src]);

  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage({ type: 'activity', active }, '*');
  }, [active, src]);

  if (!src) return null;
  return <iframe
    key={src}
    ref={frameRef}
    title={ariaLabel}
    src={src}
    sandbox="allow-scripts"
    referrerPolicy="no-referrer"
    onLoad={() => frameRef.current?.contentWindow?.postMessage({ type: 'activity', active }, '*')}
    onError={() => callbacks.current.onError?.()}
    style={{ width: '100%', height: '100%', border: 0, display: 'block' }}
    data-isolated-spline
  />;
}
