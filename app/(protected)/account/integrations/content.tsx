'use client';

import { Fragment } from 'react';
import { Faq } from '@/partials/common/faq';
import { Help2 } from '@/partials/common/help2';
import { Starter } from '@/partials/common/starter';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Integrations } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountIntegrationsContent() {
  const { t } = useTranslation('account-integrations');
  
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Integrations />
      <Starter
        image={
          <Fragment>
            <img
              src={toAbsoluteUrl('/media/illustrations/28.svg')}
              className="dark:hidden max-h-[230px]"
              alt="image"
            />
            <img
              src={toAbsoluteUrl('/media/illustrations/28-dark.svg')}
              className="light:hidden max-h-[230px]"
              alt="image"
            />
          </Fragment>
        }
        title={t('accountIntegrations.starter.title')}
        subTitle={
          <Fragment>
            {t('accountIntegrations.starter.subTitle')}
          </Fragment>
        }
        engage={{
          path: '/network/user-cards/mini-cards',
          label: t('accountIntegrations.starter.startNow'),
          btnColor: 'btn-primary',
        }}
      />
      <Faq />
      <Help2 />
    </div>
  );
}
