'use client';

import { ReactNode } from 'react';
import { CardAddNew, CardRole } from '@/partials/cards';
import {
  Eye,
  Fingerprint,
  LineChart,
  PenTool,
  Settings,
  Truck,
  Users,
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface Badge {
  size: string;
  badge: ReactNode;
  fill: string;
  stroke: string;
}

interface IRolesItem {
  badge: Badge;
  title: string;
  subTitle: string;
  description: string;
  team: string;
  path: string;
}
type IRolesItems = Array<IRolesItem>;

const Roles = () => {
  const { t } = useTranslation('account-members');
  const items: IRolesItems = [
    {
      badge: {
        size: 'size-[44px]',
        badge: <Settings className="text-xl text-blue-400" />,
        stroke: 'stroke-blue-200 dark:stroke-blue-950',
        fill: 'fill-blue-50 dark:fill-blue-950/30',
      },
      title: t('accountMembersRoles.roles.administrator.title'),
      subTitle: t('accountMembersRoles.roles.administrator.subTitle'),
      description: t('accountMembersRoles.roles.administrator.description'),
      team: t('accountMembersRoles.roles.administrator.team', { count: 1 }),
      path: '/public-profile/profiles/creator',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <Eye className="text-xl text-orange-400" />,
        stroke: 'stroke-orange-200 dark:stroke-orange-950',
        fill: 'fill-orange-50 dark:fill-orange-950/30',
      },
      title: t('accountMembersRoles.roles.viewer.title'),
      subTitle: t('accountMembersRoles.roles.viewer.subTitle'),
      description: t('accountMembersRoles.roles.viewer.description'),
      team: t('accountMembersRoles.roles.viewer.team', { count: 32 }),
      path: '/public-profile/profiles/company',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <Fingerprint className="text-xl text-green-400" />,
        stroke: 'stroke-green-200 dark:stroke-green-950',
        fill: 'fill-green-50 dark:fill-green-950/30',
      },
      title: t('accountMembersRoles.roles.remoteDeveloper.title'),
      subTitle: t('accountMembersRoles.roles.remoteDeveloper.subTitle'),
      description: t('accountMembersRoles.roles.remoteDeveloper.description'),
      team: t('accountMembersRoles.roles.remoteDeveloper.team', { count: 6 }),
      path: '/public-profile/profiles/nft',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <Truck className="text-xl text-red-400" />,
        stroke: 'stroke-red-200 dark:stroke-red-950',
        fill: 'fill-red-50  dark:fill-red-950/30',
      },
      title: t('accountMembersRoles.roles.customerSupport.title'),
      subTitle: t('accountMembersRoles.roles.customerSupport.subTitle'),
      description: t('accountMembersRoles.roles.customerSupport.description'),
      team: t('accountMembersRoles.roles.customerSupport.team', { count: 32 }),
      path: '/public-profile/profiles/blogger',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <LineChart className="text-xl text-violet-400" />,
        stroke: 'stroke-violet-200 dark:stroke-violet-950',
        fill: 'fill-violet-50  dark:fill-violet-950/30',
      },
      title: t('accountMembersRoles.roles.projectManager.title'),
      subTitle: t('accountMembersRoles.roles.projectManager.subTitle'),
      description: t('accountMembersRoles.roles.projectManager.description'),
      team: t('accountMembersRoles.roles.projectManager.team', { count: 6 }),
      path: '/public-profile/profiles/crm',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <PenTool className="text-xl text-muted-foreground" />,
        fill: 'fill-muted/30',
        stroke: 'stroke-input',
      },
      title: t('accountMembersRoles.roles.remoteDesigner.title'),
      subTitle: t('accountMembersRoles.roles.remoteDesigner.subTitle'),
      description: t('accountMembersRoles.roles.remoteDesigner.description'),
      team: t('accountMembersRoles.roles.remoteDesigner.team', { count: 6 }),
      path: '/public-profile/profiles/gamer',
    },
    {
      badge: {
        size: 'size-[44px]',
        badge: <Users className="text-xl text-green-400" />,
        stroke: 'stroke-green-200 dark:stroke-green-950',
        fill: 'fill-green-50 dark:fill-green-950/30',
      },
      title: t('accountMembersRoles.roles.hrManager.title'),
      subTitle: t('accountMembersRoles.roles.hrManager.subTitle'),
      description: t('accountMembersRoles.roles.hrManager.description'),
      team: t('accountMembersRoles.roles.hrManager.team', { count: 1 }),
      path: '/public-profile/profiles/feeds',
    },
  ];

  const renderItem = (item: IRolesItem, index: number) => {
    return (
      <CardRole
        key={index}
        title={item.title}
        subTitle={item.subTitle}
        description={item.description}
        team={item.team}
        path={item.path}
        badge={item.badge}
      />
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-7.5">
      {items.map((item, index) => {
        return renderItem(item, index);
      })}
      <CardAddNew
        path="/public-profile/works"
        size="size-[60px]"
        iconSize="text-xl"
        title={t('accountMembersRoles.addNewRole.title')}
        subTitle={t('accountMembersRoles.addNewRole.subTitle')}
      />
    </div>
  );
};

export { Roles, type IRolesItem, type IRolesItems };
