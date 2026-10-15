'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from '@/partials/common/toolbar';
import { useSettings } from '@/providers/settings-provider';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { AccountSecurityGetStartedContent } from '@/app/(protected)/account/security/get-started/content';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountSecurityGetStartedPage() {
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-secondary-foreground">
                    {t('accountSecurityGetStarted.toolbar.issuesNeedAttention', { count: 19 })}
                  </span>
                  <span className="size-0.75 bg-mono/50 rounded-full"></span>
                  <Button mode="link" underlined="dashed" asChild>
                    <Link href="/account/security/security-log">
                      {t('accountSecurityGetStarted.toolbar.securityLog')}
                    </Link>
                  </Button>
                </div>
              </ToolbarDescription>
            </ToolbarHeading>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountSecurityGetStartedContent />
      </Container>
    </Fragment>
  );
}
