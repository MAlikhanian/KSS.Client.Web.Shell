'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import { toAbsoluteUrl } from '@/lib/helpers';
import { ProfileActivityContent } from '@/app/(protected)/public-profile/activity/content';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountActivityContent() {
  const { t } = useTranslation('account-activity');
  
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <ProfileActivityContent />
      <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5">
        <Engage
          title={t('accountActivity.engage.contactSupport.title')}
          description={t('accountActivity.engage.contactSupport.description')}
          image={
            <Fragment>
              <img
                src={toAbsoluteUrl('/media/illustrations/31.svg')}
                className="dark:hidden max-h-[150px]"
                alt="image"
              />
              <img
                src={toAbsoluteUrl('/media/illustrations/31-dark.svg')}
                className="light:hidden max-h-[150px]"
                alt="image"
              />
            </Fragment>
          }
          more={{
            title: t('accountActivity.engage.contactSupport.contactSupport'),
            url: '#',
          }}
        />
        <Engage
          title={t('accountActivity.engage.questions.title')}
          description={t('accountActivity.engage.questions.description')}
          image={
            <Fragment>
              <img
                src={toAbsoluteUrl('/media/illustrations/29.svg')}
                className="dark:hidden max-h-[150px]"
                alt="image"
              />
              <img
                src={toAbsoluteUrl('/media/illustrations/29-dark.svg')}
                className="light:hidden max-h-[150px]"
                alt="image"
              />
            </Fragment>
          }
          more={{
            title: t('accountActivity.engage.questions.goToHelpCenter'),
            url: '#',
          }}
        />
      </div>
    </div>
  );
}
