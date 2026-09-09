import { act, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IsolatedSplineProduct } from '../../src/components/products/IsolatedSplineProduct';
import { parseViewerConfig, SCENES } from '../../src/viewer/protocol';

afterEach(() => vi.useRealTimers());
describe('isolated Spline boundary', () => {
  it('limits the frame to scripts and accepts only its own opaque-origin events', () => {
    const onReady = vi.fn(); const onError = vi.fn(); const onRequestClose = vi.fn();
    render(<IsolatedSplineProduct sceneUrl={SCENES.black} ariaLabel="Black model" onReady={onReady} onError={onError} onRequestClose={onRequestClose} />);
    const frame = screen.getByTitle('Black model') as HTMLIFrameElement;
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.getAttribute('referrerpolicy')).toBe('no-referrer');
    const dispatch = (source: MessageEventSource | null, origin: string, data: unknown) => act(() => window.dispatchEvent(new MessageEvent('message', { source, origin, data })));
    dispatch(window, 'null', { type: 'ready' });
    dispatch(frame.contentWindow, window.location.origin, { type: 'ready' });
    dispatch(frame.contentWindow, 'null', { type: 'navigate', url: 'https://example.com' });
    expect(onReady).not.toHaveBeenCalled(); expect(onError).not.toHaveBeenCalled();
    dispatch(frame.contentWindow, 'null', { type: 'ready' });
    dispatch(frame.contentWindow, 'null', { type: 'close' });
    expect(onReady).toHaveBeenCalledOnce(); expect(onRequestClose).toHaveBeenCalledOnce();
  });
  it('rejects arbitrary scene URLs and clamps fragment controls', () => {
    expect(parseViewerConfig('#scene=https://attacker.example/scene')).toBeNull();
    expect(parseViewerConfig('#scene=constructor')).toBeNull();
    expect(parseViewerConfig('#scene=black&seconds=-1&sweep=999')).toMatchObject({ sceneUrl: SCENES.black, secondsPerRevolution: 15, sweepDegrees: 60 });
    expect(parseViewerConfig('#scene=black&seconds=NaN&sweep=Infinity')).toMatchObject({ secondsPerRevolution: 45, sweepDegrees: 30 });
  });
  it('reports a timeout and sends only boolean activity before unmount', () => {
    vi.useFakeTimers(); const onError = vi.fn();
    const { rerender, unmount } = render(<IsolatedSplineProduct sceneUrl={SCENES.black} ariaLabel="Model" onError={onError} />);
    const frame = screen.getByTitle('Model') as HTMLIFrameElement;
    const post = vi.spyOn(frame.contentWindow!, 'postMessage');
    rerender(<IsolatedSplineProduct active={false} sceneUrl={SCENES.black} ariaLabel="Model" onError={onError} />);
    expect(post).toHaveBeenCalledWith({ type: 'activity', active: false }, '*');
    act(() => vi.advanceTimersByTime(30000));
    expect(onError).toHaveBeenCalledOnce();
    unmount(); expect(post).toHaveBeenLastCalledWith({ type: 'activity', active: false }, '*');
  });
});
