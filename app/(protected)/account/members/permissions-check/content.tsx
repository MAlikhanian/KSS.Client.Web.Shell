'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { ShieldCheck, ToggleRight, UserCog } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Members } from '@/app/(protected)/account/members/permissions-toggle/components/members';
import { PermissionsCheck } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountPermissionsCheckContent() {
  const { t } = useTranslation('account-members');
  const posts: HighlightedPostsItems = [
    {
      icon: UserCog,
      title: t('accountMembersPermissionsCheck.highlightedPosts.item1.title'),
      summary: t('accountMembersPermissionsCheck.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: ToggleRight,
      title: t('accountMembersPermissionsCheck.highlightedPosts.item2.title'),
      summary: t('accountMembersPermissionsCheck.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: ShieldCheck,
      title: t('accountMembersPermissionsCheck.highlightedPosts.item3.title'),
      summary: t('accountMembersPermissionsCheck.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <PermissionsCheck />
          <Members title={t('accountMembersPermissionsCheck.members.title')} />
          <Faq />
          <Engage
            title={t('accountMembersPermissionsCheck.engage.title')}
            description={t('accountMembersPermissionsCheck.engage.description')}
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
              title: t('accountMembersPermissionsCheck.engage.contactSupport'),
              url: '',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
