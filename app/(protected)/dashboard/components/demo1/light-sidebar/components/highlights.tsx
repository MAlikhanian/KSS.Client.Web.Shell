'use client';

import { useQuery } from '@tanstack/react-query';
import {
  ArrowDown,
  ArrowUp,
  Building2,
  KeyRound,
  type LucideIcon,
  UserPlus,
  Users,
} from 'lucide-react';
import { Badge, BadgeDot } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface IHighlightsProps {
  /** Retained for API compatibility; the rewritten panel always shows 4 rows. */
  limit?: number;
}

const STALE_MS = 5 * 60 * 1000;

interface AccessGrantPair {
  companyId: string;
  grantedToPersonId: string;
}

function useCompanyCount() {
  return useQuery<number>({
    queryKey: ['highlights-company-count'],
    queryFn: async () => {
      const res = await fetch('/api/company/count');
      if (!res.ok) throw new Error('count');
      const j = await res.json();
      return Number(j?.count ?? 0);
    },
    staleTime: STALE_MS,
  });
}

function useAccessGrants() {
  return useQuery<AccessGrantPair[]>({
    queryKey: ['highlights-access-grants'],
    queryFn: async () => {
      const res = await fetch('/api/access/list-all-grants');
      if (!res.ok) throw new Error('grants');
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    },
    staleTime: STALE_MS,
  });
}

function usePersonToUserMap(personIds: string[] | undefined) {
  return useQuery<Record<string, string>>({
    queryKey: ['highlights-person-user-map', (personIds ?? []).slice().sort().join(',')],
    queryFn: async () => {
      if (!personIds || personIds.length === 0) return {};
      const res = await fetch('/api/auth/map-persons-to-users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personIds }),
      });
      if (!res.ok) throw new Error('map');
      return res.json();
    },
    enabled: personIds !== undefined,
    staleTime: STALE_MS,
  });
}

function useCreatorUserIds() {
  return useQuery<string[]>({
    queryKey: ['highlights-creator-user-ids'],
    queryFn: async () => {
      const res = await fetch('/api/person/creator-user-ids');
      if (!res.ok) throw new Error('creators');
      const j = await res.json();
      return Array.isArray(j?.userIds) ? j.userIds : [];
    },
    staleTime: STALE_MS,
  });
}

interface IHighlightsRow {
  icon: LucideIcon;
  text: string;
  total: number;
  /** Null hides the share% column for this row (e.g. the "all" row where it's always 100%). */
  stats: number | null;
  increase: boolean;
}

interface IHighlightsItem {
  badgeColor: string;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function Highlights(_props: IHighlightsProps = {}) {
  const { t } = useTranslation();

  const companyCount = useCompanyCount();
  const grants = useAccessGrants();

  const distinctPersonIds = grants.data
    ? Array.from(new Set(grants.data.map((g) => g.grantedToPersonId)))
    : undefined;
  const personToUser = usePersonToUserMap(distinctPersonIds);
  const creators = useCreatorUserIds();

  const ready =
    companyCount.isSuccess && grants.isSuccess && personToUser.isSuccess && creators.isSuccess;

  const total = ready ? companyCount.data ?? 0 : 0;
  let withAccess = 0;
  let withCreatedPersons = 0;
  if (ready) {
    // Normalize all GUIDs to lowercase — Auth/Person/Company services don't
    // agree on casing, so case-sensitive Map/Set lookups silently drop matches.
    const mapLower: Record<string, string> = {};
    for (const [k, v] of Object.entries(personToUser.data ?? {})) {
      mapLower[k.toLowerCase()] = String(v).toLowerCase();
    }
    const creatorSet = new Set(
      (creators.data ?? []).map((id) => String(id).toLowerCase()),
    );
    const companiesWithAccess = new Set<string>();
    const companiesWithCreatedPersons = new Set<string>();
    for (const g of grants.data ?? []) {
      const personIdLower = g.grantedToPersonId.toLowerCase();
      const userId = mapLower[personIdLower];
      if (!userId) continue;
      companiesWithAccess.add(g.companyId);
      // Backend bug: Person.CreatedBy actually stores the creator's PersonId
      // (not UserId despite the endpoint name). So we compare against the
      // granted person's own PersonId, not the userId from the auth map.
      if (creatorSet.has(personIdLower)) {
        companiesWithCreatedPersons.add(g.companyId);
      }
    }
    withAccess = companiesWithAccess.size;
    withCreatedPersons = companiesWithCreatedPersons.size;
  }
  const withoutAccess = Math.max(total - withAccess, 0);
  const accessOnly = Math.max(withAccess - withCreatedPersons, 0);

  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);
  const accessRatePct = pct(withAccess);

