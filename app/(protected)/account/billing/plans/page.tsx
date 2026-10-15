'use client';

import { Fragment } from 'react';
import {
  Toolbar,
  ToolbarActions,
  ToolbarHeading,
} from '@/layouts/demo1/components/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { AccountPlansContent } from '@/app/(protected)/account/billing/plans/content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountPlansPage() {
  const { settings } = useSettings();
  const { t } = useTranslation('account-billing');

  return (
    <Fragment>
      <PageNavbar />
      {settings?.layout === 'demo1' && (
        <Container>
          <Toolbar>
            <ToolbarHeading
              title={t('accountBillingPlans.toolbar.title')}
              description={t('accountBillingPlans.toolbar.description')}
            />
            <ToolbarActions>
              <Button variant="outline">{t('accountBillingPlans.toolbar.viewBilling')}</Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountPlansContent />
      </Container>
    </Fragment>
  );
}
