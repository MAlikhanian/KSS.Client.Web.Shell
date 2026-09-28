'use client';

import {
  CloudCog,
  KeySquare,
  LayoutDashboard,
  MapPin,
  MonitorSmartphone,
  Settings,
  ShieldOff,
} from 'lucide-react';
import {
  IOptionsItems,
  Options,
} from '@/app/(protected)/account/home/get-started/components/options';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountSecurityGetStartedContent() {
  const { t } = useTranslation('account-security');
  
  const items: IOptionsItems = [
    {
      icon: LayoutDashboard,
      title: t('accountSecurityGetStarted.options.overview.title'),
      desc: t('accountSecurityGetStarted.options.overview.desc'),
      path: '/account/security/overview',
    },
    {
      icon: MapPin,
      title: t('accountSecurityGetStarted.options.allowedIpAddresses.title'),
      desc: t('accountSecurityGetStarted.options.allowedIpAddresses.desc'),
      path: '/account/security/allowed-ip-addresses',
    },
    {
      icon: Settings,
      title: t('accountSecurityGetStarted.options.privacySettings.title'),
      desc: t('accountSecurityGetStarted.options.privacySettings.desc'),
      path: '/account/security/privacy-settings',
    },
    {
      icon: MonitorSmartphone,
      title: t('accountSecurityGetStarted.options.trustedDevices.title'),
      desc: t('accountSecurityGetStarted.options.trustedDevices.desc'),
      path: '/account/security/device-management',
    },
    {
      icon: CloudCog,
      title: t('accountSecurityGetStarted.options.backupRecovery.title'),
      desc: t('accountSecurityGetStarted.options.backupRecovery.desc'),
      path: '/account/security/backup-and-recovery',
    },
    {
      icon: KeySquare,
      title: t('accountSecurityGetStarted.options.loginSessions.title'),
      desc: t('accountSecurityGetStarted.options.loginSessions.desc'),
      path: '/account/security/current-sessions',
    },
    {
      icon: ShieldOff,
      title: t('accountSecurityGetStarted.options.securityLog.title'),
      desc: t('accountSecurityGetStarted.options.securityLog.desc'),
      path: '/account/security/security-log',
    },
  ];

  return <Options items={items} dropdown={false} />;
}
