'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

const Webhooks = () => {
  const { t } = useTranslation('account-api-keys');
  const [webhooknameInput, setWebhookNameInput] = useState('CostaRicaHook');

  return (
    <Card className="pb-2.5">
      <CardHeader id="webhooks">
        <CardTitle>{t('accountApiKeys.webhooks.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <p className="text-sm text-foreground">
          {t('accountApiKeys.webhooks.description')}
        </p>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountApiKeys.webhooks.webhookUrl')}</Label>
          <div className="grow">
            <Input type="text" placeholder={t('accountApiKeys.webhooks.enterUrl')} />
          </div>
        </div>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountApiKeys.webhooks.webhookName')}</Label>
          <div className="grow">
            <Input
              type="text"
              value={webhooknameInput}
              onChange={(e) => setWebhookNameInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountApiKeys.webhooks.eventType')}</Label>
          <div className="grow">
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder={t('accountApiKeys.webhooks.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('accountApiKeys.webhooks.allEvents')}</SelectItem>
                <SelectItem value="2">{t('accountApiKeys.webhooks.pushWebhooks')}</SelectItem>
                <SelectItem value="3">{t('accountApiKeys.webhooks.pipeWebhook')}</SelectItem>
                <SelectItem value="4">{t('accountApiKeys.webhooks.pluginWebhooks')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5 mb-2.5">
          <Label className="flex w-full max-w-56">{t('accountApiKeys.webhooks.customHeaders')}</Label>
          <div className="grow">
            <div className="flex items-center space-x-2">
              <Label htmlFor="size-sm" className="text-sm">
                {t('accountApiKeys.webhooks.useCustomHeader')}
              </Label>
              <Switch id="size-sm" size="sm" defaultChecked />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button>{t('accountApiKeys.webhooks.saveChanges')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { Webhooks };
