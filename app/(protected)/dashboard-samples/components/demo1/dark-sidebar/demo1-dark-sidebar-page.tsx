import { Fragment, useEffect, useState } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { addDays, format } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Container } from '@/components/common/container';
import { Demo1LightSidebarContent } from '../light-sidebar';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettings } from '@/providers/settings-provider';

const Demo1DarkSidebarPage = () => {
  const { t } = useTranslation();
  const { storeOption } = useSettings();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2025, 0, 20),
    to: addDays(new Date(2025, 0, 20), 20),
  });

  // Persist dark sidebar theme setting
  useEffect(() => {
    storeOption('layouts.demo1.sidebarTheme', 'dark');
  }, [storeOption]);

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
                <Button id="date" variant="outline" size="sm">
                  <CalendarDays size={16} className="me-0.5" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, 'LLL dd, y')} -{' '}
                        {format(date.to, 'LLL dd, y')}
                      </>
                    ) : (
                      format(date.from, 'LLL dd, y')
                    )
                  ) : (
                    <span>{t('dashboard.datePicker.pickDateRange')}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
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
};

export { Demo1DarkSidebarPage };
