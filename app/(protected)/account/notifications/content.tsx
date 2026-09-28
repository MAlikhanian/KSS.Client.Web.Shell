'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { BellDot, BellRing, MessageSquareText } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Channels, DoNotDistrub, OtherNotifications } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountNotificationsContent() {
  const { t } = useTranslation('account-notifications');
  const posts: HighlightedPostsItems = [
    {
      icon: BellRing,
      title: t('accountNotifications.highlightedPosts.item1.title'),
      summary: t('accountNotifications.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: MessageSquareText,
      title: t('accountNotifications.highlightedPosts.item2.title'),
      summary: t('accountNotifications.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: BellDot,
      title: t('accountNotifications.highlightedPosts.item3.title'),
      summary: t('accountNotifications.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Channels />
          <OtherNotifications />
          <Faq />
          <Engage
            title={t('accountNotifications.engage.title')}
            description={t('accountNotifications.engage.description')}
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
              title: t('accountNotifications.engage.contactSupport'),
              url: '',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <DoNotDistrub />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
