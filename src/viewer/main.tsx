import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { SplineProduct } from '../components/products/SplineProduct';
import { SplineSceneProvider } from '../components/products/SplineSceneProvider';
import { isActivityEvent, parseViewerConfig } from './protocol';
import './viewer.css';

const config = parseViewerConfig(window.location.hash);
const send = (type: 'ready' | 'error' | 'close') => window.parent.postMessage({ type }, '*');
const ready = () => send('ready');
const failed = () => send('error');

function Viewer() {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.source !== window.parent || !isActivityEvent(event.data)) return;
      // Commit a stop before the parent removes the measured frame.
      flushSync(() => setActive(event.data.active));
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); send('close'); }
    };
    window.addEventListener('message', receive);
    window.addEventListener('keydown', keydown);
    return () => { window.removeEventListener('message', receive); window.removeEventListener('keydown', keydown); };
  }, []);
  if (!config) return null;
  // matchMedia inside SplineProduct observes the same user motion preference
  // as the parent, while allowReducedMotion permits a stationary explicit view.
  return <SplineSceneProvider><SplineProduct {...config} active={active} ariaLabel="Interactive product model" allowReducedMotion onReady={ready} onError={failed} /></SplineSceneProvider>;
}

if (!config || window.parent === window) failed();
else createRoot(document.getElementById('viewer')!).render(<Viewer />);
