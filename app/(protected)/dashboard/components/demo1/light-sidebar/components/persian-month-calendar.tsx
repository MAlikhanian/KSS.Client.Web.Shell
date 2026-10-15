'use client';

import { dEvenToJalali } from '@/lib/jalali';
import { localizeDigits } from '@/lib/format-utils';
import { useTranslation } from '@/hooks/useTranslation';

/** Compact single-letter weekday headers in Persian week order (Sat → Fri). */
const WEEKDAYS_FA = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

/** Fixed-date Jalali national holidays as [month, day] pairs. */
const NATIONAL_HOLIDAYS: ReadonlyArray<readonly [number, number]> = [
  [1, 1], // نوروز
  [1, 2], // نوروز
  [1, 3], // نوروز
  [1, 4], // نوروز
  [1, 12], // روز جمهوری اسلامی
  [1, 13], // سیزده‌بدر
  [3, 14], // رحلت امام خمینی
  [3, 15], // قیام ۱۵ خرداد
  [11, 22], // پیروزی انقلاب اسلامی
  [12, 29], // ملی‌شدن صنعت نفت
];

interface MonthData {
  jy: number;
  jm: number;
  today: number;
  daysInMonth: number;
  /** 0..6 where 0 = Saturday (start of Persian week). */
  firstWeekday: number;
}

/**
 * Computes the current Jalali month entirely from today's Gregorian date by
 * iterating forward day-by-day until the Jalali month changes. This avoids
 * needing a separate jalaliToGregorian / isJalaliLeap helper and naturally
 * handles 29/30/31-day months including leap-year Esfand.
 */
function buildCurrentJalaliMonth(): MonthData | null {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const toDEven = (d: Date) =>
    d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();

  const jal = dEvenToJalali(toDEven(today));
  if (!jal) return null;
  const [jy, jm, jd] = jal;

  // Gregorian date of the 1st of the current Jalali month.
  const firstDate = new Date(today);
  firstDate.setDate(firstDate.getDate() - (jd - 1));

  // Count days by walking forward from the 1st until the Jalali month changes.
  let daysInMonth = 31;
  for (let offset = 1; offset <= 32; offset++) {
    const probe = new Date(firstDate);
    probe.setDate(probe.getDate() + offset);
    const probeJal = dEvenToJalali(toDEven(probe));
    if (!probeJal || probeJal[1] !== jm) {
      daysInMonth = offset;
      break;
    }
  }

  // JS weekday: 0=Sun..6=Sat. Persian week: 0=Sat..6=Fri.
  const jsWeekday = firstDate.getDay();
  const firstWeekday = (jsWeekday + 1) % 7;

  return { jy, jm, today: jd, daysInMonth, firstWeekday };
}

function isNationalHoliday(jm: number, day: number): boolean {
  return NATIONAL_HOLIDAYS.some(([m, d]) => m === jm && d === day);
}

export function PersianMonthCalendar() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const data = buildCurrentJalaliMonth();

  if (!data) return null;

  const { jy, jm, today, daysInMonth, firstWeekday } = data;
  const monthName = t(`dashboard.earningsChart.month${jm}`);

  // Build cells: leading blanks for offset, then 1..daysInMonth, pad to full row.
  const cells: Array<number | null> = [];
  for (let i = 0; i < firstWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="w-[280px] p-3">
      <div className="mb-2 text-center text-sm font-semibold text-mono">
        {monthName} {localizeDigits(String(jy), locale)}
      </div>
      <div className="mb-1 grid grid-cols-7 gap-1 text-xs font-medium text-secondary-foreground">
        {WEEKDAYS_FA.map((w, i) => (
          <div
            key={i}
            className={`text-center ${i === 6 ? 'text-red-600 dark:text-red-400' : ''}`}
          >
            {w}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={i} className="h-7" />;
          }
          const isToday = day === today;
          // Column index of this day cell (0=Sat … 6=Fri).
          const col = (firstWeekday + day - 1) % 7;
          const isFriday = col === 6;
          const isHoliday = isFriday || isNationalHoliday(jm, day);

          const cellClass = isToday
            ? 'bg-primary font-semibold text-primary-foreground'
            : isHoliday
              ? 'text-red-600 dark:text-red-400'
              : 'text-foreground';

          return (
            <div
              key={i}
              className={`flex h-7 items-center justify-center rounded text-xs tabular-nums ${cellClass}`}
            >
              {localizeDigits(String(day), locale)}
            </div>
          );
        })}
      </div>
    </div>
  );
}
