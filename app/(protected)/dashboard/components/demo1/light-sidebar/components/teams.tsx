'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  Bitcoin,
  Coins,
  Droplet,
  type LucideIcon,
} from 'lucide-react';
import { localizeDigits } from '@/lib/format-utils';
import {
  Card,
  CardHeader,
  CardTable,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/useTranslation';

interface MarketRow {
  id: string;
  symbol: string;
  description: string;
  price: number | null;
  changePct: number | null;
  time: string | null;
  icon: LucideIcon;
  /** When true, the raw tgju price is divided by 10 (ریال → تومان). */
  toToman: boolean;
}

interface RawTgjuItem {
  p?: string;
  dp?: number | string;
  /** Jalali date string from proxy, e.g. "1405/02/28". */
  t?: string;
}

function parseTgjuPrice(p: string | undefined): number | null {
  if (!p) return null;
  const cleaned = String(p).replace(/,/g, '').trim();
  if (!cleaned) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** tgju's Jalali "YYYY/MM/DD" → locale-digit YYYY/MM/DD. */
function formatJalaliFull(s: string | null | undefined, locale: string): string | null {
  if (!s) return null;
  const parts = String(s).split('/');
  if (parts.length !== 3) return null;
  const [yy, mm, dd] = parts;
  if (!yy || !mm || !dd) return null;
  return localizeDigits(
    `${yy}/${mm.padStart(2, '0')}/${dd.padStart(2, '0')}`,
    locale,
  );
}

/** Display order + presentation metadata for the 6 tgju assets. */
const ASSETS: Array<{
  key: string;
  id: string;
  symbol: string;
  description: string;
  icon: LucideIcon;
  toToman: boolean;
}> = [
  { key: 'price_dollar_rl', id: 'tgju-usd', symbol: 'دلار', description: 'USD', icon: Banknote, toToman: true },
  { key: 'price_eur', id: 'tgju-eur', symbol: 'یورو', description: 'EUR', icon: Banknote, toToman: true },
  { key: 'crypto-bitcoin', id: 'tgju-btc', symbol: 'بیت‌کوین', description: 'BTC ($)', icon: Bitcoin, toToman: false },
  { key: 'geram18', id: 'tgju-gold', symbol: 'طلا ۱۸ عیار', description: 'Gold 18K', icon: Coins, toToman: true },
  { key: 'sekee', id: 'tgju-sekkeh', symbol: 'سکه امامی', description: 'Gold Coin', icon: Coins, toToman: true },
  { key: 'oil_brent', id: 'tgju-oil', symbol: 'نفت برنت', description: 'Brent Oil ($)', icon: Droplet, toToman: false },
];

function useMarketRows(locale: string) {
  return useQuery<MarketRow[]>({
    queryKey: ['tgju-market-rows'],
    queryFn: async () => {
      const res = await fetch('/api/tgju/summary');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const json = await res.json();
      const current = (json?.current ?? {}) as Record<string, RawTgjuItem>;
      const rows: MarketRow[] = [];
      for (const a of ASSETS) {
        const raw = current[a.key];
        if (!raw) continue;
        const rawPrice = parseTgjuPrice(raw.p);
        const price =
          rawPrice === null ? null : a.toToman ? rawPrice / 10 : rawPrice;
        const changePct =
          typeof raw.dp === 'number' ? raw.dp : Number(raw.dp ?? NaN);
        rows.push({
          id: a.id,
          symbol: a.symbol,
          description: a.description,
          price,
          changePct: Number.isFinite(changePct) ? changePct : null,
          time: formatJalaliFull(raw.t, locale),
          icon: a.icon,
          toToman: a.toToman,
        });
      }
      return rows;
    },
    staleTime: 5 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
    retry: 0,
  });
}

function rowTintClass(pct: number | null): string {
  if (pct === null || !Number.isFinite(pct) || pct === 0) return '';
  return pct > 0
    ? 'bg-green-100/30 dark:bg-green-950/20'
    : 'bg-red-100/30 dark:bg-red-950/20';
}

const Teams = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;

  const market = useMarketRows(locale);
  const rows = market.data ?? [];
  const isLoading = market.isLoading;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-3.5">
        <CardTitle>{t('dashboard.marketTable.title')}</CardTitle>
      </CardHeader>
      <CardTable className="flex-1 min-h-0">
        <ScrollArea className="h-full">
          <table dir={i18n.dir()} className="w-full text-sm">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-border text-secondary-foreground">
                <th className="text-start font-normal py-2.5 px-3">
                  {t('dashboard.marketTable.asset')}
                </th>
                <th className="text-start font-normal py-2.5 px-3">
                  {t('dashboard.marketTable.lastPrice')}
                </th>
                <th className="text-start font-normal py-2.5 px-3">
                  {t('dashboard.marketTable.change')}
                </th>
                <th className="text-start font-normal py-2.5 px-3">
                  {t('dashboard.marketTable.lastUpdate')}
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading &&
                Array.from({ length: ASSETS.length }).map((_, i) => (
                  <tr key={`sk-${i}`} className="border-b border-border">
                    <td className="py-2 px-3">
                      <Skeleton className="h-5 w-[120px]" />
                    </td>
                    <td className="py-2 px-3">
                      <Skeleton className="h-5 w-[70px]" />
                    </td>
                    <td className="py-2 px-3">
                      <Skeleton className="h-5 w-[60px]" />
                    </td>
                    <td className="py-2 px-3">
                      <Skeleton className="h-5 w-[80px]" />
                    </td>
                  </tr>
                ))}
              {!isLoading && rows.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-6 px-3 text-center text-sm text-muted-foreground"
                  >
                    {t('dashboard.marketTable.noData')}
                  </td>
                </tr>
              )}
              {rows.map((m) => {
                const Icon = m.icon;
                const pct = m.changePct;
                const tint = rowTintClass(pct);
                const isUp = pct !== null && Number.isFinite(pct) && pct >= 0;
                const pctColor =
                  pct === null || !Number.isFinite(pct)
                    ? 'text-secondary-foreground'
                    : isUp
                      ? 'text-green-600'
                      : 'text-destructive';
                return (
                  <tr
                    key={m.id}
                    className={`border-b border-border last:border-b-0 transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${tint}`}
                  >
                    <td className="py-2 px-3">
                      <div className="flex items-center gap-2.5">
                        <Icon className="size-5 text-muted-foreground" />
                        <div className="flex flex-col gap-0.5">
                          <span className="leading-none font-medium text-sm text-mono">
                            {m.symbol}
                          </span>
                          {m.description && (
                            <span className="text-xs text-secondary-foreground font-normal leading-3">
                              {m.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-2 px-3">
                      {m.price === null ? (
                        '—'
                      ) : (
                        <span className="tabular-nums font-medium text-mono">
                          {localizeDigits(
                            m.price.toLocaleString('en-US', {
                              maximumFractionDigits: m.toToman ? 0 : 2,
                            }),
                            locale,
                          )}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3">
                      {pct === null || !Number.isFinite(pct) ? (
                        '—'
                      ) : (
                        <span
                          className={`inline-flex items-center gap-1 tabular-nums ${pctColor}`}
                        >
                          {isUp ? (
                            <ArrowUp className="size-3.5" />
                          ) : (
                            <ArrowDown className="size-3.5" />
                          )}
                          {localizeDigits(
                            `${(Math.round(pct * 100) / 100).toFixed(2)}%`,
                            locale,
                          )}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-secondary-foreground tabular-nums">
                      {m.time ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </CardTable>
    </Card>
  );
};

export { Teams };
