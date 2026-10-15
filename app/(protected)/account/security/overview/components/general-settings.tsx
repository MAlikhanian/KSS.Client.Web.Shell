'use client';

import { Fragment, ReactNode } from 'react';
import { HexagonBadge } from '@/partials/common/hexagon-badge';
import {
  BadgeCheck,
  CheckCircle,
  LocateFixed,
  LucideIcon,
  Puzzle,
  ShieldCheck,
  TabletSmartphone,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IGeneralSettingsItem {
  icon: LucideIcon;
  title: ReactNode;
  description: string;
  actions: ReactNode;
}
type IGeneralSettingsItems = Array<IGeneralSettingsItem>;

const GeneralSettings = () => {
  const { t } = useTranslation('account-security');
  
  const items: IGeneralSettingsItems = [
    {
      icon: Users,
      title: (
        <Fragment>
          {t('accountSecurityOverview.generalSettings.preventMembersInviting.title')}
          <Badge size="sm" variant="primary" appearance="light">
            {t('accountSecurityOverview.generalSettings.pro')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityOverview.generalSettings.preventMembersInviting.description'),
      actions: <Switch size="sm" id="auto-update" />,
    },
    {
      icon: Puzzle,
      title: (
        <Fragment>
          {t('accountSecurityOverview.generalSettings.preventThirdPartyIntegrations.title')}
          <Badge size="sm" variant="primary" appearance="light">
            {t('accountSecurityOverview.generalSettings.pro')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityOverview.generalSettings.preventThirdPartyIntegrations.description'),
      actions: <Switch size="sm" id="auto-update" />,
    },
    {
      icon: LocateFixed,
      title: t('accountSecurityOverview.generalSettings.allowUseLocation.title'),
      description: t('accountSecurityOverview.generalSettings.allowUseLocation.description'),
      actions: <Switch size="sm" defaultChecked />,
    },
    {
      icon: ShieldCheck,
      title: (
        <Fragment>
          {t('accountSecurityOverview.generalSettings.pushProtection.title')}
          <Badge variant="info" appearance="light">
            {t('accountSecurityOverview.generalSettings.beta')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityOverview.generalSettings.pushProtection.description'),
      actions: <Button variant="outline">{t('accountSecurityOverview.generalSettings.setup')}</Button>,
    },
    {
      icon: BadgeCheck,
      title: t('accountSecurityOverview.generalSettings.allowPublicProfile.title'),
      description: t('accountSecurityOverview.generalSettings.allowPublicProfile.description'),
      actions: <Switch size="sm" defaultChecked />,
    },
    {
      icon: CheckCircle,
      title: t('accountSecurityOverview.generalSettings.allowUseLocation2.title'),
      description: t('accountSecurityOverview.generalSettings.allowUseLocation2.description'),
      actions: <Switch size="sm" />,
    },
    {
      icon: TabletSmartphone,
      title: (
        <Fragment>
          {t('accountSecurityOverview.generalSettings.privateVulnerabilityReporting.title')}
          <Badge variant="info" appearance="light">
            {t('accountSecurityOverview.generalSettings.beta')}
          </Badge>
        </Fragment>
      ),
      description: t('accountSecurityOverview.generalSettings.privateVulnerabilityReporting.description'),
      actions: (
        <Fragment>
          <Button
            variant="outline"
            className="bg-red-100 border-red-200 text-red-600 hover:text-white hover:bg-red-500 dark:border-red-950 dark:bg-red-950/30"
          >
            {t('accountSecurityOverview.generalSettings.disableAll')}
          </Button>
          <Button variant="outline">{t('accountSecurityOverview.generalSettings.enableAll')}</Button>
        </Fragment>
      ),
    },
  ];

  const renderItem = (item: IGeneralSettingsItem, index: number) => {
    return (
      <CardContent
        key={index}
        className="border-b border-border flex items-center flex-wrap sm:flex-nowrap justify-between py-4 gap-2.5"
      >
        <div className="flex items-center gap-3.5">
          <HexagonBadge
            stroke="stroke-input"
            fill="fill-muted/30"
            size="size-[50px]"
            badge={<item.icon className="text-xl text-muted-foreground" />}
          />
          <div className="flex flex-col gap-0.5">
            <span className="flex items-center gap-1.5 leading-none font-medium text-sm text-mono">
              {item.title}
            </span>
            <span className="text-sm text-gray700">{item.description}</span>
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
  GeneralSettings,
  type IGeneralSettingsItem,
  type IGeneralSettingsItems,
};
