'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

const DeleteAccount = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card>
      <CardHeader id="delete_account">
        <CardTitle>{t('accountSettingsSidebar.deleteAccount.title')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col lg:py-7.5 lg:gap-7.5 gap-3">
        <div className="flex flex-col gap-5">
          <div className="text-sm text-foreground">
            {t('accountSettingsSidebar.deleteAccount.description')}{' '}
            <Button mode="link" asChild>
              <Link href="#">{t('accountSettingsSidebar.deleteAccount.setupGuidelines')}</Link>
            </Button>{' '}
            {t('accountSettingsSidebar.deleteAccount.continueText')}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox />
            <Label>{t('accountSettingsSidebar.deleteAccount.confirmDeleting')}</Label>
          </div>
        </div>
        <div className="flex justify-end gap-2.5">
          <Button variant="outline">
            <Link href="#">{t('accountSettingsSidebar.deleteAccount.deactivateInstead')}</Link>
          </Button>
          <Button variant="destructive">
            <Link href="#">{t('accountSettingsSidebar.deleteAccount.deleteAccount')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { DeleteAccount };
