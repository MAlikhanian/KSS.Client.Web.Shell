'use client';

import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { Book, Database } from 'lucide-react';
import { Backup, BackupSettings } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountBackupAndRecoveryContent() {
  const { t } = useTranslation('account-security');
  
  const posts: HighlightedPostsItems = [
    {
      icon: Book,
      title: t('accountSecurityBackupAndRecovery.highlightedPosts.securingDataIntegrity.title'),
      summary: t('accountSecurityBackupAndRecovery.highlightedPosts.securingDataIntegrity.summary'),
      path: '#',
    },
    {
      icon: Database,
      title: t('accountSecurityBackupAndRecovery.highlightedPosts.restorationAssurance.title'),
      summary: t('accountSecurityBackupAndRecovery.highlightedPosts.restorationAssurance.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Backup />
          <Faq />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <BackupSettings />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
