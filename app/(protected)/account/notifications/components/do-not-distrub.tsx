'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface IDoNotDistrubProps {
  title?: string;
  icon?: ReactNode;
  text?: string;
}

const DoNotDistrub = ({ title, icon, text }: IDoNotDistrubProps) => {
  const { t } = useTranslation('account-notifications');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || t('accountNotifications.doNotDisturb.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2.5">
        <p className="text-sm text-secondary-foreground">
          {t('accountNotifications.doNotDisturb.description')}
        </p>
        <div>
          <Button mode="link" underlined="dashed">
            <Link href="#">{t('accountNotifications.doNotDisturb.learnMore')}</Link>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline">
          <Link href="#" className="flex items-center gap-1.5">
            <div>{icon || <Bell size={16} />}</div>
            {text || t('accountNotifications.doNotDisturb.pauseNotifications')}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { DoNotDistrub, type IDoNotDistrubProps };
