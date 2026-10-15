'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IBackupSettingsItem {
  title: string;
  description: string;
  control: ReactNode;
}
type IBackupSettingsItems = Array<IBackupSettingsItem>;

const BackupSettings = () => {
  const { t } = useTranslation('account-security');
  
  const items: IBackupSettingsItems = [
    {
      title: t('accountSecurityBackupAndRecovery.backupSettings.automaticBackup.title'),
      description: t('accountSecurityBackupAndRecovery.backupSettings.automaticBackup.description'),
      control: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      title: t('accountSecurityBackupAndRecovery.backupSettings.backupFrequency.title'),
      description: t('accountSecurityBackupAndRecovery.backupSettings.backupFrequency.description'),
      control: (
        <Select defaultValue="1">
          <SelectTrigger className="w-24" size="sm">
            <SelectValue placeholder={t('accountSecurityBackupAndRecovery.backupSettings.select')} />
          </SelectTrigger>
          <SelectContent className="w-24">
            <SelectItem value="1">{t('accountSecurityBackupAndRecovery.backupSettings.daily')}</SelectItem>
            <SelectItem value="2">{t('accountSecurityBackupAndRecovery.backupSettings.weekly')}</SelectItem>
            <SelectItem value="3">{t('accountSecurityBackupAndRecovery.backupSettings.monthly')}</SelectItem>
            <SelectItem value="4">{t('accountSecurityBackupAndRecovery.backupSettings.yearly')}</SelectItem>
          </SelectContent>
        </Select>
      ),
    },
    {
      title: t('accountSecurityBackupAndRecovery.backupSettings.manualBackup.title'),
      description: t('accountSecurityBackupAndRecovery.backupSettings.manualBackup.description'),
      control: <Button variant="outline">{t('accountSecurityBackupAndRecovery.backupSettings.start')}</Button>,
    },
  ];

  const renderItem = (item: IBackupSettingsItem, index: number) => {
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
      <CardHeader className="mb-1">
        <CardTitle>{t('accountSecurityBackupAndRecovery.backupSettings.title')}</CardTitle>
      </CardHeader>
      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Card>
  );
};

export { BackupSettings, type IBackupSettingsItem, type IBackupSettingsItems };
