'use client';

import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

const DisableDefaultBrand = () => {
  const { t } = useTranslation('account-appearance');
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-1.5">
          <CardTitle>{t('accountAppearance.disableBranding.title')}</CardTitle>
          <Badge size="sm" variant="primary" appearance="light">
            {t('accountAppearance.disableBranding.pro')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <p className="text-sm text-secondary-foreground">
            {t('accountAppearance.disableBranding.description')}
          </p>
          <div>
            <Button mode="link" underlined="dashed">
              <Link href="#">{t('accountAppearance.disableBranding.viewPlans')}</Link>
            </Button>
          </div>
        </div>
        <Switch size="sm" disabled />
      </CardContent>
      <CardFooter className="justify-center">
        <Button variant="outline" disabled>
          {t('accountAppearance.disableBranding.update')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export { DisableDefaultBrand };
