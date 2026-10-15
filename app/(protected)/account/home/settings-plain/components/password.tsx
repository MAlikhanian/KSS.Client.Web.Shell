'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

const Password = () => {
  const { t } = useTranslation('account-home');
  return (
    <Card className="pb-2.5">
      <CardHeader id="password_settings">
        <CardTitle>{t('accountSettingsPlain.password.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsPlain.password.currentPassword')}</Label>
          <Input type="text" placeholder={t('accountSettingsPlain.password.currentPasswordPlaceholder')} />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsPlain.password.newPassword')}</Label>
          <Input type="text" placeholder={t('accountSettingsPlain.password.newPasswordPlaceholder')} />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mb-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsPlain.password.confirmNewPassword')}</Label>
          <Input type="text" placeholder={t('accountSettingsPlain.password.confirmNewPasswordPlaceholder')} />
        </div>
        <div className="flex justify-end">
          <Button>{t('accountSettingsPlain.password.resetPassword')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { Password };
