'use client';

import { ReactNode } from 'react';
import { CardIntegration } from '@/partials/cards';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IIntegrationsItem {
  logo: string;
  path: string;
  name: string;
  description: string;
  actions: ReactNode;
}
type IIntegrationsItems = Array<IIntegrationsItem>;

const Integrations = () => {
  const { t } = useTranslation('account-integrations');
  const items: IIntegrationsItems = [
    {
      logo: 'jira.svg',
      path: '/account/billing/basic',
      name: t('accountIntegrations.integrations.items.jira.name'),
      description: t('accountIntegrations.integrations.items.jira.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      logo: 'inferno.svg',
      path: '/account/billing/enterprise',
      name: t('accountIntegrations.integrations.items.inferno.name'),
      description: t('accountIntegrations.integrations.items.inferno.description'),
      actions: <Switch id="size-sm" size="sm" />,
    },
    {
      logo: 'evernote.svg',
      path: '/account/billing/plans',
      name: t('accountIntegrations.integrations.items.evernote.name'),
      description: t('accountIntegrations.integrations.items.evernote.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      logo: 'gitlab.svg',
      path: '/account/billing/history',
      name: t('accountIntegrations.integrations.items.gitlab.name'),
      description: t('accountIntegrations.integrations.items.gitlab.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      logo: 'google-webdev.svg',
      path: '/account/security/get-started',
      name: t('accountIntegrations.integrations.items.googleWebdev.name'),
      description: t('accountIntegrations.integrations.items.googleWebdev.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      logo: 'invision.svg',
      path: '/account/security/overview',
      name: t('accountIntegrations.integrations.items.invision.name'),
      description: t('accountIntegrations.integrations.items.invision.description'),
      actions: <Switch id="size-sm" size="sm" />,
    },
    {
      logo: 'duolingo.svg',
      path: '/account/security/allowed-ip-addresses',
      name: t('accountIntegrations.integrations.items.duolingo.name'),
      description: t('accountIntegrations.integrations.items.duolingo.description'),
      actions: <Switch id="size-sm" size="sm" />,
    },
    {
      logo: 'google-analytics-2.svg',
      path: '/account/security/privacy-settings',
      name: t('accountIntegrations.integrations.items.googleAnalytics.name'),
      description: t('accountIntegrations.integrations.items.googleAnalytics.description'),
      actions: <Switch id="size-sm" size="sm" />,
    },
  ];

  const renderItem = (item: IIntegrationsItem, index: number) => {
    return (
      <CardIntegration
        logo={item.logo}
        path={item.path}
        name={item.name}
        description={item.description}
        actions={item.actions}
        key={index}
      />
    );
  };

  return (
    <div id="integrations_cards">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </div>
  );
};

export { Integrations, type IIntegrationsItem, type IIntegrationsItems };
