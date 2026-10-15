'use client';

import {
  ScrollspyMenu,
  ScrollspyMenuItems,
} from '@/partials/navbar/scrollspy-menu';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountSettingsSidebar() {
  const { t } = useTranslation('account-home');
  
  const items: ScrollspyMenuItems = [
    {
      title: t('accountSettingsSidebar.menu.basicSettings'),
      target: 'basic_settings',
      active: true,
    },
    {
      title: t('accountSettingsSidebar.menu.authentication'),
      children: [
        {
          title: t('accountSettingsSidebar.menu.email'),
          target: 'auth_email',
          active: false,
        },
        {
          title: t('accountSettingsSidebar.menu.password'),
          target: 'auth_password',
        },
        {
          title: t('accountSettingsSidebar.menu.socialSignIn'),
          target: 'auth_social_sign_in',
        },
        {
          title: t('accountSettingsSidebar.menu.singleSignOn'),
          target: 'auth_social_sign_in_sso',
        },
        {
          title: t('accountSettingsSidebar.menu.twoFactorAuth'),
          target: 'auth_two_factor',
        },
      ],
    },
    {
      title: t('accountSettingsSidebar.menu.advancedSettings'),
      children: [
        {
          title: t('accountSettingsSidebar.menu.preferences'),
          target: 'advanced_settings_preferences',
        },
        {
          title: t('accountSettingsSidebar.menu.appearance'),
          target: 'advanced_settings_appearance',
        },
        {
          title: t('accountSettingsSidebar.menu.notifications'),
          target: 'advanced_settings_notifications',
        },
        {
          title: t('accountSettingsSidebar.menu.address'),
          target: 'advanced_settings_address',
        },
      ],
    },
    {
      title: t('accountSettingsSidebar.menu.externalServices'),
      children: [
        {
          title: t('accountSettingsSidebar.menu.manageApi'),
          target: 'external_services_manage_api',
        },
        {
          title: t('accountSettingsSidebar.menu.integrations'),
          target: 'external_services_integrations',
        },
      ],
    },
    {
      title: t('accountSettingsSidebar.menu.deleteAccount'),
      target: 'delete_account',
    },
  ];

  return <ScrollspyMenu items={items} />;
}
