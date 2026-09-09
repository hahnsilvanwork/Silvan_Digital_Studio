// Only public catalogue scenes cross the isolated frame boundary.
export const SCENES = {
  black: 'https://prod.spline.design/k2oyfSvDdVisnlUw/scene.splinecode',
  white: 'https://prod.spline.design/Lu503y2nQ8XllpRe/scene.splinecode',
  blue: 'https://prod.spline.design/fttoKfHSbrqCbrUd/scene.splinecode',
  stand: 'https://prod.spline.design/9R8JSb5RsHstdJxk/scene.splinecode',
} as const;

function bounded(value: string | null, fallback: number, min: number, max: number) {
  const number = value === null ? fallback : Number(value);
  return Number.isFinite(number) ? Math.max(min, Math.min(max, number)) : fallback;
}

export function parseViewerConfig(fragment: string) {
  const values = new URLSearchParams(fragment.replace(/^#/, ''));
  const scene = values.get('scene');
  if (!scene || !Object.hasOwn(SCENES, scene)) return null;
  return {
    sceneUrl: SCENES[scene as keyof typeof SCENES],
    secondsPerRevolution: bounded(values.get('seconds'), 45, 15, 180),
    sweepDegrees: bounded(values.get('sweep'), 30, 0, 60),
  };
}

export function viewerFragment(sceneUrl: string, seconds = 45, sweep = 30) {
  const scene = Object.entries(SCENES).find(([, url]) => url === sceneUrl)?.[0];
  if (!scene) return null;
  return new URLSearchParams({ scene, seconds: String(seconds), sweep: String(sweep) }).toString();
}

export function isViewerEvent(data: unknown): data is { type: 'ready' | 'error' | 'close' } {
  return typeof data === 'object' && data !== null && 'type' in data &&
    Object.keys(data).length === 1 && ['ready', 'error', 'close'].includes(String(data.type));
}

export function isActivityEvent(data: unknown): data is { type: 'activity'; active: boolean } {
  return typeof data === 'object' && data !== null && 'type' in data && data.type === 'activity' &&
    'active' in data && typeof data.active === 'boolean' && Object.keys(data).length === 2;
}
