/** Runtime equivalent of the build-time policy for the dynamic 404 document. */
export function errorPageCsp(nonce: string) {
  return [
    "default-src 'self'",
    `script-src 'self' https://va.vercel-scripts.com 'nonce-${nonce}'`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://prod.spline.design https://cdn.spline.design",
    "font-src 'self' data:",
    "connect-src 'self' blob: https://vitals.vercel-insights.com",
    "worker-src 'self' blob:",
    "media-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
}
