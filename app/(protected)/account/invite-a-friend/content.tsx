'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { BookUser, MessageCirclePlus, Users } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { InviteWithLink } from '@/app/(protected)/account/members/team-members/components/invite-with-link';
import { InvitePeople, Invites } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountInviteAFriendContent() {
  const { t } = useTranslation('account-invite-a-friend');
  const posts: HighlightedPostsItems = [
    {
      icon: Users,
      title: t('accountInviteAFriend.highlightedPosts.item1.title'),
      summary: t('accountInviteAFriend.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: MessageCirclePlus,
      title: t('accountInviteAFriend.highlightedPosts.item2.title'),
      summary: t('accountInviteAFriend.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: BookUser,
      title: t('accountInviteAFriend.highlightedPosts.item3.title'),
      summary: t('accountInviteAFriend.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <InvitePeople />
          <Invites />
          <InviteWithLink />
          <Engage
            title={t('accountInviteAFriend.engage.title')}
            description={t('accountInviteAFriend.engage.description')}
            image={
              <Fragment>
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
              </Fragment>
            }
            more={{
              title: t('accountInviteAFriend.engage.contactSupport'),
              url: 'https://keenthemes.com/contact',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
