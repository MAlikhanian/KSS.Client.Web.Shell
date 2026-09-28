'use client';

import { Fragment } from 'react';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { ShieldCheck, ShieldOff, ShieldQuestion } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { FeaturesHighlight } from '@/app/(protected)/public-profile/profiles/creator/components/features-highlight';
import {
  Authentification,
  GeneralSettings,
  LoginSessions,
  ProductInsight,
  QuickSettings,
  TrustedDevices,
} from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountOverviewContent() {
  const { t } = useTranslation('account-security');
  
  const posts: HighlightedPostsItems = [
    {
      icon: ShieldOff,
      title: t('accountSecurityOverview.highlightedPosts.enhancingSecurityKnowledge.title'),
      summary: t('accountSecurityOverview.highlightedPosts.enhancingSecurityKnowledge.summary'),
      path: '#',
    },
    {
      icon: ShieldCheck,
      title: t('accountSecurityOverview.highlightedPosts.masteringSecurityProtocols.title'),
      summary: t('accountSecurityOverview.highlightedPosts.masteringSecurityProtocols.summary'),
      path: '#',
    },
    {
      icon: ShieldQuestion,
      title: t('accountSecurityOverview.highlightedPosts.navigatingDigitalSecurity.title'),
      summary: t('accountSecurityOverview.highlightedPosts.navigatingDigitalSecurity.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <FeaturesHighlight
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl('/media/illustrations/5.svg')}
                  className="dark:hidden max-h-36"
                  alt="image"
                />
                <img
                  src={toAbsoluteUrl('/media/illustrations/5-dark.svg')}
                  className="light:hidden max-h-36"
                  alt="image"
                />
              </Fragment>
            }
            title={<>{t('accountSecurityOverview.featuresHighlight.title')}</>}
            description={t('accountSecurityOverview.featuresHighlight.description')}
            more={{ title: t('accountSecurityOverview.featuresHighlight.reviewSecurityTips'), url: '#' }}
            features={[
              [t('accountSecurityOverview.featuresHighlight.features.strongPasswords'), t('accountSecurityOverview.featuresHighlight.features.twoFactorAuthentication')],
              [t('accountSecurityOverview.featuresHighlight.features.budgetFriendly'), t('accountSecurityOverview.featuresHighlight.features.freshLook')],
            ]}
          />
          <GeneralSettings />
          <Authentification />
          <QuickSettings />
          <LoginSessions />
          <TrustedDevices />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <ProductInsight
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl('/media/brand-logos/apple-black.svg')}
                  className="dark:hidden h-5"
                  alt="image"
                />
                <img
                  src={toAbsoluteUrl('/media/brand-logos/apple-white.svg')}
                  className="light:hidden h-5"
                  alt="image"
                />
              </Fragment>
            }
            title="iOS"
            description={t('accountSecurityOverview.productInsight.activeSessions')}
            number={24}
          />
          <ProductInsight
            image={
              <img
                src={toAbsoluteUrl('/media/brand-logos/android.svg')}
                className="h-5"
                alt="image"
              />
            }
            title="Android"
            description={t('accountSecurityOverview.productInsight.activeSessions')}
            number={35}
          />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
