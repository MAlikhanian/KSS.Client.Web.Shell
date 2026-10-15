'use client';

import { RecentUploads } from '@/app/(protected)/public-profile/profiles/default/components/recent-uploads';
import {
  BasicSettings,
  CalendarAccounts,
  CommunityBadges,
  Connections,
  PersonalInfo,
  StartNow,
  Work,
} from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountUserProfileContent() {
  const { t } = useTranslation('account-home');
  
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 lg:gap-7.5">
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <PersonalInfo />
          <BasicSettings title={t('accountUserProfile.basicSettings.title')} />
          <Work />
          <CommunityBadges />
        </div>
      </div>
      <div className="col-span-1">
        <div className="grid gap-5 lg:gap-7.5">
          <StartNow />
          <CalendarAccounts />
          <Connections url="#" />
          <RecentUploads title={t('accountUserProfile.myFiles')} />
        </div>
      </div>
    </div>
  );
}
