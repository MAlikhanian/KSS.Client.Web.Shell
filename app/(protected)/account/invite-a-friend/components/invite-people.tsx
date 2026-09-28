'use client';

import { useState } from 'react';
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
  const { t } = useTranslation('account-invite-a-friend');
  const [invitepeopleInput, setInvitePeopleInput] = useState('jason@studio.io');
  return (
    <Card>
      <CardHeader id="webhooks">
        <CardTitle>{t('accountInviteAFriend.invitePeople.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-5">
        <div className="flex items-center flex-wrap lg:flex-nowrap gap-2.5">
          <Label className="flex w-full max-w-32">{t('accountInviteAFriend.invitePeople.email')}</Label>
          <div className="grow min-w-48">
            <Input
              className="w-full"
              type="text"
              value={invitepeopleInput}
              onChange={(e) => setInvitePeopleInput(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-baseline flex-wrap gap-2.5">
          <Label className="flex w-full max-w-32">{t('accountInviteAFriend.invitePeople.role')}</Label>
          <div className="grid gap-5 grow items-start">
            <Select defaultValue="1">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('accountInviteAFriend.invitePeople.select')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">{t('accountInviteAFriend.invitePeople.member')}</SelectItem>
                <SelectItem value="2">{t('accountInviteAFriend.invitePeople.option2')}</SelectItem>
                <SelectItem value="3">{t('accountInviteAFriend.invitePeople.option3')}</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Button variant="outline">
                <SquarePlus size={16} /> {t('accountInviteAFriend.invitePeople.addMore')}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button>{t('accountInviteAFriend.invitePeople.invitePeople')}</Button>
      </CardFooter>
    </Card>
  );
};

export { InvitePeople };
