'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function NavbarMenu() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const items = useMemo(
    () => [
      {
        title: t('menu.dashboards'),
        path: '/',
        partial: '/',
      },
      {
        title: t('menu.publicProfile'),
        path: '/public-profile/profiles/default',
        partial: '/public-profile',
      },
      {
        title: t('menu.myAccount'),
        path: '/account/home/get-started',
        partial: '/account',
      },
      {
        title: t('menu.network'),
        path: '/network/get-started',
        partial: '/network',
      },
      {
        title: t('menu.userManagement'),
        path: '/user-management/users',
        partial: '/user-management',
      },
      {
        title: t('menu.storeClient'),
        path: '/store-client/home',
        partial: '/store-client',
      },
      {
        title: t('menu.authentication'),
        path: '/authentication/get-started',
        partial: '/authentication',
      },
    ],
    [t], // Add t as dependency
  );

  const [selectedItem, setSelectedItem] = useState(items[0]);

  useEffect(() => {
    items.forEach((item) => {
      if (item.partial !== '' && pathname.startsWith(item.partial)) {
        setSelectedItem(item);
      }
    });
  }, [items, pathname]);

  return (
    <div className="grid">
      <div className="kt-scrollable-x-auto">
        <div className="flex items-stretch h-12 gap-5 lg:gap-7.5">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={cn(
                'flex items-center text-nowrap font-medium text-sm text-secondary-foreground',
                item.path === selectedItem.path &&
                  'border-b border-mono text-mono',
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
