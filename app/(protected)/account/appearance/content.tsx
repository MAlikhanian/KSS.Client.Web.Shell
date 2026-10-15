'use client';

import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { Image, Link2, MousePointer, Smile } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Branding } from '@/app/(protected)/account/home/company-profile/components/branding';
import { AdvancedSettingsAppearance } from '@/app/(protected)/account/home/settings-sidebar/components/advanced-settings-appearance';
import { Accessibility, DisableDefaultBrand } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountAppearanceContent() {
  const { t } = useTranslation('account-appearance');
  const posts: HighlightedPostsItems = [
    {
      icon: Smile,
      title: t('accountAppearance.highlightedPosts.adaptiveShortcuts.title'),
      summary: t('accountAppearance.highlightedPosts.adaptiveShortcuts.summary'),
      path: '#',
    },
    {
      icon: Image,
      title: t('accountAppearance.highlightedPosts.highContrast.title'),
      summary: t('accountAppearance.highlightedPosts.highContrast.summary'),
      path: '#',
    },
    {
      icon: MousePointer,
      title: t('accountAppearance.highlightedPosts.autoplayVideos.title'),
      summary: t('accountAppearance.highlightedPosts.autoplayVideos.summary'),
      path: '#',
    },
    {
      icon: Link2,
      title: t('accountAppearance.highlightedPosts.desktopLinks.title'),
      summary: t('accountAppearance.highlightedPosts.desktopLinks.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <AdvancedSettingsAppearance title="Theme" />
          <Branding />
          <Accessibility />
          <Faq />
          <Engage
            title={t('common.help.contactSupport.title')}
            description={t('common.help.contactSupport.description')}
            image={
              <>
                <img
                  src={toAbsoluteUrl('/media/illustrations/31.svg')}
                  className="dark:hidden max-h-[150px]"
                  alt="image"
                />
                <img
                  src={toAbsoluteUrl('/media/illustrations/31-dark.svg')}
                  className="light:hidden max-h-[150px]"
                  alt="image"
                />
              </>
            }
            more={{
              title: t('common.help.contactSupport.contactSupport'),
              url: '#',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <DisableDefaultBrand />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
