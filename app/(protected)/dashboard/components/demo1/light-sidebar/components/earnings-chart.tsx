'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { localizeDigits } from '@/lib/format-utils';
import { dEvenToJalali } from '@/lib/jalali';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface MonthlyPoint {
  /** YYYY-MM */
  ym: string;
  /** Month index 0..11 (calendar month of close) */
  monthIdx: number;
  /** Index value at month close */
  value: number;
}

interface RawDay {
  dEven: number;
  xNivInuClMresIbs?: number;
  XNivInuClMresIbs?: number;
  value?: number;
}

function pickClose(d: RawDay): number | null {
  const v = d.xNivInuClMresIbs ?? d.XNivInuClMresIbs ?? d.value;
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  return null;
}

/** Aggregates daily index history into the last 12 Jalali month-end closes. */
function toMonthly(history: RawDay[]): MonthlyPoint[] {
  if (!Array.isArray(history) || history.length === 0) return [];
  const byMonth = new Map<string, RawDay>();
  for (const d of history) {
    const dEven = Number(d.dEven);
    const jal = dEvenToJalali(dEven);
    if (!jal) continue;
    const [jy, jm] = jal;
    const ym = `${jy.toString().padStart(4, '0')}-${jm.toString().padStart(2, '0')}`;
    const prev = byMonth.get(ym);
    if (!prev || Number(prev.dEven) < dEven) byMonth.set(ym, d);
  }
  const sorted = Array.from(byMonth.entries()).sort(([a], [b]) => (a < b ? -1 : 1));
  const last12 = sorted.slice(-12);
  return last12
    .map(([ym, d]) => {
      const close = pickClose(d);
      if (close === null) return null;
      const jm = Number(ym.slice(5, 7)) - 1; // 0..11 Jalali month index
      return { ym, monthIdx: jm, value: close } as MonthlyPoint;
    })
    .filter((p): p is MonthlyPoint => p !== null);
}

function useTedpixHistory() {
  return useQuery<MonthlyPoint[]>({
    queryKey: ['tsetmc-index-history-12m'],
    queryFn: async () => {
      const res = await fetch('/api/tsetmc/index-history');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const json = await res.json();
      const arr = (json?.indexB2 ?? json?.IndexB2 ?? json) as RawDay[];
      return toMonthly(arr);
    },
    staleTime: 6 * 60 * 60 * 1000,
  });
}

const EarningsChart = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { data: points, isLoading, isError } = useTedpixHistory();

  const monthNames = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) =>
        t(`dashboard.earningsChart.month${i + 1}`),
      ),
    [t],
  );

  const series = (points ?? []).map((p) => p.value);
  const categories = (points ?? []).map((p) => monthNames[p.monthIdx] ?? '');

  const options: ApexOptions = {
    series: [
      {
        name: t('dashboard.earningsChart.monthClose'),
        data: series,
      },
    ],
    chart: {
      height: 250,
      type: 'area',
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: ['var(--color-primary)'],
    },
    xaxis: {
      categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: { color: 'var(--color-primary)', width: 1, dashArray: 3 },
      },
      tooltip: { enabled: false },
    },
    yaxis: {
      axisTicks: { show: false },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
        formatter: (defaultValue) => {
          const n = Number(defaultValue);
          if (!Number.isFinite(n)) return String(defaultValue);
          const m = n / 1_000_000;
          return localizeDigits(
            `${m.toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: 2 })}M`,
            locale,
          );
        },
      },
    },
    tooltip: {
      enabled: true,
      custom({ series: s, seriesIndex, dataPointIndex }) {
        const number = Number(s[seriesIndex][dataPointIndex]);
        const monthName = categories[dataPointIndex] ?? '';
        const formatted = localizeDigits(
          number.toLocaleString('en-US', { maximumFractionDigits: 0 }),
          locale,
        );
        return `
          <div class="flex flex-col gap-2 p-3.5">
            <div class="font-medium text-sm text-secondary-foreground">${monthName}</div>
            <div class="font-semibold text-base text-mono tabular-nums">${formatted}</div>
          </div>
        `;
      },
    },
    markers: {
      size: 0,
      colors: 'var(--color-white)',
      strokeColors: 'var(--color-primary)',
      strokeWidth: 4,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      shape: 'circle',
      offsetX: 0,
      offsetY: 0,
      onClick: undefined,
      onDblClick: undefined,
      showNullDataPoints: true,
      hover: { size: 8, sizeOffset: 0 },
    },
    fill: { gradient: { opacityFrom: 0.25, opacityTo: 0 } },
    grid: {
      borderColor: 'var(--color-border)',
      strokeDashArray: 5,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{t('dashboard.earningsChart.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-end items-stretch grow px-3 py-1">
        {isLoading && (
          <div className="h-[250px] flex items-center justify-center text-sm text-muted-foreground">
            {t('dashboard.entryCallout.loading')}
          </div>
        )}
        {!isLoading && (isError || series.length === 0) && (
          <div className="h-[250px] flex items-center justify-center text-sm text-muted-foreground">
            {t('dashboard.marketTable.noData')}
          </div>
        )}
        {!isLoading && !isError && series.length > 0 && (
          <ApexChart
            id="earnings_chart"
            options={options}
            series={options.series}
            type="area"
            max-width="694"
            height="250"
          />
        )}
      </CardContent>
    </Card>
  );
};

export { EarningsChart };
