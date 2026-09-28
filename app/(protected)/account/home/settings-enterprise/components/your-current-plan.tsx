'use client';

import Link from 'next/link';
import { DropdownMenu3 } from '@/partials/dropdown-menu/dropdown-menu-3';
import { EllipsisVertical } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

interface IYourCurrentPlanItem {
  title: string;
  summary: string;
  link: string;
  path: string;
}
type IYourCurrentPlanItems = Array<IYourCurrentPlanItem>;

const YourCurrentPlan = () => {
  const { t } = useTranslation('account-home');
  
  const items: IYourCurrentPlanItems = [
    {
      title: t('accountSettingsEnterprise.yourCurrentPlan.items.devOpsIntegration.title'),
      summary: t('accountSettingsEnterprise.yourCurrentPlan.items.devOpsIntegration.summary'),
      link: t('accountSettingsEnterprise.yourCurrentPlan.items.devOpsIntegration.link'),
      path: '#',
    },
    {
      title: t('accountSettingsEnterprise.yourCurrentPlan.items.dataEncryption.title'),
      summary: t('accountSettingsEnterprise.yourCurrentPlan.items.dataEncryption.summary'),
      link: t('accountSettingsEnterprise.yourCurrentPlan.items.dataEncryption.link'),
      path: '#',
    },
    {
      title: t('accountSettingsEnterprise.yourCurrentPlan.items.apiIntegration.title'),
      summary: t('accountSettingsEnterprise.yourCurrentPlan.items.apiIntegration.summary'),
      link: t('accountSettingsEnterprise.yourCurrentPlan.items.apiIntegration.link'),
      path: '#',
    },
  ];

  const renderItem = (item: IYourCurrentPlanItem, index: number) => {
    return (
      <div key={index} className="flex flex-col items-start gap-2.5">
        <Link
          href={item.path}
          className="text-base text-mono font-medium hover:text-primary"
        >
          {item.title}
        </Link>
        <p className="text-sm text-secondary-foreground">{item.summary}</p>
        <Button mode="link" underlined="dashed" asChild>
          <Link href={item.path}>{item.link}</Link>
        </Button>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="gap-2" id="settings_auth_two_factor">
        <CardTitle>{t('accountSettingsEnterprise.yourCurrentPlan.title')}</CardTitle>
        <DropdownMenu3
          trigger={
            <Button variant="ghost" mode="icon">
              <EllipsisVertical />
            </Button>
          }
        />
      </CardHeader>
      <CardContent className="lg:py-7.5">
        <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row lg:gap-7.5 gap-5">
          <div className="md:flex-1 grid content-between border border-border rounded-xl">
            <div
              className="bg-cover bg-no-repeat rounded-t-lg h-48"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(`/media/images/600x600/22.jpg`)})`,
              }}
            ></div>
            <div className="flex flex-col gap-2 p-5 pt-4">
              <Link
                href="#"
                className="text-base text-mono font-medium hover:text-primary"
              >
                {t('accountSettingsEnterprise.yourCurrentPlan.premiumPlan.title')}
              </Link>
              <p className="text-sm text-secondary-foreground mb-2">
                {t('accountSettingsEnterprise.yourCurrentPlan.premiumPlan.description')}
              </p>
              <div>
                <Button variant="outline">{t('accountSettingsEnterprise.yourCurrentPlan.premiumPlan.changePlan')}</Button>
              </div>
            </div>
          </div>
          <div className="md:flex-1">
            <div className="flex flex-col lg:gap-7.5 gap-5">
              {items.map((item, index) => {
                return renderItem(item, index);
              })}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed" asChild>
          <Link href="#">{t('accountSettingsEnterprise.yourCurrentPlan.goToBilling')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export {
  YourCurrentPlan,
  type IYourCurrentPlanItem,
  type IYourCurrentPlanItems,
};
