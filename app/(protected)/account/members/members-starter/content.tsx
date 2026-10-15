'use client';

import { Fragment } from 'react';
import { Faq } from '@/partials/common/faq';
import { Help2 } from '@/partials/common/help2';
import { Starter } from '@/partials/common/starter';
import { toAbsoluteUrl } from '@/lib/helpers';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountMembersStarterContent() {
  const { t } = useTranslation('account-members');
  
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <Starter
        image={
          <Fragment>
            <img
              src={toAbsoluteUrl('/media/illustrations/22.svg')}
              className="dark:hidden max-h-[230px]"
              alt="image"
            />
            <img
              src={toAbsoluteUrl('/media/illustrations/22-dark.svg')}
              className="light:hidden max-h-[230px]"
              alt="image"
            />
          </Fragment>
        }
        title={t('accountMembersMembersStarter.starter.title')}
        subTitle={
          <Fragment>
            {t('accountMembersMembersStarter.starter.subTitle')}
          </Fragment>
        }
        engage={{
          path: '/account/home/user-profile',
          label: t('accountMembersMembersStarter.starter.addNewMember'),
          btnColor: 'btn-primary',
        }}
      />
      <Faq />
      <Help2 />
    </div>
  );
}
