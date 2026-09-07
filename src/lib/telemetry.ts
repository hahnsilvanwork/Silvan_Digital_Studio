const PATHS = new Set(["/", "/websites", "/reviews", "/presence", "/automation", "/work", "/about", "/contact", "/hello", "/imprint", "/privacy", "/work/falkenried", "/work/cafe-vogel", "/work/steiner-handwerk", "/work/salon-lumiere"]);

export function sanitizeTelemetryUrl(value: string): string | null {
  try {
    const url = new URL(value);
    const path = url.pathname.replace(/^\/en(?=\/|$)/, "") || "/";
    if (!/^https?:$/.test(url.protocol) || !PATHS.has(path)) return null;
    return `${url.origin}${url.pathname}`;
  } catch {
    return null;
  }
}
