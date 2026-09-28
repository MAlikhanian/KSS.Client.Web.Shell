'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Mail, Phone } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTable,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/hooks/useTranslation';

const PERSIAN_LANGUAGE_ID = 12;
const PROFILE_PHOTO_TYPE_ID = 8;

type Department = 'data' | 'members' | 'it';
type TitleKey = 'manager' | 'seniorExpert' | 'expert' | 'supportExpert' | 'staff';

interface SupportMember {
  /**
   * PersonId in KSS_Person DB. Null when the person isn't in the DB yet —
   * the row still renders using the fallback name and contact info, but no
   * profile-pic / live-name override happens until they're added.
   */
  personId: string | null;
  fallbackName: string;
  department: Department;
  title: TitleKey;
  /** Internal extension shown as plain text. */
  phone: string | null;
  email: string | null;
}

const MEMBERS: SupportMember[] = [
  // واحد تحلیل داده و توسعه نرم‌افزار
  {
    personId: 'DAC7D874-9274-47AC-A0AE-E89BE682CC57',
    fallbackName: 'الناز محمدی',
    department: 'data',
    title: 'manager',
    phone: null,
    email: 'E.mohammadi@seba.ir',
  },
  // واحد امور اعضا
  {
    personId: 'DBDB41B5-84CE-42AC-9003-16CD9B7238BB',
    fallbackName: 'سهراب رائیجی',
    department: 'members',
    title: 'manager',
    phone: null,
    email: 'S.raeiji@seba.ir',
  },
  {
    personId: '019E39CE-D909-7DBB-8C14-C7F8866B8D6A',
    fallbackName: 'توماج اسمعیل نژاد',
    department: 'members',
    title: 'seniorExpert',
    phone: '301',
    email: 'T.esmaeilnejadTanha@seba.ir',
  },
  {
    personId: '019E39F6-F76A-7352-9DDF-6B50C7B6BB95',
    fallbackName: 'سجاد خزائی',
    department: 'members',
    title: 'expert',
    phone: '302',
    email: 'S.khazaei@seba.ir',
  },
  {
    personId: null, // not in DB yet
    fallbackName: 'علی دم شناس',
    department: 'members',
    title: 'expert',
    phone: '303',
    email: 'A.damshenas@seba.ir',
  },
  {
    personId: null, // not in DB yet
    fallbackName: 'محمد اوجاقلو',
    department: 'members',
    title: 'expert',
    phone: '306',
    email: 'M.ojaghlou@seba.ir',
  },
  {
    personId: '019C650E-4FC1-782D-90C8-C96C546F22B7',
    fallbackName: 'عرشیا بدیهی',
    department: 'members',
    title: 'expert',
    phone: '307',
    email: 'A.badihi@seba.ir',
  },
  // واحد فناوری اطلاعات
  {
    personId: 'CC631FC0-4100-4A54-9B61-55D7715A3593',
    fallbackName: 'محمد علی خانیان زاده',
    department: 'it',
    title: 'supportExpert',
    phone: null,
    email: 'alikhanian@seba.ir',
  },
  {
    personId: '019E2F5C-DE47-7284-AB6C-EBB2FE820B55',
    fallbackName: 'متین پاک منش',
    department: 'it',
    title: 'supportExpert',
    phone: '601',
    email: 'M.pakmanesh@seba.ir',
  },
];

const DEPT_AVATAR: Record<Department, string> = {
  data: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300',
  members: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300',
  it: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
};

interface DirectoryPerson {
  id: string;
  nationalId: string;
  translations: Array<{
    languageId: number;
    firstName: string;
    lastName: string;
  }>;
}

/** Fetches the full person directory once so we can override hardcoded names
 * with DB names (and later, profile pic URLs when that field is added). */
function useDirectory() {
  return useQuery<DirectoryPerson[]>({
    queryKey: ['person-directory-support-members'],
    queryFn: async () => {
      const res = await fetch('/api/person/directory?limit=10000');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const json = await res.json();
      return Array.isArray(json?.data) ? (json.data as DirectoryPerson[]) : [];
    },
    staleTime: 10 * 60 * 1000,
  });
}

function dbName(
  dbPerson: DirectoryPerson | undefined,
  locale: string,
  fallback: string,
): string {
  if (!dbPerson) return fallback;
  const fa = dbPerson.translations?.find(
    (t) => t.languageId === PERSIAN_LANGUAGE_ID,
  );
  const other = dbPerson.translations?.find(
    (t) => t.languageId !== PERSIAN_LANGUAGE_ID,
  );
  const chosen = locale === 'fa-IR' ? (fa ?? other) : (other ?? fa);
  if (!chosen) return fallback;
  const full = `${chosen.firstName ?? ''} ${chosen.lastName ?? ''}`.trim();
  return full || fallback;
}

