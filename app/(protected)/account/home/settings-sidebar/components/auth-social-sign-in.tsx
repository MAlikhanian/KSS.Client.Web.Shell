'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface IAuthSocialSignInItem {
  logo: string;
  title: string;
  email: string;
  checkbox: boolean;
}
type IAuthSocialSignInItems = Array<IAuthSocialSignInItem>;

interface IAuthSocialSignInBlock {
  logo: string;
  logoDark?: string;
  title: string;
}
type IAuthSocialSignInBlocks = Array<IAuthSocialSignInBlock>;

const AuthSocialSignIn = () => {
  const { t } = useTranslation('account-home');
  const items: IAuthSocialSignInItems = [
    {
      logo: 'google.svg',
      title: 'Google',
      email: 'jasontatum@ktstudio.io',
      checkbox: true,
    },
    {
      logo: 'linkedin.svg',
      title: 'Linkedin',
      email: 'jasontt@keenthemes.co',
      checkbox: false,
    },
  ];

  const blocks: IAuthSocialSignInBlocks = [
    {
      logo: 'apple-black.svg',
      logoDark: 'apple-white.svg',
      title: t('accountSettingsSidebar.authSocialSignIn.signInWithApple'),
    },
    {
      logo: 'microsoft-5.svg',
      title: t('accountSettingsSidebar.authSocialSignIn.signInWithMicrosoft'),
    },
    {
      logo: 'facebook.svg',
      title: t('accountSettingsSidebar.authSocialSignIn.signInWithFacebook'),
    },
  ];

  const renderItem = (item: IAuthSocialSignInItem, index: number) => {
    return (
      <div
        key={index}
        className="flex items-center justify-between flex-wrap border border-border rounded-xl gap-2 px-3.5 py-2.5"
      >
        <div className="flex items-center flex-wrap gap-3.5">
          <img
            src={toAbsoluteUrl(`/media/brand-logos/${item.logo}`)}
            className="size-6 shrink-0"
            alt="image"
          />
          <div className="flex flex-col gap-0.5">
            <Link
              href="#"
              className="text-sm font-medium text-mono hover:text-primary-active"
            >
              {item.title}
            </Link>
            <Link
              href="#"
              className="text-sm text-secondary-foreground hover:text-primary-active"
            >
              {item.email}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <Switch
            defaultChecked={item.checkbox}
            size="sm"
            value={item.checkbox ? '1' : '2'}
          />
          <Button variant="ghost" mode="icon">
            <Trash2 />
          </Button>
        </div>
      </div>
    );
  };

  const renderBlock = (block: IAuthSocialSignInBlock, index: number) => {
    return (
      <Button key={index} variant="outline">
        {block.logoDark ? (
          <>
            <img
              src={toAbsoluteUrl(`/media/brand-logos/${block.logo}`)}
              className="dark:hidden size-5"
              alt="image"
            />
            <img
              src={toAbsoluteUrl(`/media/brand-logos/${block.logoDark}`)}
              className="light:hidden size-5"
              alt="image"
            />
          </>
        ) : (
          <img
            src={toAbsoluteUrl(`/media/brand-logos/${block.logo}`)}
            className="size-5"
            alt="image"
          />
        )}
        {block.title}
      </Button>
    );
  };

  return (
    <Card>
      <CardHeader id="auth_social_sign_in">
        <CardTitle>{t('accountSettingsSidebar.authSocialSignIn.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 mb-7">
          {items.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>
        <div className="flex flex-col gap-0.5 mb-5">
          <div className="text-base font-medium text-mono">
            {t('accountSettingsSidebar.authSocialSignIn.moreOptions')}
          </div>
          <div className="text-sm text-foreground">
            {t('accountSettingsSidebar.authSocialSignIn.description')}
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2.5 mb-7.5">
          {blocks.map((block, index) => {
            return renderBlock(block, index);
          })}
        </div>
        <div className="flex justify-end">
          <Button>{t('accountSettingsSidebar.authSocialSignIn.saveChanges')}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export {
  AuthSocialSignIn,
  type IAuthSocialSignInItem,
  type IAuthSocialSignInItems,
  type IAuthSocialSignInBlock,
  type IAuthSocialSignInBlocks,
};
