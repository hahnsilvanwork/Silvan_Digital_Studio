/**
 * Where this deployment actually lives.
 *
 * Spec 9 asks for one validated environment value and forbids publishing an
 * invented production domain from a local or temporary build. So a canonical
 * origin exists only once `NEXT_PUBLIC_SITE_URL` is set to a real https domain.
 * Everything else falls back to the address the deployment genuinely answers
 * on, which is honest for absolute asset links but is never treated as
 * canonical and is never offered to crawlers.
 */

const LOCAL_ORIGIN = "http://localhost:3000";

export interface SiteOrigin {
  readonly base: URL;
  /** True only when a real domain was configured for this deployment. */
  readonly isCanonical: boolean;
}

function firstConfigured(
  ...values: readonly (string | undefined)[]
): string | undefined {
  return values.find((value) => value !== undefined && value.trim() !== "");
}

function parseHttpsUrl(value: string | undefined): URL | null {
  if (value === undefined || value.trim() === "") {
    return null;
  }

  try {
    const url = new URL(value.trim());

    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

export function getSiteOrigin(): SiteOrigin {
  const configured = parseHttpsUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (configured !== null) {
    return { base: configured, isCanonical: true };
  }

  // A Vercel deployment URL is the address this build really answers on, not a
  // guess at a future domain, so it is safe for absolute links -- but it stays
  // non-canonical so a preview can never compete with the real domain later.
  // Blank counts as absent: `??` only falls through on undefined, so an empty
  // VERCEL_PROJECT_PRODUCTION_URL would otherwise shadow a perfectly good
  // VERCEL_URL and drop the whole build back to localhost.
  const deployment = firstConfigured(
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  );
  const deploymentUrl = parseHttpsUrl(
    deployment === undefined ? undefined : `https://${deployment}`,
  );

  if (deploymentUrl !== null) {
    return { base: deploymentUrl, isCanonical: false };
  }

  return { base: new URL(LOCAL_ORIGIN), isCanonical: false };
}

export function absoluteUrl(path: string): string {
  return new URL(path, getSiteOrigin().base).toString();
}
