'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { Cloud, Expand, StickyNote, UsersRound } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { ExternalServicesManageApi } from '@/app/(protected)/account/home/settings-sidebar/components/external-services-manage-api';
import { DoNotDistrub } from '@/app/(protected)/account/notifications/components/do-not-distrub';
import { ApiIntegrations, Webhooks } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountApiKeysContent() {
  const { t } = useTranslation('account-api-keys');
  const posts: HighlightedPostsItems = [
    {
      icon: Cloud,
      title: t('accountApiKeys.highlightedPosts.item1.title'),
      summary: t('accountApiKeys.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: Expand,
      title: t('accountApiKeys.highlightedPosts.item2.title'),
      summary: t('accountApiKeys.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: UsersRound,
      title: t('accountApiKeys.highlightedPosts.item3.title'),
      summary: t('accountApiKeys.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <ExternalServicesManageApi title={t('accountApiKeys.publicApiKey')} switch={true} />
          <ApiIntegrations />
          <Webhooks />
          <Faq />
          <Engage
            title={t('accountApiKeys.engage.title')}
            description={t('accountApiKeys.engage.description')}
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
              title: t('accountApiKeys.engage.contactSupport'),
              url: '#',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <DoNotDistrub
            title={t('accountApiKeys.projectApiKeys.title')}
            icon={<StickyNote className="text-input" size={20} />}
            text={t('accountApiKeys.projectApiKeys.clientDocs')}
          />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
