'use client';

import Link from 'next/link';
import { Copy, SquarePen } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IBasicSettingsProps {
  title: string;
}

const BasicSettings = ({ title }: IBasicSettingsProps) => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="auto-update" className="text-sm">
            {t('accountUserProfile.basicSettings.publicProfile')}
          </Label>
          <Switch defaultChecked size="sm" />
        </div>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-36 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.email')}
              </TableCell>
              <TableCell className="py-2 min-w-60">
                <Link
                  href="#"
                  className="text-foreground font-normal text-sm hover:text-primary-active"
                >
                  jasontt@studio.co
                </Link>
              </TableCell>
              <TableCell className="py-2 max-w-16 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.password')}
              </TableCell>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.passwordLastChanged')}
              </TableCell>
              <TableCell className="py-2 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3.5text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.twoFA')}
              </TableCell>
              <TableCell className="py-3.5 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.toBeSet')}
              </TableCell>
              <TableCell className="py-3 text-end">
                <Button mode="link" size="sm" underlined="dashed" asChild>
                  <Link href="#">{t('accountUserProfile.basicSettings.setup')}</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.signInWith')}
              </TableCell>
              <TableCell className="py-0.5">
                <div className="flex items-center gap-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/google.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/facebook.svg')}
                      className="size-4"
                      alt=""
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/apple-black.svg')}
                      className="dark:hidden h-4"
                      alt="product logo"
                    />
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/apple-white.svg')}
                      className="light:hidden h-4"
                      alt="product logo"
                    />
                  </Link>
                </div>
              </TableCell>
              <TableCell className="py-2 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.teamAccount')}
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.toBeSet')}
              </TableCell>
              <TableCell className="py-3 text-end">
                <Button mode="link" size="sm" underlined="dashed" asChild>
                  <Link href="#">{t('accountUserProfile.basicSettings.setup')}</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountUserProfile.basicSettings.socialProfiles')}
              </TableCell>
              <TableCell className="py-0.5">
                <div className="flex items-center gap-2.5">
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/linkedin.svg')}
                      className="size-4"
                      alt="product logo"
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
                      alt="product logo"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/x.svg')}
                      className="dark:hidden size-4"
                      alt="product logo"
                    />
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/x-dark.svg')}
                      className="light:hidden size-4"
                      alt="product logo"
                    />
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center justify-center size-8 bg-background rounded-full border border-input"
                  >
                    <img
                      src={toAbsoluteUrl('/media/brand-logos/dribbble.svg')}
                      className="size-4"
                      alt="product logo"
                    />
                  </Link>
                </div>
              </TableCell>
              <TableCell className="py-2 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {t('accountUserProfile.basicSettings.referralLink')}
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                <div className="flex items-center gap-0.5">
                  <Link
                    href="#"
                    className="text-foreground text-sm hover:text-primary-active"
                  >
                    https://studio.co/W3gvQOI35dt
                  </Link>
                  <Button variant="dim" mode="icon">
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="py-3 text-end">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{t('accountUserProfile.basicSettings.recreate')}</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { BasicSettings, type IBasicSettingsProps };
