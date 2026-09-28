'use client';

import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTenant } from '@/providers/tenant-provider';

/**
 * Escapes a path before it is interpolated into a CSS url(). TENANTS is operator
 * supplied configuration rather than user input, but a stray quote would still
 * break the stylesheet, so the characters that could terminate the url() are
 * removed rather than trusted.
 *
 * The path is used as-is: tenant assets are root-relative on purpose, so they
 * are always fetched from the host the visitor is on. See lib/tenants.ts.
 */
function cssUrl(path: string): string {
  return path.replace(/['"()\\\s]/g, '');
}

export function BrandedLayout({ children }: { children: ReactNode }) {
  // Resolved from the request hostname once, in app/layout.tsx. A host with no
  // tenant entry yields the stock artwork, so an unknown or misconfigured
  // hostname still renders a working sign-in page.
  const tenant = useTenant();

  return (
    <>
      <style>
        {`
          .branded-bg {
            background-image: url('${cssUrl(tenant.banner)}');
          }
          .dark .branded-bg {
            background-image: url('${cssUrl(tenant.bannerDark)}');
          }
        `}
      </style>
      <div className="grid lg:grid-cols-2 grow">
        <div className="flex justify-center items-center p-8 lg:p-10 order-2 lg:order-1">
          <Card className="w-full max-w-[400px]">
            <CardContent className="p-6">{children}</CardContent>
          </Card>
        </div>

        {/* bg-cover at every breakpoint: it used to apply only from xl up, which
            left the artwork at its natural size with empty space beneath it on
            anything smaller. */}
        <div className="lg:rounded-xl lg:border lg:border-border lg:m-5 order-1 lg:order-2 min-h-[220px] lg:min-h-0 bg-center bg-cover bg-no-repeat branded-bg">
          <div className="flex flex-col p-8 lg:p-16 gap-4">
            {/* The banner is always a saturated colour, so the light-on-dark
                wordmark is the correct variant here, not the sidebar one. */}
            {tenant.branded && (
              <img
                src={tenant.logoDark}
                className="h-[28px] max-w-none self-start"
                alt={tenant.name ?? ''}
              />
            )}

            {tenant.branded && tenant.tagline && (
              // Per-deployment data from TENANTS, not translatable UI copy.
              <div className="text-base font-medium text-white/80 drop-shadow">
                {tenant.tagline}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
