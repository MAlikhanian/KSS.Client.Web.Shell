'use client';

import { Fragment } from 'react';
import { Engage } from '@/partials/common/engage';
import { Faq } from '@/partials/common/faq';
import {
  HighlightedPosts,
  HighlightedPostsItems,
} from '@/partials/common/highlighted-posts';
import { BookUser, TableProperties, UsersRound } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { ConnectedProfiles, Members, Seats, TeamInfo } from './components';
import { useTranslation } from '@/hooks/useTranslation';

export function AccountTeamInfoContent() {
  const { t } = useTranslation('account-members');
  const posts: HighlightedPostsItems = [
    {
      icon: BookUser,
      title: t('accountMembersTeamInfo.highlightedPosts.item1.title'),
      summary: t('accountMembersTeamInfo.highlightedPosts.item1.summary'),
      path: '#',
    },
    {
      icon: UsersRound,
      title: t('accountMembersTeamInfo.highlightedPosts.item2.title'),
      summary: t('accountMembersTeamInfo.highlightedPosts.item2.summary'),
      path: '#',
    },
    {
      icon: TableProperties,
      title: t('accountMembersTeamInfo.highlightedPosts.item3.title'),
      summary: t('accountMembersTeamInfo.highlightedPosts.item3.summary'),
      path: '#',
    },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 lg:gap-7.5">
      <div className="col-span-2">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <TeamInfo />
          <Members />
          <Faq />
          <Engage
            title={t('accountMembersTeamInfo.engage.title')}
            description={t('accountMembersTeamInfo.engage.description')}
            image={
              <Fragment>
                <img
                  src={toAbsoluteUrl('/media/illustrations/29.svg')}
                  className="dark:hidden max-h-44"
                  alt="image"
                />
                <img
                  src={toAbsoluteUrl('/media/illustrations/29-dark.svg')}
                  className="light:hidden max-h-44"
                  alt="image"
                />
              </Fragment>
            }
            more={{
              title: t('accountMembersTeamInfo.engage.goToHelpCenter'),
              url: '',
            }}
          />
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <Seats />
          <ConnectedProfiles />
          <HighlightedPosts posts={posts} />
        </div>
      </div>
    </div>
  );
}
