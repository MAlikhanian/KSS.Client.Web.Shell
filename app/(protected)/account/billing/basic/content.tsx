'use client';

import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { BadgePercent, Package2, ReceiptText } from 'lucide-react';
import { Details, Invoicing, PaymentMethods, Plan } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountBasicContent() {
  const { t } = useTranslation('account-billing');
  
  const posts: HighlightedPostsItems = [
    {
      icon: BadgePercent,
      title: t('accountBillingBasic.highlightedPosts.planSelection.title'),
      summary: t('accountBillingBasic.highlightedPosts.planSelection.summary'),
      path: '#',
    },
    {
      icon: Package2,
      title: t('accountBillingBasic.highlightedPosts.customizedPlans.title'),
      summary: t('accountBillingBasic.highlightedPosts.customizedPlans.summary'),
      path: '#',
    },
    {
      icon: ReceiptText,
      title: t('accountBillingBasic.highlightedPosts.comprehensivePlans.title'),
      summary: t('accountBillingBasic.highlightedPosts.comprehensivePlans.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Plan />
          <PaymentMethods />
          <Details />
          <Invoicing />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
