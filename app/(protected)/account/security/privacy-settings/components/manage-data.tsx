'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IManageDataItem {
  title: string;
  description: string;
  control: ReactNode;
}
type IManageDataItems = Array<IManageDataItem>;

const ManageData = () => {
  const { t } = useTranslation('account-security');
  
  const items: IManageDataItems = [
    {
      title: t('accountSecurityPrivacySettings.manageData.downloadData.title'),
      description: t('accountSecurityPrivacySettings.manageData.downloadData.description'),
      control: <Button variant="outline">{t('accountSecurityPrivacySettings.manageData.start')}</Button>,
    },
    {
      title: t('accountSecurityPrivacySettings.manageData.deleteData.title'),
      description: t('accountSecurityPrivacySettings.manageData.deleteData.description'),
      control: <Button variant="outline">{t('accountSecurityPrivacySettings.manageData.delete')}</Button>,
    },
    {
      title: t('accountSecurityPrivacySettings.manageData.dataRetention.title'),
      description: t('accountSecurityPrivacySettings.manageData.dataRetention.description'),
      control: <Switch id="size-xs" size="sm" />,
    },
  ];

  const renderItem = (item: IManageDataItem, index: number) => {
    return (
      <CardContent
        key={index}
        className="border-b border-border flex items-center justify-between py-4 gap-2.5"
      >
        <div className="flex flex-col justify-center gap-1.5">
          <span className="leading-none font-medium text-sm text-mono">
            {item.title}
          </span>
          <span className="text-sm text-secondary-foreground">
            {item.description}
          </span>
        </div>
        {item.control}
      </CardContent>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountSecurityPrivacySettings.manageData.title')}</CardTitle>
      </CardHeader>
      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Card>
  );
};

export { ManageData, type IManageDataItem, type IManageDataItems };
