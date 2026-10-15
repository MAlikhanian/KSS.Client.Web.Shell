'use client';

import { Fragment, useState } from 'react';
import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IPlanPrice {
  regular: string;
  annual?: string;
}

interface IPlanInfo {
  title: string;
  description: string;
  free?: boolean;
  price?: IPlanPrice;
}

interface IFeaturePlans {
  basic: string | boolean;
  pro: string | boolean;
  premium: string | boolean;
  enterprise: string | boolean;
}

interface IFeature {
  title: string;
  plans: IFeaturePlans;
}

interface IPlansInfo {
  basic: IPlanInfo;
  pro: IPlanInfo;
  premium: IPlanInfo;
  enterprise: IPlanInfo;
}

interface IPlansItem {
  title: string;
  plans: IFeaturePlans;
}

interface IPlansItems {
  info: IPlansInfo;
  features: IFeature[];
}

const Plans = () => {
  const { t } = useTranslation('account-billing');
  const [isAnnual, setIsAnnual] = useState(true);

  const handleToggleBilling = () => {
    setIsAnnual(!isAnnual);
  };

  const plans: IPlansItems = {
    info: {
      basic: {
        title: t('accountBillingPlans.plans.basic.title'),
        description: t('accountBillingPlans.plans.basic.description'),
        free: true,
      },
      pro: {
        title: t('accountBillingPlans.plans.pro.title'),
        description: t('accountBillingPlans.plans.pro.description'),
        price: {
          regular: '$99',
          annual: '$79',
        },
      },
      premium: {
        title: t('accountBillingPlans.plans.premium.title'),
        description: t('accountBillingPlans.plans.premium.description'),
        price: {
          regular: '$199',
          annual: '$179',
        },
      },
      enterprise: {
        title: t('accountBillingPlans.plans.enterprise.title'),
        description: t('accountBillingPlans.plans.enterprise.description'),
        price: {
          regular: '$1,299',
          annual: '$1,079',
        },
      },
    },
    features: [
      {
        title: t('accountBillingPlans.features.userAccounts.title'),
        plans: {
          basic: t('accountBillingPlans.features.userAccounts.basic'),
          pro: t('accountBillingPlans.features.userAccounts.pro'),
          premium: t('accountBillingPlans.features.userAccounts.premium'),
          enterprise: t('accountBillingPlans.features.userAccounts.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.dataStorage.title'),
        plans: {
          basic: t('accountBillingPlans.features.dataStorage.basic'),
          pro: t('accountBillingPlans.features.dataStorage.pro'),
          premium: t('accountBillingPlans.features.dataStorage.premium'),
          enterprise: t('accountBillingPlans.features.dataStorage.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.capiCalls.title'),
        plans: {
          basic: t('accountBillingPlans.features.capiCalls.basic'),
          pro: t('accountBillingPlans.features.capiCalls.pro'),
          premium: t('accountBillingPlans.features.capiCalls.premium'),
          enterprise: t('accountBillingPlans.features.capiCalls.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.support.title'),
        plans: {
          basic: t('accountBillingPlans.features.support.basic'),
          pro: t('accountBillingPlans.features.support.pro'),
          premium: t('accountBillingPlans.features.support.premium'),
          enterprise: t('accountBillingPlans.features.support.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.dataBackup.title'),
        plans: {
          basic: t('accountBillingPlans.features.dataBackup.basic'),
          pro: t('accountBillingPlans.features.dataBackup.pro'),
          premium: t('accountBillingPlans.features.dataBackup.premium'),
          enterprise: t('accountBillingPlans.features.dataBackup.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.analyticsTools.title'),
        plans: {
          basic: t('accountBillingPlans.features.analyticsTools.basic'),
          pro: t('accountBillingPlans.features.analyticsTools.pro'),
          premium: t('accountBillingPlans.features.analyticsTools.premium'),
          enterprise: t('accountBillingPlans.features.analyticsTools.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.integrationOptions.title'),
        plans: {
          basic: t('accountBillingPlans.features.integrationOptions.basic'),
          pro: t('accountBillingPlans.features.integrationOptions.pro'),
          premium: t('accountBillingPlans.features.integrationOptions.premium'),
          enterprise: t('accountBillingPlans.features.integrationOptions.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.uptimeGuarantee.title'),
        plans: {
          basic: t('accountBillingPlans.features.uptimeGuarantee.basic'),
          pro: t('accountBillingPlans.features.uptimeGuarantee.pro'),
          premium: t('accountBillingPlans.features.uptimeGuarantee.premium'),
          enterprise: t('accountBillingPlans.features.uptimeGuarantee.enterprise'),
        },
      },
      {
        title: t('accountBillingPlans.features.customReports.title'),
        plans: {
          basic: false,
          pro: true,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: t('accountBillingPlans.features.mobileAccess.title'),
        plans: {
          basic: false,
          pro: false,
          premium: true,
          enterprise: true,
        },
      },
      {
        title: t('accountBillingPlans.features.customBranding.title'),
        plans: {
          basic: false,
          pro: false,
          premium: false,
          enterprise: true,
        },
      },
    ],
  };

  const renderPlanInfo = (type: string, info: IPlanInfo) => (
    <Fragment>
      <h3 className="text-lg text-mono font-medium pb-2">{info.title}</h3>
      <div className="text-secondary-foreground text-sm">
        {info.description}
      </div>
      <div className="py-4">
        {info.free ? (
          <h4 className="text-2xl text-mono font-semibold leading-none">
            {t('accountBillingPlans.free')}
          </h4>
        ) : (
          <div className="flex items-end gap-1.5" data-plan-type={type}>
            <div
              className="text-2xl text-mono font-semibold leading-none"
              data-plan-price-regular={info.price?.regular}
              data-plan-price-annual={info.price?.annual}
            >
              {isAnnual ? info.price?.regular : info.price?.annual}
            </div>
            <div className="text-secondary-foreground text-xs">
              {isAnnual ? t('accountBillingPlans.perMonth') : t('accountBillingPlans.perYear')}
            </div>
          </div>
        )}
      </div>
      <div>
        <Button
          variant={info.free ? 'outline' : 'primary'}
          className="w-full justify-center"
        >
          {info.free ? t('accountBillingPlans.switchToTeam') : t('accountBillingPlans.upgrade')}
        </Button>
      </div>
    </Fragment>
  );

  const renderFeatureDetail = (detail: string | boolean) => {
    if (typeof detail === 'boolean') {
      return detail ? <Check className="text-green-500 text-lg" /> : null;
    }
    return <div className="text-foreground text-sm">{detail}</div>;
  };

  const renderItem = (feature: IPlansItem, index: number) => {
    return (
      <TableRow key={index} className="*:border-border hover:bg-transparent">
        <TableCell className="border-s border-b px-5! py-3.5!">
          <div className="text-mono text-sm leading-none font-medium">
            {feature.title}
          </div>
        </TableCell>
        <TableCell className="bg-muted/40 border-b border-s px-5! py-3.5!">
          <div className="text-mono text-sm">
            {renderFeatureDetail(feature.plans.basic)}
          </div>
        </TableCell>
        <TableCell className="border-b border-s px-5! py-3.5!">
          {renderFeatureDetail(feature.plans.pro)}
        </TableCell>
        <TableCell className="border-b border-s px-5! py-3.5!">
          {renderFeatureDetail(feature.plans.premium)}
        </TableCell>
        <TableCell className="border-b border-s border-e px-5! py-3.5!">
          {renderFeatureDetail(feature.plans.enterprise)}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Table
      className="table-fixed border-separate border-spacing-0 mt-3 min-w-[1000px] rounded-xl 
      rtl:[&_tr:nth-of-type(12)>td:last-child]:rounded-bl-xl 
      [&_tr:nth-of-type(2)>td]:border-t 
      ltr:[&_tr:nth-of-type(12)>td:last-child]:rounded-br-xl 
      ltr:[&_tr:nth-of-type(12)>td:first-child]:rounded-bl-xl 
      rtl:[&_tr:nth-of-type(12)>td:first-child]:rounded-br-xl 
      ltr:[&_tr:nth-of-type(2)>td:first-child]:rounded-tl-xl
      rtl:[&_tr:nth-of-type(2)>td:first-child]:rounded-tr-xl"
    >
      <TableBody>
        <TableRow className="*:border-border [&:has(td):hover]:bg-transparent">
          <TableCell className="border-b-0! align-bottom p-5! pt-7.5! pb-6!">
            <div className="flex items-center space-x-2">
              <Switch
                size="sm"
                defaultChecked={isAnnual}
                onCheckedChange={handleToggleBilling}
              />
              <Label className="text-sm">{t('accountBillingPlans.annualBilling')}</Label>
            </div>
          </TableCell>
          <TableCell className="relative! border-b-0! border-t ltr:border-l rtl:border-s ltr:rounded-tl-xl rtl:rounded-tr-xl bg-muted/40 dark:bg-coal-100 p-5! pt-7.5!">
            <Badge
              variant="success"
              appearance="light"
              className="absolute top-0 start-1/2 rtl:translate-x-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              {t('accountBillingPlans.currentPlan')}
            </Badge>
            {renderPlanInfo('basic', plans.info.basic)}
          </TableCell>
          <TableCell className="border-b-0! border-t ltr:border-l rtl:border-s p-5! pt-7.5!">
            {renderPlanInfo('pro', plans.info.pro)}
          </TableCell>
          <TableCell className="border-b-0! border-t ltr:border-l rtl:border-s p-5! pt-7.5!">
            {renderPlanInfo('premium', plans.info.premium)}
          </TableCell>
          <TableCell className="border-b-0! border-t ltr:border-l rtl:border-s ltr:rounded-tr-xl rtl:rounded-tl-xl border-e p-5! pt-7.5!">
            {renderPlanInfo('enterprise', plans.info.enterprise)}
          </TableCell>
        </TableRow>
        {plans.features.map((feature: IPlansItem, index: number) =>
          renderItem(feature, index),
        )}
      </TableBody>
    </Table>
  );
};

export { Plans, type IPlansItem, type IPlansItems };
