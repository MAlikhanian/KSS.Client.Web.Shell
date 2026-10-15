'use client';

import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { navItemsForPathPrefix } from '@/lib/menu-nav-utils';

const PageMenu = () => {
  const accountMenuConfig = navItemsForPathPrefix(MENU_SIDEBAR, '/public-profile/');

  if (accountMenuConfig) {
    return <NavbarMenu items={accountMenuConfig} />;
  } else {
    return <></>;
  }
};

export { PageMenu };
