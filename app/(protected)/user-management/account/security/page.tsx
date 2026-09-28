'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { comingSoonToast } from '@/components/common/coming-soon-toast';
import { useAccount } from '../components/account-context';
import { useTranslation } from '@/hooks/useTranslation';

export default function Page() {
  const { t } = useTranslation('user-management');
  const { user } = useAccount();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t('account.security.email.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription>
            {t('account.security.email.description')}
          </CardDescription>

          <div className="flex items-center gap-2.5 rounded-lg bg-accent/60 p-4 text-sm">
            <span className="font-medium">{user.email}</span>{' '}
            {user.emailVerifiedAt && (
              <Badge variant="success" appearance="light">
                {t('account.security.email.verified')}
              </Badge>
            )}
          </div>

          <Button variant="outline" onClick={() => comingSoonToast()}>
            {t('account.security.email.changeEmail')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('account.security.password.title')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription>
            {t('account.security.password.description')}
          </CardDescription>

          <Button variant="outline" onClick={() => comingSoonToast()}>
            {t('account.security.password.changePassword')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-destructive">
            {t('account.security.deleteAccount.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <CardDescription>
            {t('account.security.deleteAccount.description')}
          </CardDescription>

          <Button variant="destructive" onClick={() => comingSoonToast()}>
            {t('account.security.deleteAccount.deleteAccount')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
