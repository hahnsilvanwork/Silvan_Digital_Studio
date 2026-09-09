import { NextResponse, type NextRequest } from 'next/server';
import { errorPageCsp } from './lib/error-page-csp';

/** Supply the URL language to the standalone 404 document, never a query value. */
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  const path = request.nextUrl.pathname;
  headers.set('x-silvan-locale', path === '/en' || path.startsWith('/en/') ? 'en' : 'de');
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  headers.set('x-silvan-nonce', nonce);
  // Next reads this request policy to nonce its runtime scripts. Static pages
  // keep their build-time hash policy; only the 404 emits this policy in HTML.
  headers.set('Content-Security-Policy', errorPageCsp(nonce));
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ['/:path*'],
};
