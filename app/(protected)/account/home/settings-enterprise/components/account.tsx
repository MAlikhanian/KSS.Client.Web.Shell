'use client';

import Link from 'next/link';
import { AvatarInput } from '@/partials/common/avatar-input';
import { Copy, SquarePen } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IAccountProps {
  title: string;
}

const Account = ({ title }: IAccountProps) => {
  const { t } = useTranslation('account-home');
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="auto-update" className="text-sm">
            {t('accountSettingsEnterprise.account.publicProfile')}
          </Label>
          <Switch defaultChecked size="sm" />
        </div>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="w-28 text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.photo')}
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm font-normal min-w-32">
                {t('accountSettingsEnterprise.account.fields.photoDescription')}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center items-center">
                  <AvatarInput />
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.name')}
              </TableCell>
              <TableCell className="text-foreground font-normal">
                Jason Tatum
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.availability')}
              </TableCell>
              <TableCell className="text-secondary-foreground">
                <Badge size="md" variant="success" appearance="light">
                  {t('accountSettingsEnterprise.account.fields.availableNow')}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal min-w-36">
                {t('accountSettingsEnterprise.account.fields.email')}
              </TableCell>
              <TableCell className="text-foreground font-normal min-w-60">
                <Link
                  href="#"
                  className="text-secondary-foreground hover:text-primary-active"
                >
                  jasontt@studio.co
                </Link>
              </TableCell>
              <TableCell className="max-w-16 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.password')}
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm font-normal">
                {t('accountSettingsEnterprise.account.fields.passwordLastChanged')}
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.signInWith')}
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
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.teamAccount')}
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm font-normal">
                {t('accountSettingsEnterprise.account.fields.toBeSet')}
              </TableCell>
              <TableCell className="text-center">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{t('accountSettingsEnterprise.account.fields.add')}</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountSettingsEnterprise.account.fields.socialProfiles')}
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
                {t('accountSettingsEnterprise.account.fields.referralLink')}
              </TableCell>
              <TableCell className="text-secondary-foreground text-sm font-normal">
                <div className="flex items-center gap-1">
                  <Link
                    href="#"
                    className="text-foreground font-normal text-sm hover:text-primary-active"
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
                  <Link href="#">{t('accountSettingsEnterprise.account.fields.recreate')}</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { Account, type IAccountProps };
