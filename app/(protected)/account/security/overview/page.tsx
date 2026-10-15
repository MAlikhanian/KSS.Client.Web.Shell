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
import { AccountOverviewContent } from '@/app/(protected)/account/security/overview/content';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountOverviewPage() {
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
                {t('accountSecurityOverview.toolbar.description')}
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link href="/account/security/overview">{t('accountSecurityOverview.toolbar.securityHistory')}</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountOverviewContent />
      </Container>
    </Fragment>
  );
}
