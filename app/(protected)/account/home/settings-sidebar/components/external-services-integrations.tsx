'use client';

import Link from 'next/link';
import { Settings } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IExternalServicesIntegrationsItem {
  logo: string;
  title: string;
  email: string;
  description: string;
  checkbox: boolean;
}
type IExternalServicesIntegrationsItems =
  Array<IExternalServicesIntegrationsItem>;

const ExternalServicesIntegrations = () => {
  const { t } = useTranslation('account-home');
  const items: IExternalServicesIntegrationsItems = [
    {
      logo: 'google-webdev.svg',
      title: t('accountSettingsSidebar.externalServicesIntegrations.googleWebdev'),
      email: t('accountSettingsSidebar.externalServicesIntegrations.googleWebdevEmail'),
      description: t('accountSettingsSidebar.externalServicesIntegrations.googleWebdevDescription'),
      checkbox: true,
    },
    {
      logo: 'equacoin.svg',
      title: t('accountSettingsSidebar.externalServicesIntegrations.equacoin'),
      email: t('accountSettingsSidebar.externalServicesIntegrations.equacoinEmail'),
      description: t('accountSettingsSidebar.externalServicesIntegrations.equacoinDescription'),
      checkbox: false,
    },
    {
      logo: 'evernote.svg',
      title: t('accountSettingsSidebar.externalServicesIntegrations.evernote'),
      email: t('accountSettingsSidebar.externalServicesIntegrations.evernoteEmail'),
      description: t('accountSettingsSidebar.externalServicesIntegrations.evernoteDescription'),
      checkbox: true,
    },
    {
      logo: 'inferno.svg',
      title: t('accountSettingsSidebar.externalServicesIntegrations.inferno'),
      email: t('accountSettingsSidebar.externalServicesIntegrations.infernoEmail'),
      description: t('accountSettingsSidebar.externalServicesIntegrations.infernoDescription'),
      checkbox: true,
    },
    {
      logo: 'jira.svg',
      title: t('accountSettingsSidebar.externalServicesIntegrations.jira'),
      email: t('accountSettingsSidebar.externalServicesIntegrations.jiraEmail'),
      description: t('accountSettingsSidebar.externalServicesIntegrations.jiraDescription'),
      checkbox: false,
    },
  ];

  const renderItem = (
    item: IExternalServicesIntegrationsItem,
    index: number,
  ) => {
    return (
      <div
        key={index}
        className="flex items-center justify-between flex-wrap border border-border rounded-xl gap-2 p-3.5"
      >
        <div className="flex items-center flex-wrap gap-3.5">
          <img
            src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
            className="size-8 shrink-0"
            alt="image"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <Link
                href="#"
                className="text-sm font-medium text-mono hover:text-primary-active"
              >
                {item.title}
              </Link>
              <Link
                href="#"
                className="text-sm text-secondary-foreground hover:text-primary-active"
              >
                {item.email}
              </Link>
            </div>
            <span className="text-sm text-secondary-foreground">
              {item.description}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-5">
          {item.checkbox ? (
            <Switch id="size-sm" size="sm" defaultChecked />
          ) : (
            <Switch id="size-sm" size="sm" />
          )}
          <div className="btn btn-sm btn-icon btn-clear btn-light">
            <Settings size={20} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader id="external_services_integrations">
        <CardTitle>{t('accountSettingsSidebar.externalServicesIntegrations.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5 lg:gap-7.5 lg:py-7.5 py-5">
        <div className="grid gap-5">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
        <div className="flex justify-end">
          <Button>
            <Link href="#">{t('accountSettingsSidebar.externalServicesIntegrations.saveChanges')}</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export {
  ExternalServicesIntegrations,
  type IExternalServicesIntegrationsItem,
  type IExternalServicesIntegrationsItems,
};