/**
 * Loads a person's PROFILE_PHOTO document via the same proxy routes the
 * person-information sidebar uses. On 401/404/access denial, silently falls
 * back to a colored initial circle.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function MemberAvatar({
  personId,
  displayName,
  department,
}: {
  personId: string | null;
  displayName: string;
  department: Department;
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) {
      setPhotoUrl(null);
      return;
    }

    let objectUrl: string | null = null;
    let cancelled = false;

    (async () => {
      try {
        const docsRes = await fetch(
          `/api/person/document?personId=${personId}`,
        );
        if (!docsRes.ok) return;
        const docs: unknown = await docsRes.json();
        const profileDoc = Array.isArray(docs)
          ? (docs as Array<{ id: string; documentTypeId: number }>).find(
              (d) => d.documentTypeId === PROFILE_PHOTO_TYPE_ID,
            )
          : null;
        if (!profileDoc) return;

        const fileRes = await fetch(
          `/api/person/document/${profileDoc.id}/file?personId=${personId}`,
        );
        if (!fileRes.ok) return;

        const blob = await fileRes.blob();
        if (cancelled) return;
        objectUrl = URL.createObjectURL(blob);
        setPhotoUrl(objectUrl);
      } catch {
        // fallthrough — initial-letter fallback
      }
    })();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [personId]);

  if (photoUrl) {
    return (
      <img
        src={photoUrl}
        alt={displayName}
        className="size-9 rounded-full object-cover"
      />
    );
  }

  const initial = (displayName || '?').charAt(0);
  return (
    <div
      className={`flex items-center justify-center size-9 rounded-full font-semibold ${DEPT_AVATAR[department]}`}
    >
      {initial}
    </div>
  );
}

const SupportMembers = () => {
  const { t, i18n } = useTranslation();
  const locale = i18n.language;
  const { data: directory } = useDirectory();

  // Build id → person map once for O(1) name lookups.
  const personMap = new Map<string, DirectoryPerson>();
  for (const p of directory ?? []) {
    personMap.set(p.id.toLowerCase(), p);
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>{t('dashboard.supportMembers.title')}</CardTitle>
      </CardHeader>
      <CardTable className="flex-1 min-h-0">
        <ScrollArea className="h-full max-h-[23rem]">
          <table dir={i18n.dir()} className="w-full text-sm">
            <thead className="sticky top-0 bg-background z-10">
              <tr className="border-b border-border text-secondary-foreground">
                <th className="text-start font-normal py-2 px-3 w-12"></th>
                <th className="text-start font-normal py-2 px-3">
                  {t('dashboard.supportMembers.colName')}
                </th>
                <th className="text-start font-normal py-2 px-3">
                  {t('dashboard.supportMembers.colPosition')}
                </th>
                <th className="text-start font-normal py-2 px-3 w-20">
                  {t('dashboard.supportMembers.colExt')}
                </th>
                <th className="text-end font-normal py-2 px-3 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m, i) => {
                const dbPerson = m.personId
                  ? personMap.get(m.personId.toLowerCase())
                  : undefined;
                const name = dbName(dbPerson, locale, m.fallbackName);
                return (
                  <tr
                    key={i}
                    className="border-b border-border last:border-b-0 hover:bg-accent/40"
                  >
                    <td className="py-2 px-3">
                      <MemberAvatar
                        personId={m.personId}
                        displayName={name}
                        department={m.department}
                      />
                    </td>
                    <td className="py-2 px-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-mono leading-tight">
                          {name}
                        </span>
                        <span className="text-xs text-secondary-foreground leading-tight">
                          {t(
                            `dashboard.supportMembers.departments.${m.department}`,
                          )}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-secondary-foreground">
                      {t(`dashboard.supportMembers.titles.${m.title}`)}
                    </td>
                    <td className="py-2 px-3 text-secondary-foreground tabular-nums">
                      {m.phone ? (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="size-3.5 opacity-60" />
                          {m.phone}
                        </span>
                      ) : (
                        <span className="opacity-40">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3 text-end">
                      {m.email ? (
                        <a
                          href={`mailto:${m.email}`}
                          aria-label={m.email}
                          title={m.email}
                          className="inline-flex items-center justify-center size-7 rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                        >
                          <Mail className="size-4" />
                        </a>
                      ) : (
                        <span className="opacity-40">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </ScrollArea>
      </CardTable>
    </Card>
  );
};

export { SupportMembers };
