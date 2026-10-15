'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Bell,
  Boxes,
  FileText,
  IdCard,
  KeySquare,
  LineChart,
  MonitorSmartphone,
  MousePointerSquareDashed,
  Palette,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IOptionsItems, Options } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountGetStartedContent() {
  const { t } = useTranslation('account-home');
  
  const items: IOptionsItems = [
    {
      icon: IdCard,
      title: t('accountGetStarted.personalInfo.title'),
      desc: t('accountGetStarted.personalInfo.description'),
      path: '/account/members/team-info',
    },
    {
      icon: ShieldCheck,
      title: t('accountGetStarted.loginSecurity.title'),
      desc: t('accountGetStarted.loginSecurity.description'),
      path: '/account/security/security-log',
    },
    {
      icon: FileText,
      title: t('accountGetStarted.billingPayments.title'),
      desc: t('accountGetStarted.billingPayments.description'),
      path: 'account/billing/basic',
    },
    {
      icon: Bell,
      title: t('accountGetStarted.notifications.title'),
      desc: t('accountGetStarted.notifications.description'),
      path: '/account/notifications',
    },
    {
      icon: Boxes,
      title: t('accountGetStarted.integrations.title'),
      desc: t('accountGetStarted.integrations.description'),
      path: '/account/integrations',
    },
    {
      icon: Users,
      title: t('accountGetStarted.membersTeamsRoles.title'),
      desc: t('accountGetStarted.membersTeamsRoles.description'),
      path: '/account/members/roles',
    },
    {
      icon: KeySquare,
      title: t('accountGetStarted.apiKeys.title'),
      desc: t('accountGetStarted.apiKeys.description'),
      path: '/account/api-keys',
    },
    {
      icon: MousePointerSquareDashed,
      title: t('accountGetStarted.appearance.title'),
      desc: t('accountGetStarted.appearance.description'),
      path: '/account/appearance',
    },
    {
      icon: MonitorSmartphone,
      title: t('accountGetStarted.devices.title'),
      desc: t('accountGetStarted.devices.description'),
      path: '#',
    },
    {
      icon: Palette,
      title: t('accountGetStarted.brand.title'),
      desc: t('accountGetStarted.brand.description'),
      path: '/account/invite-a-friend',
    },
    {
      icon: LineChart,
      title: t('accountGetStarted.activity.title'),
      desc: t('accountGetStarted.activity.description'),
      path: '/account/activity',
    },
  ];

  return (
    <Fragment>
      <Options items={items} dropdown={true} />
      <div className="flex grow justify-center pt-5 lg:pt-7.5">
        <Button mode="link" underlined="dashed" asChild>
          <Link href="/account/members/team-info">{t('accountGetStarted.moreAccountOptions')}</Link>
        </Button>
      </div>
    </Fragment>
  );
}
