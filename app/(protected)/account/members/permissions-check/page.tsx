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
import { AccountPermissionsCheckContent } from '@/app/(protected)/account/members/permissions-check/content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountPermissionsCheckPage() {
  const { settings } = useSettings();
  const { t } = useTranslation('account-members');

  return (
    <Fragment>
      <PageNavbar />
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                {t('accountMembersPermissionsCheck.toolbar.description')}
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link href="#">{t('accountMembersPermissionsCheck.toolbar.viewRoles')}</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountPermissionsCheckContent />
      </Container>
    </Fragment>
  );
}
