'use client';

import { DeleteAccount } from '@/app/(protected)/account/home/settings-sidebar/components/delete-account';
import { BasicSettings, Password, FilesUpload } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountSettingsPlainContent() {
  const { t } = useTranslation('account-home');
  
  return (
    <div className="grid gap-5 lg:gap-7.5 xl:w-[38.75rem] mx-auto">
      <BasicSettings title={t('accountSettingsPlain.basicSettings.title')} />
      <FilesUpload />
      <Password />
      <DeleteAccount />
    </div>
  );
}
