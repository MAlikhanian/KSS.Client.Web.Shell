'use client';

import { ReactNode } from 'react';
import { CardNotification } from '@/partials/cards';
import {
  ArrowRight,
  ArrowRightCircle,
  EyeOff,
  LucideIcon,
  Monitor,
} from 'lucide-react';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTranslation } from '@/hooks/useTranslation';

interface AccessibilityItem {
  icon: LucideIcon;
  title: string;
  description: string;
  actions: ReactNode;
}
type AccessibilityItems = Array<AccessibilityItem>;

const Accessibility = () => {
  const { t } = useTranslation('account-appearance');
  const items: AccessibilityItems = [
    {
      icon: ArrowRightCircle,
      title: t('accountAppearance.accessibility.shortcutsModifier.title'),
      description: t('accountAppearance.accessibility.shortcutsModifier.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: EyeOff,
      title: t('accountAppearance.accessibility.highContrast.title'),
      description: t('accountAppearance.accessibility.highContrast.description'),
      actions: <Switch id="size-sm" size="sm" />,
    },
    {
      icon: ArrowRight,
      title: t('accountAppearance.accessibility.autoplayVideos.title'),
      description: t('accountAppearance.accessibility.autoplayVideos.description'),
      actions: (
        <div className="grow min-w-48">
          <Select defaultValue="1">
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('accountAppearance.accessibility.select')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">{t('accountAppearance.accessibility.systemPreferences')}</SelectItem>
              <SelectItem value="2">{t('accountAppearance.accessibility.sound')}</SelectItem>
              <SelectItem value="3">{t('accountAppearance.accessibility.focus')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ),
    },
    {
      icon: Monitor,
      title: t('accountAppearance.accessibility.desktopLinks.title'),
      description: t('accountAppearance.accessibility.desktopLinks.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
  ];

  const renderItem = (item: AccessibilityItem, index: number) => {
    return (
      <CardNotification
        icon={item.icon}
        title={item.title}
        description={item.description}
        actions={item.actions}
        key={index}
      />
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountAppearance.accessibility.title')}</CardTitle>
      </CardHeader>
      <div id="notifications_cards">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </Card>
  );
};

export { Accessibility, type AccessibilityItems };
