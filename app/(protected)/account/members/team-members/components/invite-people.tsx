'use client';

import { useState } from 'react';
import Link from 'next/link';
import { SquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslation } from '@/hooks/useTranslation';

const InvitePeople = () => {
  const { t } = useTranslation('account-members');
  const [emailInput, setEmailInput] = useState('jason@studio.io');
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountMembersTeamMembers.invitePeople.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-baseline flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-32">{t('accountMembersTeamMembers.invitePeople.email')}</Label>
          <Input
            type="text"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        <div className="flex items-baseline flex-wrap gap-2.5">
          <Label className="flex w-full max-w-32">{t('accountMembersTeamMembers.invitePeople.role')}</Label>
          <div className="flex flex-col items-start grow gap-5">
            <Select defaultValue="1">
              <SelectTrigger>
                <SelectValue placeholder={t('accountMembersTeamMembers.invitePeople.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('accountMembersTeamMembers.invitePeople.member')}</SelectItem>
                <SelectItem value="2">{t('accountMembersTeamMembers.invitePeople.editor')}</SelectItem>
                <SelectItem value="3">{t('accountMembersTeamMembers.invitePeople.designer')}</SelectItem>
                <SelectItem value="4">{t('accountMembersTeamMembers.invitePeople.admin')}</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <SquarePlus size={12} />
              {t('accountMembersTeamMembers.invitePeople.addMore')}
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button>
          <Link href="#">{t('accountMembersTeamMembers.invitePeople.invitePeople')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { InvitePeople };
