'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

const AuthPassword = () => {
  const { t } = useTranslation('account-home');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <Card>
      <CardHeader id="auth_password">
        <CardTitle>{t('accountSettingsSidebar.authPassword.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.authPassword.currentPassword')}</Label>
            <Input
              type="password"
              placeholder={t('accountSettingsSidebar.authPassword.currentPasswordPlaceholder')}
              defaultValue={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.authPassword.newPassword')}</Label>
            <Input
              type="password"
              placeholder={t('accountSettingsSidebar.authPassword.newPasswordPlaceholder')}
              defaultValue={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.authPassword.confirmNewPassword')}</Label>
            <Input
              type="password"
              placeholder={t('accountSettingsSidebar.authPassword.confirmNewPasswordPlaceholder')}
              defaultValue={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end pt-2.5">
          <Button>{t('accountSettingsSidebar.authPassword.resetPassword')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AuthPassword };
