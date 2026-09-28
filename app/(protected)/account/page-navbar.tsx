'use client';

import { Navbar } from '@/partials/navbar/navbar';
import { NavbarMenu } from '@/partials/navbar/navbar-menu';
import { MENU_SIDEBAR } from '@/config/menu.config';
import { useSettings } from '@/providers/settings-provider';
import { Container } from '@/components/common/container';
import { navItemsForPathPrefix } from '@/lib/menu-nav-utils';

const PageNavbar = () => {
  const { settings } = useSettings();
  const accountMenuConfig = navItemsForPathPrefix(MENU_SIDEBAR, '/account/');

  if (accountMenuConfig && settings?.layout === 'demo1') {
    return (
      <Navbar>
        <Container>
          <NavbarMenu items={accountMenuConfig} />
        </Container>
      </Navbar>
    );
  } else {
    return <></>;
  }
};

export { PageNavbar };
