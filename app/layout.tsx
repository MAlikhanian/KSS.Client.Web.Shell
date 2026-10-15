import { ReactNode, Suspense } from 'react';
import { headers } from 'next/headers';
import { cn } from '@/lib/utils';
import { SettingsProvider } from '@/providers/settings-provider';
import { TooltipsProvider } from '@/providers/tooltips-provider';
import { Toaster } from '@/components/ui/sonner';
import { Metadata } from 'next';
import { AuthProvider } from '@/providers/auth-provider';
import { I18nProvider } from '@/providers/i18n-provider';
import { ModulesProvider } from '@/providers/modules-provider';
import { QueryProvider } from '@/providers/query-provider';
import { TenantProvider } from '@/providers/tenant-provider';
import { ThemeProvider } from '@/providers/theme-provider';
import { ZonesProvider } from '@/providers/zones-provider';
import { resolveTenant, tenantAssets } from '@/lib/tenants';

import '@/css/fonts.css';
import '@/css/styles.css';
import '@/components/keenicons/assets/styles.css';

/**
 * The hostname this request arrived on. HOST ONLY, deliberately.
 *
 * Not x-forwarded-host: this cluster's ingress is HAProxy, which passes a
 * client-supplied X-Forwarded-Host through untouched rather than overwriting it
 * from the real Host — verified against production, where a forged header
 * changed which tenant was resolved. Host is what the ingress routes on, so a
 * forged Host cannot reach this backend; it 404s.
 *
 * This is not only about which logo renders. The resolved tenant also carries
 * companyId, which decides the x-company-id cookie — so a forgeable source here
 * would let a visitor scope themselves to another tenant's company.
 */
async function requestHost(): Promise<string | null> {
  const headerList = await headers();
  return headerList.get('host');
}

/**
 * Per-tenant tab icon and title. This is a server function in the Node runtime,
 * so process.env (TENANTS) and the request headers are both available — the
 * reason branding can be a config change rather than a rebuild.
 */
export async function generateMetadata(): Promise<Metadata> {
  const assets = tenantAssets(resolveTenant(await requestHost()));
  const name = assets.name ?? 'SEBA';

  return {
    title: {
      template: `%s | ${name}`,
      default: name, // a default is required when creating a template
    },
    icons: { icon: assets.favicon },
  };
}

/**
 * Which first path segments are served by a separate zone app right now.
 *
 * Read from ZONES at RENDER time, not build time, and handed to ZoneLink so the
 * Shell knows which menu entries leave this app. A cross-app link must be a
 * plain <a>: next/link would do a client-side navigation and hand this app's
 * webpack runtime another build's chunk names (ChunkLoadError).
 *
 * Same source the middleware routes on, so the two cannot disagree.
 */
function zoneSlugs(): string[] {
  try {
    return Object.keys(JSON.parse(process.env.ZONES ?? '{}'));
  } catch {
    // A malformed ZONES already degrades the middleware to "serve locally";
    // match that here rather than take the layout down.
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Resolved once per request, here, and handed to every branded surface
  // through context. Components must not re-read TENANTS themselves.
  const assets = tenantAssets(resolveTenant(await requestHost()));

  return (
    <html className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          'antialiased flex h-full text-base text-foreground bg-background font-vazirmatn',
        )}
      >
        <QueryProvider>
          <AuthProvider>
            <SettingsProvider>
              <ThemeProvider>
                <I18nProvider>
                  <TooltipsProvider>
                    <ModulesProvider>
                      <TenantProvider assets={assets}>
                        <ZonesProvider slugs={zoneSlugs()}>
                          <Suspense>{children}</Suspense>
                          <Toaster />
                        </ZonesProvider>
                      </TenantProvider>
                    </ModulesProvider>
                  </TooltipsProvider>
                </I18nProvider>
              </ThemeProvider>
            </SettingsProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
