'use client';

import { Fragment } from 'react';
import { CalendarDays } from 'lucide-react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Container } from '@/components/common/container';
import { Demo1LightSidebarContent, PersianMonthCalendar } from './';
import { useTranslation } from '@/hooks/useTranslation';
import { dEvenToJalali } from '@/lib/jalali';
import { localizeDigits } from '@/lib/format-utils';

const PERSIAN_MONTHS = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

function formatTodayJalali(locale: string): string {
  const today = new Date();
  const dEven =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const jal = dEvenToJalali(dEven);
  if (!jal) return '';
  const [jy, jm, jd] = jal;
  return localizeDigits(`${jd} ${PERSIAN_MONTHS[jm - 1]} ${jy}`, locale);
}

export function Demo1LightSidebarPage() {
  const { t, i18n } = useTranslation();
  const todayLabel = formatTodayJalali(i18n.language);

  return (
    <Fragment>
      <Container>
        <Toolbar>
          <ToolbarHeading
            title={t('dashboard.title')}
            description={t('dashboard.description')}
          />
          <ToolbarActions>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <CalendarDays size={16} className="me-0.5" />
                  {todayLabel}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <PersianMonthCalendar />
              </PopoverContent>
            </Popover>
          </ToolbarActions>
        </Toolbar>
      </Container>
      <Container>
        <Demo1LightSidebarContent />
      </Container>
    </Fragment>
  );
}
