'use client';

import { useId } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useTranslation } from '@/hooks/useTranslation';

interface IReportSettingsItem {
  title: string;
  description: string;
  checked: boolean;
}
type IReportSettingsItems = Array<IReportSettingsItem>;

interface IReportSettingsProps {
  limit?: number;
  className?: string;
}

const ReportSettings = ({ limit, className }: IReportSettingsProps) => {
  const { t } = useTranslation('account-security');
  const id1 = useId();

  const items: IReportSettingsItems = [
    {
      title: t('accountSecurityPrivacySettings.reportSettings.onlyInvitedPeople.title'),
      description: t('accountSecurityPrivacySettings.reportSettings.onlyInvitedPeople.description'),
      checked: true,
    },
    {
      title: t('accountSecurityPrivacySettings.reportSettings.peopleWithLink.title'),
      description: t('accountSecurityPrivacySettings.reportSettings.peopleWithLink.description'),
      checked: false,
    },
    {
      title: t('accountSecurityPrivacySettings.reportSettings.everyone.title'),
      description: t('accountSecurityPrivacySettings.reportSettings.everyone.description'),
      checked: false,
    },
    {
      title: t('accountSecurityPrivacySettings.reportSettings.noOne.title'),
      description: t('accountSecurityPrivacySettings.reportSettings.noOne.description'),
      checked: false,
    },
  ];

  const renderItem = (item: IReportSettingsItem, index: number) => {
    return (
      <CardContent key={index} className="border-b border-border">
        <RadioGroup
          defaultValue="intermediate"
          className="flex items-center justify-between gap-2.5"
        >
          <div className="flex items-center w-full justify-between space-x-2">
            <Label
              htmlFor={id1}
              variant="secondary"
              className="flex flex-col justify-center gap-1.5"
            >
              <span className="leading-none font-medium text-sm text-mono">
                {item.title}
              </span>
              <span className="text-sm text-secondary-foreground">
                {item.description}
              </span>
            </Label>
            <RadioGroupItem id={id1} value="beginner" checked={item.checked} />
          </div>
        </RadioGroup>
      </CardContent>
    );
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{t('accountSecurityPrivacySettings.reportSettings.title')}</CardTitle>
      </CardHeader>
      {items.map((item, index) => {
        if (limit === undefined || index < limit) {
          return renderItem(item, index);
        }
        return null;
      })}
    </Card>
  );
};

export {
  ReportSettings,
  type IReportSettingsItem,
  type IReportSettingsItems,
  type IReportSettingsProps,
};
