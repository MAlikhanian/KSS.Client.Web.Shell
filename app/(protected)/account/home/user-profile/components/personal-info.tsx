'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { toAbsoluteUrl } from '@/lib/helpers';

type PersonData = {
  id: string;
  translations: Array<{
    firstName: string;
    lastName: string;
    languageId: number;
  }>;
  preferredLanguageId: number;
  dateOfBirth: string;
  sexId: number;
  addresses: Array<{
    id: string;
    postalCode?: string;
    translations?: Array<{
      street1: string;
      street2?: string;
      languageId: number;
    }>;
  }>;
  isActive: boolean;
};

const PersonalInfo = () => {
  const { t } = useTranslation('account-home');
  const { data: session } = useSession();
  const [personData, setPersonData] = useState<PersonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPersonData() {
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

    fetchPersonData();
  }, []);

  // Get person name from translations (prefer preferred language, fallback to first)
  const getPersonName = () => {
    if (!personData?.translations || personData.translations.length === 0) {
      return '—';
    }

    // Try to find translation in preferred language
    const preferredTranslation = personData.translations.find(
      (t) => t.languageId === personData.preferredLanguageId
    );

    // Fallback to first translation if preferred not found
    const translation = preferredTranslation || personData.translations[0];

    return `${translation.firstName} ${translation.lastName}`.trim();
  };

  // Format date of birth
  const formatDateOfBirth = (dateString: string | undefined) => {
    if (!dateString) return '—';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
      return dateString;
    }
  };

  // Get gender label (sexId: 1 = Male, 2 = Female, etc.)
  const getGenderLabel = () => {
    if (!personData?.sexId) return '—';
    // Assuming sexId 1 = Male, 2 = Female (adjust based on your data)
    return personData.sexId === 1 
      ? t('accountUserProfile.personalInfo.male')
      : personData.sexId === 2
      ? t('accountUserProfile.personalInfo.female')
      : '—';
  };

  // Get formatted address
  const getAddress = () => {
    if (!personData?.addresses || personData.addresses.length === 0) {
      return t('accountUserProfile.personalInfo.noAddressYet');
    }

    const address = personData.addresses[0];
    // Address structure: may have translations with street1/street2, or direct postalCode
    const parts: string[] = [];
    
    // Check if address has translations (nested structure)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addr = address as Record<string, any>;
    if (addr.translations && Array.isArray(addr.translations) && addr.translations.length > 0) {
      const translation = addr.translations[0];
      if (translation.street1) parts.push(translation.street1);
      if (translation.street2) parts.push(translation.street2);
    }
    
    // Add postal code if available
    if (address.postalCode) {
      parts.push(`Postal Code: ${address.postalCode}`);
    }

    return parts.length > 0 ? parts.join(', ') : t('accountUserProfile.personalInfo.noAddressYet');
  };

  if (isLoading) {
    return (
      <Card className="min-w-full">
        <CardHeader>
          <CardTitle>{t('accountUserProfile.personalInfo.title')}</CardTitle>
        </CardHeader>
        <CardContent className="kt-scrollable-x-auto pb-3 p-0">
          <Table className="align-middle text-sm text-muted-foreground">
            <TableBody>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <TableRow key={i}>
                  <TableCell className="py-2">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="py-2">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="py-2">
                    <Skeleton className="h-4 w-8 mx-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{t('accountUserProfile.personalInfo.title')}</CardTitle>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        {error && (
          <div className="p-4 mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
          </div>
        )}
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-28 text-secondary-foreground font-normal">
                {t('accountUserProfile.personalInfo.photo')}
              </TableCell>
              <TableCell className="py-2 text-gray700 font-normal min-w-32 text-sm">
                {t('accountUserProfile.personalInfo.photoDescription')}
              </TableCell>
              <TableCell className="py-2 text-center">
                <div className="flex justify-center items-center">
                  {session?.user?.avatar ? (
                    <Avatar className="size-16 border-2 border-green-500">
                      <AvatarImage 
                        src={session.user.avatar} 
                        alt={session.user.name || 'Avatar'} 
                      />
                      <AvatarFallback>
                        {getPersonName()
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Avatar className="size-16 border-2 border-green-500">
                      <AvatarImage 
                        src={toAbsoluteUrl('/media/avatars/blank.png')} 
                        alt="Avatar" 
                      />
                      <AvatarFallback>
                        {getPersonName()
                          .split(' ')
                          .map(n => n[0])
                          .join('')
                          .toUpperCase()
                          .slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountUserProfile.personalInfo.name')}
              </TableCell>
              <TableCell className="py-2 text-foreground font-normal text-sm">
                {getPersonName()}
              </TableCell>
              <TableCell className="py-2 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                {t('accountUserProfile.personalInfo.availability')}
              </TableCell>
              <TableCell className="py-3 text-foreground font-normal">
                <Badge 
                  size="md" 
                  variant={personData?.isActive ? "success" : "destructive"} 
                  appearance="light"
                >
                  {personData?.isActive 
                    ? t('accountUserProfile.personalInfo.availableNow')
                    : 'Unavailable'}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                {t('accountUserProfile.personalInfo.birthday')}
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {formatDateOfBirth(personData?.dateOfBirth)}
              </TableCell>
              <TableCell className="py-3 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                {t('accountUserProfile.personalInfo.gender')}
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {getGenderLabel()}
              </TableCell>
              <TableCell className="py-3 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3">{t('accountUserProfile.personalInfo.address')}</TableCell>
              <TableCell className="py-3 text-secondary-foreground text-sm font-normal">
                {getAddress()}
              </TableCell>
              <TableCell className="py-3 text-center">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{getAddress() === t('accountUserProfile.personalInfo.noAddressYet') 
                    ? t('accountUserProfile.personalInfo.add')
                    : t('accountUserProfile.personalInfo.edit')}</Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { PersonalInfo };
