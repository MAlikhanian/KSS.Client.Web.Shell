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
import { AccountTeamMembersContent } from '@/app/(protected)/account/members/team-members/content';
import { PageNavbar } from '@/app/(protected)/account/page-navbar';
import { useTranslation } from '@/hooks/useTranslation';

export default function AccountTeamMembersPage() {
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
                {t('accountMembersTeamMembers.toolbar.description')}
              </ToolbarDescription>
            </ToolbarHeading>
            <ToolbarActions>
              <Button variant="outline">
                <Link href="#">{t('accountMembersTeamMembers.toolbar.importMembers')}</Link>
              </Button>
              <Button>
                <Link href="#">{t('accountMembersTeamMembers.toolbar.addMember')}</Link>
              </Button>
            </ToolbarActions>
          </Toolbar>
        </Container>
      )}
      <Container>
        <AccountTeamMembersContent />
      </Container>
    </Fragment>
  );
}
