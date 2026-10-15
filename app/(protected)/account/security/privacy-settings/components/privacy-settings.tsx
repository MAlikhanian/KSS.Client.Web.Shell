'use client';

import { Fragment, ReactNode } from 'react';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import {
  BadgePercent,
  CheckCircle2,
  LucideIcon,
  MailCheck,
  MapPin,
  Search,
  ShieldQuestion,
  UserCircle2,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IPrivacySettingsItem {
  icon: LucideIcon;
  title: ReactNode;
  description: string;
  actions: ReactNode;
}
type IPrivacySettingsItems = Array<IPrivacySettingsItem>;

const PrivacySettings = () => {
  const { t } = useTranslation('account-security');
  
  const items: IPrivacySettingsItems = [
    {
      icon: Search,
      title: (
        <Fragment>
          {t('accountSecurityPrivacySettings.privacySettings.showUpInSearchResults.title')}
          <Badge size="sm" variant="primary" appearance="light">
            {t('accountSecurityPrivacySettings.privacySettings.pro')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityPrivacySettings.privacySettings.showUpInSearchResults.description'),
      actions: <Switch size="sm" id="auto-update" />,
    },
    {
      icon: MailCheck,
      title: (
        <Fragment>
          {t('accountSecurityPrivacySettings.privacySettings.manageReadReceipts.title')}
          <Badge size="sm" variant="primary" appearance="light">
            {t('accountSecurityPrivacySettings.privacySettings.pro')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityPrivacySettings.privacySettings.manageReadReceipts.description'),
      actions: <Switch size="sm" id="auto-update" />,
    },
    {
      icon: MapPin,
      title: t('accountSecurityPrivacySettings.privacySettings.enableLocationBasedServices.title'),
      description: t('accountSecurityPrivacySettings.privacySettings.enableLocationBasedServices.description'),
      actions: <Switch size="sm" id="auto-update" defaultChecked />,
    },
    {
      icon: BadgePercent,
      title: (
        <Fragment>
          {t('accountSecurityPrivacySettings.privacySettings.adPersonalizationSettings.title')}
          <Badge variant="info" appearance="light">
            {t('accountSecurityPrivacySettings.privacySettings.beta')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityPrivacySettings.privacySettings.adPersonalizationSettings.description'),
      actions: <Button variant="outline">{t('accountSecurityPrivacySettings.privacySettings.setup')}</Button>,
    },
    {
      icon: UserCircle2,
      title: t('accountSecurityPrivacySettings.privacySettings.allowPublicProfile.title'),
      description: t('accountSecurityPrivacySettings.privacySettings.allowPublicProfile.description'),
      actions: <Switch size="sm" id="auto-update" defaultChecked />,
    },
    {
      icon: CheckCircle2,
      title: t('accountSecurityPrivacySettings.privacySettings.allowUseLocation.title'),
      description: t('accountSecurityPrivacySettings.privacySettings.allowUseLocation.description'),
      actions: <Switch size="sm" id="auto-update" />,
    },
    {
      icon: ShieldQuestion,
      title: (
        <Fragment>
          {t('accountSecurityPrivacySettings.privacySettings.privateVulnerabilityReporting.title')}
          <Badge variant="info" appearance="light">
            {t('accountSecurityPrivacySettings.privacySettings.beta')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityPrivacySettings.privacySettings.privateVulnerabilityReporting.description'),
      actions: (
        <Fragment>
          <Button
            variant="outline"
            className="bg-red-100 border-red-200 text-red-600 hover:text-white hover:bg-red-500 dark:border-red-950 dark:bg-red-950/30"
          >
            {t('accountSecurityPrivacySettings.privacySettings.disableAll')}
          </Button>
          <Button variant="outline">{t('accountSecurityPrivacySettings.privacySettings.enableAll')}</Button>
        </Fragment>
      ),
    },
  ];

  const renderItem = (item: IPrivacySettingsItem, index: number) => {
    return (
      <CardContent
        key={index}
        className="border-b border-border flex items-center justify-between py-4 gap-2.5"
      >
        <div className="flex items-center gap-3.5">
          <HexagonBadge
            stroke="stroke-input"
            fill="fill-muted/30"
            size="size-[50px]"
            badge={<item.icon className="text-xl text-muted-foreground" />}
          />
          <div className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
              {item.title}
            </span>
            <span className="text-sm text-secondary-foreground">
              {item.description}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2.5">{item.actions}</div>
      </CardContent>
    );
  };

  return (
    <Card>
      {items.map((item, index) => {
        return renderItem(item, index);
      })}
    </Card>
  );
};

export {
  PrivacySettings,
  type IPrivacySettingsItem,
  type IPrivacySettingsItems,
};
