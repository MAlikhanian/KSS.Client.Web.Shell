'use client';

import { Fragment } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Building2, Users, Briefcase, PiggyBank } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface CountTileConfig {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  /** Optional fetcher — when omitted the tile renders a placeholder (e.g. funds, no backend yet). */
  endpoint?: string;
}

const TILES: CountTileConfig[] = [
  { key: 'companies', icon: Building2, endpoint: '/api/company/count' },
  { key: 'persons', icon: Users, endpoint: '/api/person/count' },
  { key: 'brokerages', icon: Briefcase, endpoint: '/api/brokerages/count' },
  { key: 'funds', icon: PiggyBank, endpoint: '/api/funds/count' },
];

function useCount(endpoint?: string) {
  return useQuery<number>({
    queryKey: ['entity-count', endpoint ?? 'placeholder'],
    queryFn: async () => {
      if (!endpoint) return 0;
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error('Failed to fetch count');
      const json = await res.json();
      return Number(json?.count ?? 0);
    },
    enabled: !!endpoint,
    staleTime: 60 * 1000,
  });
}

function CountTile({ config }: { config: CountTileConfig }) {
  const { t } = useTranslation();
  const Icon = config.icon;
  const { data, isLoading } = useCount(config.endpoint);

  const display = !config.endpoint ? '—' : isLoading ? '…' : (data ?? 0).toLocaleString();

  return (
    <Card className="h-full transition-colors hover:bg-muted/40">
      <CardContent className="p-0 flex flex-col justify-between gap-6 h-full">
        <div className="flex items-center justify-center mt-4 ms-5 size-9 rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div className="flex flex-col gap-1 pb-4 px-5">
          <span className="text-3xl font-semibold text-mono">{display}</span>
          <span className="text-sm font-normal text-muted-foreground">
            {t(`dashboard.entityCounts.${config.key}`)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export function EntityCounts() {
  return (
    <Fragment>
      {TILES.map((tile) => (
        <CountTile key={tile.key} config={tile} />
      ))}
    </Fragment>
  );
}
