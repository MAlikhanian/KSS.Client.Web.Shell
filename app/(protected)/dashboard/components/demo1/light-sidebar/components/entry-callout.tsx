'use client';

import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, ExternalLink, TrendingUp } from 'lucide-react';
import { localizeDigits } from '@/lib/format-utils';
import { dEvenToJalali } from '@/lib/jalali';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface IEntryCalloutProps {
  className: string;
}

interface TedpixSummary {
  value: number | null;
  changePct: number | null;
  asOf: number | null;
}

interface RawDay {
  dEven: number;
  xNivInuClMresIbs?: number;
  XNivInuClMresIbs?: number;
}

function pickClose(d: RawDay): number | null {
  const v = d.xNivInuClMresIbs ?? d.XNivInuClMresIbs;
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

/**
 * tsetmc's B2History freezes the most-recent close at the last real value for
 * many days at a time. Walking back to the first differing pair gives the
 * actual last meaningful change instead of a permanent 0%.
 */
function findLastChangedPair(
  sorted: RawDay[],
): { latest: RawDay; prev: RawDay } | null {
  for (let i = 0; i < sorted.length - 1; i++) {
    const a = pickClose(sorted[i]);
    const b = pickClose(sorted[i + 1]);
    if (a !== null && b !== null && a !== b) {
      return { latest: sorted[i], prev: sorted[i + 1] };
    }
  }
  return null;
}

function useTedpixSummary() {
  return useQuery<TedpixSummary>({
    queryKey: ['tsetmc-tedpix-summary-from-history'],
    queryFn: async () => {
      const res = await fetch('/api/tsetmc/index-history?ins=32097828799138957');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const json = await res.json();
      const arr = (json?.indexB2 ?? json?.IndexB2 ?? []) as RawDay[];
      if (!Array.isArray(arr) || arr.length === 0) {
        return { value: null, changePct: null, asOf: null };
      }
      const sorted = [...arr].sort((a, b) => Number(b.dEven) - Number(a.dEven));
      const pair = findLastChangedPair(sorted);
      const latest = pair ? pair.latest : sorted[0];
      const prev = pair ? pair.prev : null;
      const value = pickClose(latest);
      const prevValue = prev ? pickClose(prev) : null;
      const changePct =
        value !== null && prevValue !== null && prevValue !== 0
          ? ((value - prevValue) / prevValue) * 100
          : null;
      return { value, changePct, asOf: Number(latest.dEven) || null };
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  });
}

function formatJalaliDate(dEven: number | null, locale: string): string {
  if (!dEven) return '';
  const jal = dEvenToJalali(dEven);
  if (!jal) return '';
  const [jy, jm, jd] = jal;
  const s = `${jy}/${jm.toString().padStart(2, '0')}/${jd.toString().padStart(2, '0')}`;
  return localizeDigits(s, locale);
}

const EntryCallout = ({ className }: IEntryCalloutProps) => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { data, isLoading, isError } = useTedpixSummary();

  const value = data?.value ?? null;
  const changePct = data?.changePct ?? null;
  const isUp = (changePct ?? 0) >= 0;

  const fmtValue =
    value !== null
      ? localizeDigits(
          value.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          locale,
        )
      : '—';
  const fmtPct =
    changePct !== null
      ? localizeDigits(
          `${isUp ? '+' : ''}${(Math.round(changePct * 100) / 100).toFixed(2)}%`,
          locale,
        )
      : '';
  const fmtDate = formatJalaliDate(data?.asOf ?? null, locale);

  return (
    <Fragment>
      <Card className={`relative h-full overflow-hidden ${className}`}>
        {/* Decorative chart background — stylized line + filled area */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 180"
          preserveAspectRatio="none"
          className="absolute inset-y-0 end-0 h-full w-2/3 pointer-events-none text-green-500/15 dark:text-green-400/10 rtl:[transform:scaleX(-1)]"
        >
          <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Grid lines */}
          <g stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 5" opacity="0.5">
            <line x1="0" y1="45" x2="400" y2="45" />
            <line x1="0" y1="90" x2="400" y2="90" />
            <line x1="0" y1="135" x2="400" y2="135" />
          </g>
          {/* Filled area under line */}
          <path
            d="M 0 140 C 30 130, 50 115, 80 110 S 130 95, 160 80 S 220 50, 260 45 S 330 30, 400 20 L 400 180 L 0 180 Z"
            fill="url(#chartGrad)"
          />
          {/* Chart line */}
          <path
            d="M 0 140 C 30 130, 50 115, 80 110 S 130 95, 160 80 S 220 50, 260 45 S 330 30, 400 20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.7"
          />
          {/* Data points */}
          <g fill="currentColor">
            <circle cx="80" cy="110" r="3" />
            <circle cx="160" cy="80" r="3" />
            <circle cx="260" cy="45" r="3" />
            <circle cx="360" cy="22" r="3" />
          </g>
        </svg>

        <CardContent className="relative p-10">
          <div className="flex flex-col justify-center gap-4">
            <div
              className={`flex items-center justify-center size-12 rounded-full ${
                isUp
                  ? 'bg-green-100 text-green-600 dark:bg-green-950/40 dark:text-green-400'
                  : 'bg-destructive/10 text-destructive'
              }`}
            >
              <TrendingUp className="size-6" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-3xl font-semibold text-mono tabular-nums">
                  {isLoading ? t('dashboard.entryCallout.loading') : isError ? '—' : fmtValue}
                </h2>
                {changePct !== null && (
                  <Badge
                    size="sm"
                    variant={isUp ? 'success' : 'destructive'}
                    appearance="light"
                    className="tabular-nums"
                  >
                    {isUp ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />}
                    {fmtPct}
                  </Badge>
                )}
              </div>
              <span className="text-base font-medium text-mono">
                {t('dashboard.entryCallout.tedpixSubtitle')}
              </span>
            </div>
            <p className="text-sm font-normal text-secondary-foreground leading-5.5">
              {fmtDate
                ? `${t('dashboard.entryCallout.lastUpdate')}: ${fmtDate}`
                : t('dashboard.entryCallout.marketClosed')}
            </p>
          </div>
        </CardContent>
        <CardFooter className="relative justify-center">
          <Button mode="link" underlined="dashed" asChild>
            <a href="https://www.tsetmc.com/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4" />
              {t('dashboard.entryCallout.viewOnTsetmc')}
            </a>
          </Button>
        </CardFooter>
      </Card>
    </Fragment>
  );
};

export { EntryCallout, type IEntryCalloutProps };
