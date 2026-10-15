'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useTranslatedMenu } from '@/lib/use-translated-menu';
import { toAbsoluteUrl } from '@/lib/helpers';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function HeaderLogo() {
  const pathname = usePathname();
  const { menuRoot } = useTranslatedMenu();
  const [selectedMenuItem, setSelectedMenuItem] = useState(menuRoot[1] ?? menuRoot[0]);

  useEffect(() => {
    menuRoot.forEach((item) => {
      if (item.rootPath && pathname.includes(item.rootPath)) {
        setSelectedMenuItem(item);
      }
    });
  }, [pathname, menuRoot]);

  return (
    <div className="flex items-center gap-2 lg:gap-5 2xl:-ms-[60px]">
      {/* Logo Section */}
      <Link href="/" className="shrink-0">
        <img
          src={toAbsoluteUrl('/media/app/mini-logo-circle.svg')}
          className="dark:hidden min-h-[42px]"
          alt="logo"
        />
        <img
          src={toAbsoluteUrl('/media/app/mini-logo-circle-dark.svg')}
          className="hidden dark:inline-block min-h-[42px]"
          alt="logo"
        />
      </Link>

      {/* Menu Section */}
      <div className="flex items-center gap-3">
        <h3 className="text-accent-foreground text-base hidden md:block">
          Metronic Team
        </h3>
        <span className="text-sm text-muted-foreground font-medium hidden md:inline">
          /
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer text-mono font-medium flex items-center gap-2">
            {selectedMenuItem?.title}
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} side="bottom" align="start">
            {menuRoot.map((item, index) => (
              <DropdownMenuItem
                key={index}
                asChild
                className={cn(item === selectedMenuItem && 'bg-accent')}
              >
                <Link href={item.path ?? ''}>
                  {item.icon && <item.icon />}
                  {item.title}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
