'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import { ScrollText } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const Upgrade = () => {
  const { t } = useTranslation('account-billing');
  return (
    <Fragment>
      <style>
        {`
          .upgrade-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-14.png')}');
          }
          .dark .upgrade-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-14-dark.png')}');
          }
        `}
      </style>

      <Card className="rounded-xl">
        <div className="flex items-center justify-between grow gap-5 p-5 rtl:bg-[center_left_-8rem] bg-[center_right_-8rem] bg-no-repeat bg-[length:700px] upgrade-bg">
          <div className="flex items-center gap-4">
            <HexagonBadge
              stroke="stroke-blue-200 dark:stroke-blue-950"
              fill="fill-blue-50 dark:fill-blue-950/30"
              size="size-[50px]"
              badge={<ScrollText className="text-xl text-blue-400" />}
            />
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <Link
                  href="#"
                  className="text-base font-medium text-mono hover:text-primary-active"
                >
                  {t('accountBillingEnterprise.upgrade.title')}
                </Link>
                <Badge variant="destructive" appearance="light">
                  {t('accountBillingEnterprise.upgrade.trialExpires')}
                </Badge>
              </div>
              <div className="text-sm text-secondary-foreground">
                {t('accountBillingEnterprise.upgrade.description')}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Button variant="ghost">
              <Link href="#">{t('accountBillingEnterprise.upgrade.cancelTrial')}</Link>
            </Button>
            <Button variant="mono">
              <Link href="#">{t('accountBillingEnterprise.upgrade.upgradeNow')}</Link>
            </Button>
          </div>
        </div>
      </Card>
    </Fragment>
  );
};

export { Upgrade };
