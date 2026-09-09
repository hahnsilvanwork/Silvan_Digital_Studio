import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
// Build tooling is plain Node and does not enter the application bundle.
// @ts-expect-error Node build module intentionally has no TS declarations.
import { hardenHtml, assertStaticPages } from "../../scripts/static-csp.mjs";

describe("static document CSP", () => {
  it("allows embedded GLB textures without allowing blob scripts", () => {
    const output = hardenHtml("<html><head></head><body></body></html>");
    expect(output).toContain("connect-src 'self' blob:");
    expect(output.match(/script-src ([^;]+)/)?.[1]).not.toContain("blob:");
  });
  it("rejects runtime HTML generation that would bypass build-time hardening", () => {
    const manifest = { routes: { "/": { initialRevalidateSeconds: false } }, dynamicRoutes: { "/work/[slug]": { fallback: false } } };
    expect(() => assertStaticPages(manifest, ["/", "/work/[slug]"])).not.toThrow();
    expect(() => assertStaticPages(manifest, ["/new-dynamic-page"])).toThrow(/Dynamic HTML/);
    expect(() => assertStaticPages({ routes: { "/": { initialRevalidateSeconds: 60 } }, dynamicRoutes: {} }, ["/"])).toThrow(/ISR/);
    expect(() => assertStaticPages({ routes: {}, dynamicRoutes: { "/work/[slug]": { fallback: null } } }, ["/work/[slug]"])).toThrow();
  });
  it("allows only the emitted inline script bytes and keeps them unchanged", () => {
    const body = 'self.__next_f.push([1,"hello"]);';
    const input = `<html><head><script>${body}</script></head><body>Hi</body></html>`;
    const output = hardenHtml(input);
    const hash = createHash("sha256").update(body).digest("base64");
    expect(output).toContain(`'sha256-${hash}'`);
    expect(output.indexOf('http-equiv="Content-Security-Policy"')).toBeLessThan(output.indexOf("<script>"));
    expect(output).toContain(`<script>${body}</script>`);
    expect(output).toContain("form-action 'none'");
    expect(output).toContain("script-src-attr 'none'");
    expect(output.match(/script-src ([^;]+)/)?.[1]).not.toContain("'unsafe-inline'");
    expect(output.match(/script-src ([^;]+)/)?.[1]).not.toContain("'unsafe-eval'");
  });

  it("is idempotent and rejects unsupported documents instead of silently shipping unprotected", () => {
    const once = hardenHtml("<html><head></head><body></body></html>");
    expect(hardenHtml(once)).toBe(once);
    expect(() => hardenHtml("<main>fragment</main>")).toThrow();
  });

  it("normalizes browser line endings when hashing and rejects inline handlers", () => {
    const hash = createHash("sha256").update("a();\nb();").digest("base64");
    expect(hardenHtml("<html><head><script>a();\r\nb();</script></head></html>")).toContain(hash);
    expect(() => hardenHtml('<html><head></head><body onload="a()"></body></html>')).toThrow();
  });
});
