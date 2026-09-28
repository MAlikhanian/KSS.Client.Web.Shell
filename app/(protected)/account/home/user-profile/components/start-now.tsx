'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const StartNow = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Fragment>
      <style>
        {`
          .start-now-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5.png')}');
          }
          .dark .start-now-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-5-dark.png')}');
          }
        `}
      </style>

      <Card className="flex-col gap-5 justify-between bg-[center_top_1.3rem] bg-no-repeat pt-5 lg:pt-10 px-5 start-now-bg bg-[length:700px]">
        <div className="text-center">
          <h3 className="text-mono text-lg font-semibold leading-6 mb-1.5">
            {t('accountUserProfile.startNow.title')}
          </h3>
          <span className="text-secondary-foreground text-sm block mb-5">
            {t('accountUserProfile.startNow.description')}
          </span>
          <Button variant="mono">
            <Link href="/network/user-table/visitors">{t('accountUserProfile.startNow.button')}</Link>
          </Button>
        </div>
        <div className="text-center">
          <img
            src={toAbsoluteUrl('/media/images/2600x1200/3.png')}
            className="dark:hidden max-h-[300px]"
            alt=""
          />
          <img
            src={toAbsoluteUrl('/media/images/2600x1200/3-dark.png')}
            className="light:hidden max-h-[300px]"
            alt=""
          />
        </div>
      </Card>
    </Fragment>
  );
};

export { StartNow };
