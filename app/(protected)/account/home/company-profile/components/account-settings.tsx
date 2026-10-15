'use client';

import Link from 'next/link';
import { Copy, SquarePen } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

const AccountSettings = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{t('accountCompanyProfile.accountSettings.title')}</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-56 text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.email')}
              </TableCell>
              <TableCell className="py-2 min-w-60 w-full">
                <Link
                  href="#"
                  className="text-foreground text-sm font-normal hover:text-primary-active"
                >
                  john.doe@hexlad.io
                </Link>
              </TableCell>
              <TableCell className="py-2 min-w-28 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.password')}
              </TableCell>
              <TableCell className="py-2 text-secondary-foreground  font-normal text-sm">
                {t('accountCompanyProfile.accountSettings.passwordLastChanged')}
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.signInWith')}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/google.svg')}
                      className="size-4"
                      alt="image"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/facebook.svg')}
                      className="size-4"
                      alt="image"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/apple-black.svg')}
                      className="dark:hidden h-4"
                      alt="image"
                    />
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/apple-white.svg')}
                      className="light:hidden h-4"
                      alt="image"
                    />
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{t('accountCompanyProfile.accountSettings.setup')}</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.teamAccount')}
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm font-normal">
                {t('accountCompanyProfile.accountSettings.toBeSet')}
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.socialProfiles')}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/linkedin.svg')}
                      className="size-4"
                      alt="image"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl(
                        '/media/brand-logos/twitch-purple.svg',
                      )}
                      className="size-4"
                      alt="image"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/x.svg')}
                      className="dark:hidden size-4"
                      alt="image"
                    />
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/x-dark.svg')}
                      className="light:hidden size-4"
                      alt="image"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/dribbble.svg')}
                      className="size-4"
                      alt="image"
                    />
                  </Link>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.accountSettings.referralLink')}
              </TableCell>
              <TableCell className="text-foreground text-sm font-normal">
                <div className="flex items-center gap-0.5">
                  <Link
                    href="#"
                    className="text-secondary-foreground text-sm hover:text-primary-active"
                  >
                    https://studio.co/W3gvQOI35dt
                  </Link>
                  <Button variant="dim" mode="icon">
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{t('accountCompanyProfile.accountSettings.recreate')}</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { AccountSettings };
