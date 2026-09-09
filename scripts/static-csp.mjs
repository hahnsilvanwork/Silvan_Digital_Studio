import { createHash } from 'node:crypto';
import { parse } from 'parse5';

const MARKER = /<meta data-static-csp="true"[^>]*>/g;

export function assertStaticPages(manifest, pageRoutes) {
  for (const route of pageRoutes) {
    const fixed = manifest.routes[route];
    const parameterized = manifest.dynamicRoutes[route];
    if (fixed) {
      if (fixed.initialRevalidateSeconds !== false) throw new Error(`ISR page needs a runtime CSP: ${route}`);
    } else if (!parameterized || parameterized.fallback !== false) {
      throw new Error(`Dynamic HTML needs a runtime CSP: ${route}`);
    }
  }
}

/** Hash only trusted build output, never user-provided HTML. Preserve every byte. */
export function hardenHtml(input, { isolatedViewer = false } = {}) {
  const html = input.replace(MARKER, '');
  const document = parse(html, { sourceCodeLocationInfo: true });
  const hashes = new Set();
  let headEnd;
  function visit(node) {
    if (node.tagName === 'head') headEnd = node.sourceCodeLocation?.startTag?.endOffset;
    for (const attribute of node.attrs ?? []) {
      if (/^on[a-z]/i.test(attribute.name)) throw new Error(`Inline event handler: ${attribute.name}`);
      if (/^(href|src|action|formaction)$/i.test(attribute.name) && /^\s*javascript:/i.test(attribute.value)) {
        throw new Error('JavaScript URL cannot be published');
      }
    }
    if (node.tagName === 'script' && !(node.attrs ?? []).some(a => a.name === 'src')) {
      // HTML parsers normalize CR/CRLF before script execution and CSP hashing.
      const value = (node.childNodes ?? []).map(child => child.value ?? '').join('');
      if (value) hashes.add(`'sha256-${createHash('sha256').update(value).digest('base64')}'`);
    }
    for (const child of node.childNodes ?? []) visit(child);
    if (node.content) visit(node.content);
  }
  visit(document);
  if (headEnd === undefined) throw new Error('Static CSP requires an explicit document head');
  const policy = [
    "default-src 'self'",
    `script-src 'self' ${isolatedViewer ? "'unsafe-eval' https://cdn.spline.design/@splinetool/viewer@2.0.16/build/" : "https://va.vercel-scripts.com"} ${[...hashes].join(' ')}`.trim(),
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://prod.spline.design https://cdn.spline.design",
    "font-src 'self' data:",
    isolatedViewer
      ? "connect-src 'self' https://prod.spline.design https://cdn.spline.design https://www.gstatic.com/draco/versioned/decoders/1.5.2/ https://fonts.gstatic.com"
      : "connect-src 'self' blob: https://vitals.vercel-insights.com",
    "worker-src 'self' blob:",
    isolatedViewer ? "media-src 'self' blob: data:" : "media-src 'self' blob:",
    isolatedViewer ? "frame-src 'none'" : "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'none'",
  ].join('; ');
  // frame-ancestors must be delivered as an HTTP header, not in this meta policy.
  const meta = `<meta data-static-csp="true" http-equiv="Content-Security-Policy" content="${policy}">`;
  return html.slice(0, headEnd) + meta + html.slice(headEnd);
}
