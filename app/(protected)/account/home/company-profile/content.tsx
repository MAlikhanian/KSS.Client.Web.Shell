'use client';

import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { BookCopy, ChartNoAxesCombined, Compass } from 'lucide-react';
import {
  AccountSettings,
  Branding,
  DataImport,
  GeneralInfo,
  Members,
} from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountCompanyProfileContent() {
  const { t } = useTranslation('account-home');
  
  const posts: HighlightedPostsItems = [
    {
      icon: BookCopy,
      title: t('accountCompanyProfile.highlightedPosts.userGuidelines.title'),
      summary: t('accountCompanyProfile.highlightedPosts.userGuidelines.summary'),
      path: '#',
    },
    {
      icon: Compass,
      title: t('accountCompanyProfile.highlightedPosts.comprehensiveGuide.title'),
      summary: t('accountCompanyProfile.highlightedPosts.comprehensiveGuide.summary'),
      path: '#',
    },
    {
      icon: ChartNoAxesCombined,
      title: t('accountCompanyProfile.highlightedPosts.stayUpdated.title'),
      summary: t('accountCompanyProfile.highlightedPosts.stayUpdated.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <GeneralInfo />
          <AccountSettings />
          <Branding />
          <Members url="#" />
          <DataImport />
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
