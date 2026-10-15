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
import { useTranslation } from '@/hooks/useTranslation';

const AdvancedSettingsAddress = () => {
  const { t } = useTranslation('account-home');
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('1');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');

  return (
    <Card>
      <CardHeader id="advanced_settings_address">
        <CardTitle>{t('accountSettingsSidebar.advancedSettingsAddress.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 lg:py-7.5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full items-center gap-1 max-w-56">
            {t('accountSettingsSidebar.advancedSettingsAddress.address')}
          </Label>
          <Input
            id="address"
            type="text"
            placeholder={t('accountSettingsSidebar.advancedSettingsAddress.addressPlaceholder')}
            defaultValue={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsAddress.country')}</Label>
          <div className="grow">
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder={t('accountSettingsSidebar.advancedSettingsAddress.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('accountSettingsSidebar.advancedSettingsAddress.spain')}</SelectItem>
                <SelectItem value="2">{t('accountSettingsSidebar.advancedSettingsAddress.option2')}</SelectItem>
                <SelectItem value="3">{t('accountSettingsSidebar.advancedSettingsAddress.option3')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsAddress.state')}</Label>
          <Input
            id="state"
            type="text"
            placeholder={t('accountSettingsSidebar.advancedSettingsAddress.statePlaceholder')}
            defaultValue={state}
            onChange={(e) => setState(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsAddress.city')}</Label>
          <Input
            id="city"
            type="text"
            placeholder={t('accountSettingsSidebar.advancedSettingsAddress.cityPlaceholder')}
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-56">{t('accountSettingsSidebar.advancedSettingsAddress.postcode')}</Label>
          <Input
            id="postcode"
            type="text"
            placeholder={t('accountSettingsSidebar.advancedSettingsAddress.postcodePlaceholder')}
            defaultValue={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>
        <div className="flex justify-end pt-2.5">
          <Button>{t('accountSettingsSidebar.advancedSettingsAddress.saveChanges')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export { AdvancedSettingsAddress };
