'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';

interface IImportItem {
  label: string;
  description: string;
  checked: boolean;
}
type IImportItems = Array<IImportItem>;

const Import = () => {
  const { t } = useTranslation('account-members');
  const [customInput, setCustomInput] = useState(t('accountMembersImportMembers.import.welcomeMessagePlaceholder'));
  const options: IImportItems = [
    {
      label: t('accountMembersImportMembers.import.options.createNewUsers.label'),
      description: t('accountMembersImportMembers.import.options.createNewUsers.description'),
      checked: true,
    },
    {
      label: t('accountMembersImportMembers.import.options.updateExistingUsers.label'),
      description: t('accountMembersImportMembers.import.options.updateExistingUsers.description'),
      checked: false,
    },
    {
      label: t('accountMembersImportMembers.import.options.sendEmailNotification.label'),
      description: t('accountMembersImportMembers.import.options.sendEmailNotification.description'),
      checked: true,
    },
    {
      label: t('accountMembersImportMembers.import.options.includeExternalIds.label'),
      description: t('accountMembersImportMembers.import.options.includeExternalIds.description'),
      checked: false,
    },
  ];

  const renderItem = (option: IImportItem, index: number) => {
    return (
      <div key={index} className="flex flex-col gap-2.5">
        <div className="flex items-center space-x-2">
          <Checkbox value={option.label} defaultChecked={option.checked} />
          <Label className="text-foreground font-medium">{option.label}</Label>
        </div>
        <p className="form-info leading-5 text-foreground font-normal">
          {option.description}
        </p>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountMembersImportMembers.import.title')}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-7.5 py-5 lg:py-7.5">
        {options.map((option, index) => {
          return renderItem(option, index);
        })}
        <div className="flex flex-col gap-2.5">
          <div className="flex gap-2.5">
            <Button>{t('accountMembersImportMembers.import.selectCsvFile')}</Button>
            <Button variant="ghost">{t('accountMembersImportMembers.import.chooseFile')}</Button>
          </div>
          <p className="text-secondary-foreground text-sm">
            {t('accountMembersImportMembers.import.fileDescription')}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-mono text-sm font-medium">
            {t('accountMembersImportMembers.import.customWelcomeMessage')}
          </div>
          <Textarea
            placeholder={t('accountMembersImportMembers.import.welcomeMessagePlaceholder')}
            className="text-sm text-secondary-foreground font-normal"
            rows={5}
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
          />
          <div className="flex items-center space-x-2">
            <Checkbox />
            <Label className="text-foreground text-sm font-medium">
              {t('accountMembersImportMembers.import.sendWelcomeEmail')}
            </Label>
          </div>
        </div>
        <div className="text-foreground text-sm">
          <span className="text-destructive uppercase">{t('accountMembersImportMembers.import.warning')}: </span>
          {t('accountMembersImportMembers.import.warningMessage')}
        </div>
      </CardContent>
      <CardFooter className="justify-center py-3.5">
        <Button>
          <Link href="#">{t('accountMembersImportMembers.import.importMember')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { Import, type IImportItem, type IImportItems };
