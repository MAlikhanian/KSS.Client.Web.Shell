'use client';

import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { Settings, ToggleRight } from 'lucide-react';
import {
  BlockList,
  ManageData,
  PrivacySettings,
  ReportSettings,
} from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountPrivacySettingsContent() {
  const { t } = useTranslation('account-security');
  
  const posts: HighlightedPostsItems = [
    {
      icon: ToggleRight,
      title: t('accountSecurityPrivacySettings.highlightedPosts.fortifyingPrivacyControls.title'),
      summary: t('accountSecurityPrivacySettings.highlightedPosts.fortifyingPrivacyControls.summary'),
      path: '#',
    },
    {
      icon: Settings,
      title: t('accountSecurityPrivacySettings.highlightedPosts.navigatingPrivacyPreferences.title'),
      summary: t('accountSecurityPrivacySettings.highlightedPosts.navigatingPrivacyPreferences.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <PrivacySettings />
          <div className="grid lg:grid-cols-2 gap-5 lg:gap-7.5">
            <ReportSettings limit={3} />
            <ManageData />
          </div>
          <Faq />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <BlockList text={t('accountSecurityPrivacySettings.blockList.description')} />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
