'use client';

import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

const AdvancedSettingsPreferences = () => {
  const { t } = useTranslation('account-home');
  const id1 = useId();
  const id2 = useId();

  return (
    <Card>
      <CardHeader id="advanced_settings_preferences">
        <CardTitle>{t('accountSettingsSidebar.advancedSettingsPreferences.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.language')}</Label>
          <div className="grow">
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder={t('accountSettingsSidebar.advancedSettingsPreferences.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('accountSettingsSidebar.advancedSettingsPreferences.americanEnglish')}</SelectItem>
                <SelectItem value="2">{t('accountSettingsSidebar.advancedSettingsPreferences.option2')}</SelectItem>
                <SelectItem value="3">{t('accountSettingsSidebar.advancedSettingsPreferences.option3')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.timeZone')}</Label>
          <div className="grow">
            <Select defaultValue="4">
              <SelectTrigger>
                <SelectValue placeholder={t('accountSettingsSidebar.advancedSettingsPreferences.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">
                  {t('accountSettingsSidebar.advancedSettingsPreferences.easternTime')}
                </SelectItem>
                <SelectItem value="5">{t('accountSettingsSidebar.advancedSettingsPreferences.option2')}</SelectItem>
                <SelectItem value="6">{t('accountSettingsSidebar.advancedSettingsPreferences.option3')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5 mb-2">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.currency')}</Label>
          <div className="grow">
            <Select defaultValue="7">
              <SelectTrigger>
                <SelectValue placeholder={t('accountSettingsSidebar.advancedSettingsPreferences.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">{t('accountSettingsSidebar.advancedSettingsPreferences.usd')}</SelectItem>
                <SelectItem value="8">{t('accountSettingsSidebar.advancedSettingsPreferences.option2')}</SelectItem>
                <SelectItem value="9">{t('accountSettingsSidebar.advancedSettingsPreferences.option3')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.openTasksAs')}</Label>
          <div className="flex items-center gap-5">
            <RadioGroup
              defaultValue="intermediate"
              className="flex items-center gap-5"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="intermediate" id={id1} />
                <Label
                  htmlFor={id1}
                  className="text-foreground text-sm font-normal"
                >
                  {t('accountSettingsSidebar.advancedSettingsPreferences.modal')}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="beginner" id={id2} />
                <Label
                  htmlFor={id2}
                  className="text-foreground text-sm font-normal"
                >
                  {t('accountSettingsSidebar.advancedSettingsPreferences.fullscreen')}
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5 mb-1.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.attributes')}</Label>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center space-x-2">
                <Checkbox />
                <Label>{t('accountSettingsSidebar.advancedSettingsPreferences.showListNames')}</Label>
              </div>
              <div className="form-hint">{t('accountSettingsSidebar.advancedSettingsPreferences.showListNamesDescription')}</div>
            </div>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center space-x-2">
                <Checkbox defaultChecked />
                <Label>{t('accountSettingsSidebar.advancedSettingsPreferences.showLinkedTaskNames')}</Label>
              </div>
              <div className="form-hint">
                {t('accountSettingsSidebar.advancedSettingsPreferences.showLinkedTaskNamesDescription')}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsPreferences.emailVisibility')}</Label>
          <Switch defaultChecked size="sm" />
          <Label htmlFor="auto-update" className="text-foreground text-sm">
            {t('accountSettingsSidebar.advancedSettingsPreferences.visible')}
          </Label>
        </div>
        <div className="flex justify-end">
          <Button>{t('accountSettingsSidebar.advancedSettingsPreferences.saveChanges')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AdvancedSettingsPreferences };
