'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const Seats = () => {
  const { t } = useTranslation('account-members');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountMembersTeamInfo.seats.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        <h4 className="text-base font-medium text-mono">14/49 {t('accountMembersTeamInfo.seats.seats')}</h4>
        <p className="text-sm text-foreground">
          {t('accountMembersTeamInfo.seats.description')}
        </p>
        <div>
          <Button mode="link" underlined="dashed" asChild>
            <Link href="#">{t('accountMembersTeamInfo.seats.learnMore')}</Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline">
          <Link href="#">{t('accountMembersTeamInfo.seats.addSeats')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { Seats };
