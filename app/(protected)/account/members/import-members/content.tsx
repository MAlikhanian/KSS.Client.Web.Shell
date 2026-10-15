'use client';

import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { LogOut, MousePointer, Users } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Import } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountImportMembersContent() {
  const { t } = useTranslation('account-members');
  const posts: HighlightedPostsItems = [
    {
      icon: Users,
      title: t('accountMembersImportMembers.highlightedPosts.item1.title'),
      summary: t('accountMembersImportMembers.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: LogOut,
      title: t('accountMembersImportMembers.highlightedPosts.item2.title'),
      summary: t('accountMembersImportMembers.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: MousePointer,
      title: t('accountMembersImportMembers.highlightedPosts.item3.title'),
      summary: t('accountMembersImportMembers.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Import />
          <Faq />
          <Engage
            title={t('accountMembersImportMembers.engage.title')}
            description={t('accountMembersImportMembers.engage.description')}
            image={
              <>
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
              </>
            }
            more={{
              title: t('accountMembersImportMembers.engage.contactSupport'),
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
