'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input, InputWrapper } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/hooks/useTranslation';

const InviteWithLink = () => {
  const { t } = useTranslation('account-members');
  const [linkInput, setLinkInput] = useState(
    'https://www.ktstudio.com/RSVP?c=12345XYZt',
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountMembersTeamMembers.inviteWithLink.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-32">{t('accountMembersTeamMembers.inviteWithLink.link')}</Label>
          <div className="flex flex-col items-start grow gap-5">
            <InputWrapper>
              <Input
                type="text"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
              />
              <Button variant="dim" mode="icon" className="-me-2">
                <Copy size={16} />
              </Button>
            </InputWrapper>
            <Button variant="outline">
              <RefreshCw size={12} />
              {t('accountMembersTeamMembers.inviteWithLink.resetLink')}
            </Button>
          </div>
        </div>
        <p className="text-foreground text-sm">
          {t('accountMembersTeamMembers.inviteWithLink.description')}
        </p>
      </CardContent>
      <CardFooter className="justify-center">
        <Button>
          <Link href="#">{t('accountMembersTeamMembers.inviteWithLink.invitePeople')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { InviteWithLink };
