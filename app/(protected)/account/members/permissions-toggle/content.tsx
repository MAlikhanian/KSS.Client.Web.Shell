'use client';

import { Faq } from '@/partials/common/faq';
import { Help2 } from '@/partials/common/help2';
import { Members, PermissionsToggle } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountPermissionsToggleContent() {
  const { t } = useTranslation('account-members');
  
  return (
    <div className="grid gap-5 lg:gap-7.5">
      <PermissionsToggle />
      <Members title={t('accountMembersPermissionsToggle.members.title')} />
      <Faq />
      <Help2 />
    </div>
  );
}
