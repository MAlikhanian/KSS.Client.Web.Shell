'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { AccountAllowedIPAddressesContent } from '@/app/(protected)/account/security/allowed-ip-addresses/content';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountAllowedIPAddressesPage() {
  const { settings } = useSettings();
  const { t } = useTranslation('account-security');

  return (
    <Fragment>
      <PageNavbar />
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                {t('accountSecurityAllowedIpAddresses.toolbar.description')}
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link href="#">{t('accountSecurityAllowedIpAddresses.toolbar.securityOverview')}</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountAllowedIPAddressesContent />
      </Container>
    </Fragment>
  );
}
