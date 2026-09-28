'use client';

import { Fragment, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { UserHero } from '@/partials/common/user-hero';
import { DropdownMenu9 } from '@/partials/dropdown-menu/dropdown-menu-9';
import { Navbar, NavbarActions } from '@/partials/navbar/navbar';
import {
  EllipsisVertical,
  Mail,
  MessageSquareText,
  Users,
} from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common/container';
import { PageMenu } from '@/app/(protected)/public-profile/page-menu';
import { ProfileDefaultContent } from '@/app/(protected)/public-profile/profiles/default/content';

type PersonData = {
  id: string;
  translations: Array<{
    firstName: string;
    lastName: string;
    languageId: number;
  }>;
  emails: Array<{
    emailAddress: string;
    isPrimary: boolean;
  }>;
  preferredLanguageId: number;
};

export default function ProfileDefaultPage() {
  const { data: session } = useSession();
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersonData() {
      if (!session) {
        setIsLoading(false);
        setError('Please log in to view your profile');
        return;
      }

      try {
        const response = await fetch('/api/user-management/account/person');
        
        if (!response.ok) {
          // Handle 401 Unauthorized - token expired, redirect to login
          if (response.status === 401) {
            const { signOutToTenant } = await import('@/lib/auth-signout');
            signOutToTenant();
            return;
          }
          
          const errorData = await response.json().catch(() => ({ message: 'Failed to fetch person data' }));
          throw new Error(errorData.message || 'Failed to fetch person data');
        }
        const data = await response.json();
        setPersonData(data);
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error('Error fetching person data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch person data');
      } finally {
        setIsLoading(false);
      }
    }

    if (session) {
      fetchPersonData();
    }
  }, [session]);

  // Get person name from translations (prefer preferred language, fallback to first)
  const getPersonName = () => {
    if (!personData?.translations || personData.translations.length === 0) {
      return session?.user?.name || 'User';
    }

    // Try to find translation in preferred language
    const preferredTranslation = personData.translations.find(
      (t) => t.languageId === personData.preferredLanguageId
    );

    // Fallback to first translation if preferred not found
    const translation = preferredTranslation || personData.translations[0];

    return `${translation.firstName} ${translation.lastName}`.trim();
  };

  // Get primary email or first email
  const getPersonEmail = () => {
    if (!personData?.emails || personData.emails.length === 0) {
      return session?.user?.email || null;
    }

    const primaryEmail = personData.emails.find((e) => e.isPrimary);
    return primaryEmail?.emailAddress || personData.emails[0]?.emailAddress || null;
  };

  const image = (
    <img
      src={toAbsoluteUrl('/media/avatars/300-1.png')}
      className="rounded-full border-3 border-green-500 size-[100px] shrink-0"
      alt="image"
    />
  );

  const personName = isLoading ? 'Loading...' : getPersonName();
  const personEmail = getPersonEmail();

  const infoItems = [];
  if (personEmail) {
    infoItems.push({ email: personEmail, icon: Mail });
  }

  return (
    <Fragment>
      <UserHero
        name={personName}
        image={image}
        info={infoItems}
      />
      <Container>
        <Navbar>
          <PageMenu />
          <NavbarActions>
            <Button>
              <Users /> Connect
            </Button>
            <Button variant="outline" mode="icon">
              <MessageSquareText />
            </Button>
            <DropdownMenu9
              trigger={
                <Button variant="outline" mode="icon">
                  <EllipsisVertical />
                </Button>
              }
            />
          </NavbarActions>
        </Navbar>
      </Container>
      <Container>
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}
        <ProfileDefaultContent />
      </Container>
    </Fragment>
  );
}
