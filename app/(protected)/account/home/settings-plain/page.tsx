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
import { AccountSettingsPlainContent } from '@/app/(protected)/account/home/settings-plain/content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountSettingsPlainPage() {
  const { settings } = useSettings();
  const { t } = useTranslation('account-home');

  return (
    <Fragment>
      <PageNavbar />
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading>
              <ToolbarPageTitle />
              <ToolbarDescription>
                {t('accountSettingsPlain.toolbar.description')}
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link href="#">{t('accountSettingsPlain.toolbar.publicProfile')}</Link>
              </Button>
              <Button>
                <Link href="#">{t('accountSettingsPlain.toolbar.getStarted')}</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountSettingsPlainContent />
      </Container>
    </Fragment>
  );
}
