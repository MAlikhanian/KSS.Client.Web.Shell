'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

const AuthEmail = () => {
  const { t } = useTranslation('account-home');
  const [emailInput, setEmailInput] = useState('jason@studio.io');

  return (
    <Card className="pb-2.5">
      <CardHeader id="auth_email">
        <CardTitle>{t('accountSettingsSidebar.authEmail.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 pt-7.5">
        <div className="w-full">
          <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
            <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.authEmail.email')}</Label>
            <div className="flex flex-col items-start grow gap-7.5 w-full">
              <Input
                className="input"
                type="text"
                defaultValue={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
              />
              <div className="flex items-center gap-7.5">
                <Label
                  htmlFor="auto-update"
                  className="text-foreground text-sm"
                >
                  {t('accountSettingsSidebar.authEmail.active')}
                </Label>
                <Switch defaultChecked size="sm" />
                <Label
                  htmlFor="auto-update"
                  className="text-foreground text-sm"
                >
                  {t('accountSettingsSidebar.authEmail.primary')}
                </Label>
                <Switch size="sm" />
              </div>
              <span className="form-info text-foreground text-sm font-normal">
                {t('accountSettingsSidebar.authEmail.description')}
              </span>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>{t('accountSettingsSidebar.authEmail.saveChanges')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AuthEmail };
