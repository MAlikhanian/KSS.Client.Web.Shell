import { NextRequest, NextResponse } from 'next/server';

/**
 * Zone router.
 *
 * Each domain frontend is a separate Next app deployed on its own. This maps a
 * first path segment onto the app that owns it and rewrites the request there,
 * server-side — so the browser only ever sees one origin and one URL, and the
 * session cookie and localStorage are shared with no cross-origin work.
 *
 * ZONES is read from the environment, NOT from source. That is the point:
 * adding a domain, or giving one tenant a feature another has not bought, is a
 * config change and rebuilds nothing.
 *
 *   ZONES={"mpf":"http://localhost:3150"}
 *   ZONES={"mpf":"https://mpf.kss.ir","person":"https://person.kss.ir"}
 *
 * An empty ZONES ({}) means the Shell serves every route itself — its own copy
 * of each domain is still present. That is the rollback: remove a key and the
 * Shell takes the domain back with no rebuild and no revert commit.
 *
 * Note rewrites() in next.config.mjs would NOT work here: it is evaluated at
 * build time and baked into routes-manifest.json, so adding a zone would mean
 * rebuilding the Shell. Middleware runs per request, which is what keeps the
 * routing table dynamic.
 */

function loadZones(): Record<string, string> {
  try {
    return JSON.parse(process.env.ZONES ?? '{}');
  } catch {
    // A malformed ZONES must not take the Shell down — degrade to "serve
    // everything locally", which is the pre-split behaviour.
    console.error('[middleware] ZONES is not valid JSON — serving all routes locally');
    return {};
  }
}

const ZONES = loadZones();

export function middleware(req: NextRequest) {
  const segment = req.nextUrl.pathname.split('/')[1];
  if (!segment) return NextResponse.next();

  const origin = ZONES[segment];
  if (!origin) return NextResponse.next();

  const target = new URL(req.nextUrl.pathname + req.nextUrl.search, origin);

  // ── x-kss-host: which tenant hostname this request arrived on ──────────────
  // A zone is a separate Next app. It cannot see the browser's Host (this
  // rewrite replaces it with the cluster Service DNS), so the Shell hands the
  // tenant host down explicitly and the zone resolves TENANTS against it.
  //
  // THIS IS A SECURITY BOUNDARY, NOT BRANDING. The resolved tenant carries
  // companyId, which decides the x-company-id cookie — so a forgeable source
  // here would let a visitor scope themselves to another tenant's company.
  // Three rules, all load-bearing:
  //
  //  1. SET, never merge. `.set()` overwrites any inbound x-kss-host, so a
  //     client that sends its own has it destroyed here. Filling it in only
  //     when absent would hand the client the value.
  //
  //  2. The source is Host and ONLY Host. Not x-forwarded-host: this cluster's
  //     ingress is HAProxy, which passes a client-supplied X-Forwarded-Host
  //     through untouched — measured on production 2026-08-29, where a forged
  //     one selected a different tenant. Host is what the ingress routes on, so
  //     a forged Host never reaches this backend; it 404s.
  //
  //  3. Downstream reads x-kss-host and nothing else. No fallback to
  //     x-forwarded-host, none to any header a client can send.
  //
  // Why trusting this header inside a zone is safe: a zone is reachable ONLY
  // through the Shell. Verified across all twelve zone manifests — every one has
  // a NetworkPolicy admitting ingress solely from namespaceSelector
  // name=kss-client-web, and not one defines an Ingress object. If a zone is
  // ever given its own Ingress, this guarantee dies and x-kss-host becomes
  // client-settable.
  const headers = new Headers(req.headers);
  headers.set('x-kss-host', req.headers.get('host') ?? '');

  return NextResponse.rewrite(target, { request: { headers } });
}

export const config = {
  // Leave the Shell's own framework assets and auth endpoints alone. Domain
  // apps serve their assets under their own basePath (/mpf/_next/*), so those
  // still match a zone segment and are forwarded correctly.
  matcher: ['/((?!_next/static|_next/image|api/auth|favicon.ico).*)'],
};