  const items: IHighlightsItem[] = [
    { badgeColor: 'bg-green-500', label: t('dashboard.highlights.legendWithCreated') },
    { badgeColor: 'bg-violet-500', label: t('dashboard.highlights.legendWithAccessOnly') },
    { badgeColor: 'bg-destructive', label: t('dashboard.highlights.legendWithoutAccess') },
  ];

  const rows: IHighlightsRow[] = [
    {
      icon: Building2,
      text: t('dashboard.highlights.allCompanies'),
      total,
      stats: null,
      increase: true,
    },
    {
      icon: KeyRound,
      text: t('dashboard.highlights.withAccess'),
      total: withAccess,
      stats: Math.round(pct(withAccess) * 10) / 10,
      increase: true,
    },
    {
      icon: UserPlus,
      text: t('dashboard.highlights.withCreatedPersons'),
      total: withCreatedPersons,
      stats: Math.round(pct(withCreatedPersons) * 10) / 10,
      increase: true,
    },
    {
      icon: Users,
      text: t('dashboard.highlights.withoutAccess'),
      total: withoutAccess,
      stats: Math.round(pct(withoutAccess) * 10) / 10,
      increase: false,
    },
  ];

  const renderRow = (row: IHighlightsRow, index: number) => {
    return (
      <div key={index} className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-1.5">
          <row.icon className="size-4.5 text-muted-foreground" />
          <span className="text-sm font-normal text-mono">{row.text}</span>
        </div>
        <div className="flex items-center text-sm font-medium text-foreground gap-6">
          <span className="min-w-14 text-right tabular-nums">
            {row.total.toLocaleString()}
          </span>
          {row.stats === null ? (
            <span className="min-w-16" />
          ) : (
            <span className="min-w-16 flex items-center justify-end gap-1 tabular-nums">
              {row.increase ? (
                <ArrowUp className="text-green-500 size-4" />
              ) : (
                <ArrowDown className="text-destructive size-4" />
              )}
              {row.stats}%
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderItem = (item: IHighlightsItem, index: number) => {
    return (
      <div key={index} className="flex items-center gap-1.5">
        <BadgeDot className={item.badgeColor} />
        <span className="text-sm font-normal text-foreground">{item.label}</span>
      </div>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('dashboard.highlights.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-5 lg:p-7.5 lg:pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-normal text-secondary-foreground">
            {t('dashboard.highlights.totalLabel')}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-semibold text-mono tabular-nums">
              {total.toLocaleString()}
            </span>
            <Badge size="sm" variant="success" appearance="light">
              {Math.round(accessRatePct * 10) / 10}%
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-1.5">
          <div
            className="bg-green-500 h-2 rounded-xs"
            style={{ width: `${pct(withCreatedPersons)}%` }}
          ></div>
          <div
            className="bg-violet-500 h-2 rounded-xs"
            style={{ width: `${pct(accessOnly)}%` }}
          ></div>
          <div
            className="bg-destructive h-2 rounded-xs"
            style={{ width: `${pct(withoutAccess)}%` }}
          ></div>
        </div>
        <div className="flex items-center flex-wrap gap-4 mb-1">
          {items.map((item, index) => renderItem(item, index))}
        </div>
        <div className="border-b border-input"></div>
        <div className="grid gap-3">{rows.map(renderRow)}</div>
      </CardContent>
    </Card>
  );
}

export type { IHighlightsProps };
