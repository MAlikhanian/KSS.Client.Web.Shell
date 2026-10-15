'use client';

import Link from 'next/link';
import { CardNotification } from '@/partials/cards';
import {
  CalendarClock,
  ClipboardCheck,
  DollarSign,
  FileText,
  MessageCircle,
  Tablet,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  IChannelsItem,
  IChannelsItems,
} from '@/app/(protected)/account/notifications/components/channels';
import { useTranslation } from '@/hooks/useTranslation';

const OtherNotifications = () => {
  const { t } = useTranslation('account-notifications');
  const items: IChannelsItems = [
    {
      icon: Tablet,
      title: t('accountNotifications.otherNotifications.items.taskAlert.title'),
      description: t('accountNotifications.otherNotifications.items.taskAlert.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: DollarSign,
      title: t('accountNotifications.otherNotifications.items.budgetWarning.title'),
      description: t('accountNotifications.otherNotifications.items.budgetWarning.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: FileText,
      title: t('accountNotifications.otherNotifications.items.invoiceAlert.title'),
      description: t('accountNotifications.otherNotifications.items.invoiceAlert.description'),
      actions: (
        <Button variant="outline">
          <Link href="#">{t('accountNotifications.otherNotifications.items.invoiceAlert.viewInvoices')}</Link>
        </Button>
      ),
    },
    {
      icon: MessageCircle,
      title: t('accountNotifications.otherNotifications.items.feedbackAlert.title'),
      description: t('accountNotifications.otherNotifications.items.feedbackAlert.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: Users,
      title: t('accountNotifications.otherNotifications.items.collaborationRequest.title'),
      description: t('accountNotifications.otherNotifications.items.collaborationRequest.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
    {
      icon: CalendarClock,
      title: t('accountNotifications.otherNotifications.items.meetingReminder.title'),
      description: t('accountNotifications.otherNotifications.items.meetingReminder.description'),
      actions: (
        <Button variant="outline">
          <Link href="#">{t('accountNotifications.otherNotifications.items.meetingReminder.showMeetings')}</Link>
        </Button>
      ),
    },
    {
      icon: ClipboardCheck,
      title: t('accountNotifications.otherNotifications.items.statusChange.title'),
      description: t('accountNotifications.otherNotifications.items.statusChange.description'),
      actions: <Switch id="size-sm" size="sm" defaultChecked />,
    },
  ];

  const renderItem = (item: IChannelsItem, index: number) => {
    return (
      <CardNotification
        icon={item.icon}
        title={item.title}
        description={item.description}
        button={item.button}
        actions={item.actions}
        key={index}
      />
    );
  };

  return (
    <Card>
      <CardHeader className="gap-2">
        <CardTitle>{t('accountNotifications.otherNotifications.title')}</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="size-sm" className="text-sm">
            {t('accountNotifications.otherNotifications.teamWideAlerts')}
          </Label>
          <Switch id="size-sm" size="sm" />
        </div>
      </CardHeader>
      <div id="notifications_cards">
        {items.map((item, index) => {
          return renderItem(item, index);
        })}
      </div>
    </Card>
  );
};

export { OtherNotifications };
