'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { DirectionProvider as RadixDirectionProvider } from '@radix-ui/react-direction';
import { I18N_LANGUAGES } from '@/i18n/config';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import legacy translation files (for auth, brokerages, other pages)
import faTranslations from '@/i18n/messages/fa.json';
import enTranslations from '@/i18n/messages/en.json';

// Import component-level translation files
import faCommon from '@/i18n/common/fa.json';
import enCommon from '@/i18n/common/en.json';
import faApiErrors from '@/i18n/api-errors/fa.json';
import enApiErrors from '@/i18n/api-errors/en.json';


// Auth
import faAuth from '@/i18n/auth/fa.json';
import enAuth from '@/i18n/auth/en.json';
// Brokerages
import faBrokCommon from '@/i18n/brokerages/brokerages-common/fa.json';
import enBrokCommon from '@/i18n/brokerages/brokerages-common/en.json';
import faBrokGeneralInfo from '@/i18n/brokerages/brokerages-general-info/fa.json';
import enBrokGeneralInfo from '@/i18n/brokerages/brokerages-general-info/en.json';
import faBrokMembersInfo from '@/i18n/brokerages/brokerages-members-info/fa.json';
import enBrokMembersInfo from '@/i18n/brokerages/brokerages-members-info/en.json';
import faBrokFinancialInfo from '@/i18n/brokerages/brokerages-financial-info/fa.json';
import enBrokFinancialInfo from '@/i18n/brokerages/brokerages-financial-info/en.json';
import faBrokApprovals from '@/i18n/brokerages/brokerages-approvals/fa.json';
import enBrokApprovals from '@/i18n/brokerages/brokerages-approvals/en.json';
import faBrokLicenses from '@/i18n/brokerages/brokerages-licenses/fa.json';
import enBrokLicenses from '@/i18n/brokerages/brokerages-licenses/en.json';
import faBrokLegalCases from '@/i18n/brokerages/brokerages-legal-cases/fa.json';
import enBrokLegalCases from '@/i18n/brokerages/brokerages-legal-cases/en.json';
import faBrokBoardCommittees from '@/i18n/brokerages/brokerages-board-committees/fa.json';
import enBrokBoardCommittees from '@/i18n/brokerages/brokerages-board-committees/en.json';
import faBrokTradingOffices from '@/i18n/brokerages/brokerages-trading-offices/fa.json';
import enBrokTradingOffices from '@/i18n/brokerages/brokerages-trading-offices/en.json';
import faBrokTradingStations from '@/i18n/brokerages/brokerages-trading-stations/fa.json';
import enBrokTradingStations from '@/i18n/brokerages/brokerages-trading-stations/en.json';
import faBrokCompanySoftware from '@/i18n/brokerages/brokerages-company-software/fa.json';
import enBrokCompanySoftware from '@/i18n/brokerages/brokerages-company-software/en.json';
import faBrokAssociation from '@/i18n/brokerages/brokerages-association/fa.json';
import enBrokAssociation from '@/i18n/brokerages/brokerages-association/en.json';
import faBrokGeneralInfoGuide from '@/i18n/brokerages/brokerages-general-info-guide/fa.json';
import enBrokGeneralInfoGuide from '@/i18n/brokerages/brokerages-general-info-guide/en.json';
import faBrokFinancialInfoGuide from '@/i18n/brokerages/brokerages-financial-info-guide/fa.json';
import enBrokFinancialInfoGuide from '@/i18n/brokerages/brokerages-financial-info-guide/en.json';
import faBrokTradingOfficesGuide from '@/i18n/brokerages/brokerages-trading-offices-guide/fa.json';
import enBrokTradingOfficesGuide from '@/i18n/brokerages/brokerages-trading-offices-guide/en.json';
import faBrokTradingStationsGuide from '@/i18n/brokerages/brokerages-trading-stations-guide/fa.json';
import enBrokTradingStationsGuide from '@/i18n/brokerages/brokerages-trading-stations-guide/en.json';


// Account
import faaccountActivity from '@/i18n/account/account-activity/fa.json';
import enaccountActivity from '@/i18n/account/account-activity/en.json';
import faaccountApiKeys from '@/i18n/account/account-api-keys/fa.json';
import enaccountApiKeys from '@/i18n/account/account-api-keys/en.json';
import faaccountAppearance from '@/i18n/account/account-appearance/fa.json';
import enaccountAppearance from '@/i18n/account/account-appearance/en.json';
import faaccountBilling from '@/i18n/account/account-billing/fa.json';
import enaccountBilling from '@/i18n/account/account-billing/en.json';
import faaccountHome from '@/i18n/account/account-home/fa.json';
import enaccountHome from '@/i18n/account/account-home/en.json';
import faaccountIntegrations from '@/i18n/account/account-integrations/fa.json';
import enaccountIntegrations from '@/i18n/account/account-integrations/en.json';
import faaccountInviteAFriend from '@/i18n/account/account-invite-a-friend/fa.json';
import enaccountInviteAFriend from '@/i18n/account/account-invite-a-friend/en.json';
import faaccountMembers from '@/i18n/account/account-members/fa.json';
import enaccountMembers from '@/i18n/account/account-members/en.json';
import faaccountNotifications from '@/i18n/account/account-notifications/fa.json';
import enaccountNotifications from '@/i18n/account/account-notifications/en.json';
import faaccountSecurity from '@/i18n/account/account-security/fa.json';
import enaccountSecurity from '@/i18n/account/account-security/en.json';


// Credit Rating
import faMembersReports from '@/i18n/members-reports/fa.json';
import enMembersReports from '@/i18n/members-reports/en.json';

// Market

// Dashboard, UserManagement, InvestmentFunds, Members
import faDashboard from '@/i18n/dashboard/fa.json';
import enDashboard from '@/i18n/dashboard/en.json';
import faUserManagement from '@/i18n/user-management/fa.json';
import enUserManagement from '@/i18n/user-management/en.json';
import faInvestmentFunds from '@/i18n/investment-funds/fa.json';
import enInvestmentFunds from '@/i18n/investment-funds/en.json';
// SPM (Sepinud Portfolio Management) back-office console
// Initialize i18n synchronously so translations are available during SSR/first render
if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: {
        fa: {
          translation: faTranslations,
          common: faCommon,
          'api-errors': faApiErrors,
          'auth': faAuth,
          'brokerages-common': faBrokCommon,
          'brokerages-general-info': faBrokGeneralInfo,
          'brokerages-members-info': faBrokMembersInfo,
          'brokerages-financial-info': faBrokFinancialInfo,
          'brokerages-approvals': faBrokApprovals,
          'brokerages-licenses': faBrokLicenses,
          'brokerages-legal-cases': faBrokLegalCases,
          'brokerages-board-committees': faBrokBoardCommittees,
          'brokerages-trading-offices': faBrokTradingOffices,
          'brokerages-trading-stations': faBrokTradingStations,
          'brokerages-company-software': faBrokCompanySoftware,
          'brokerages-association': faBrokAssociation,
          'brokerages-general-info-guide': faBrokGeneralInfoGuide,
          'brokerages-financial-info-guide': faBrokFinancialInfoGuide,
          'brokerages-trading-offices-guide': faBrokTradingOfficesGuide,
          'brokerages-trading-stations-guide': faBrokTradingStationsGuide,
          'members-reports': faMembersReports,
          'investment-funds': faInvestmentFunds,
          'dashboard': faDashboard,
        },
        en: {
          translation: enTranslations,
          common: enCommon,
          'api-errors': enApiErrors,
          'auth': enAuth,
          'brokerages-common': enBrokCommon,
          'brokerages-general-info': enBrokGeneralInfo,
          'brokerages-members-info': enBrokMembersInfo,
          'brokerages-financial-info': enBrokFinancialInfo,
          'brokerages-approvals': enBrokApprovals,
          'brokerages-licenses': enBrokLicenses,
          'brokerages-legal-cases': enBrokLegalCases,
          'brokerages-board-committees': enBrokBoardCommittees,
          'brokerages-trading-offices': enBrokTradingOffices,
          'brokerages-trading-stations': enBrokTradingStations,
          'brokerages-company-software': enBrokCompanySoftware,
          'brokerages-association': enBrokAssociation,
          'brokerages-general-info-guide': enBrokGeneralInfoGuide,
          'brokerages-financial-info-guide': enBrokFinancialInfoGuide,
          'brokerages-trading-offices-guide': enBrokTradingOfficesGuide,
          'brokerages-trading-stations-guide': enBrokTradingStationsGuide,
          'members-reports': enMembersReports,
          'investment-funds': enInvestmentFunds,
          'dashboard': enDashboard,
        },
      },
      defaultNS: 'translation',
      fallbackNS: ['common', 'dashboard', 'translation'],
      lng: 'fa',
      fallbackLng: 'fa',
      debug: process.env.NODE_ENV === 'development',

      interpolation: {
        escapeValue: false,
      },

      detection: {
        order: ['localStorage', 'navigator', 'htmlTag'],
        caches: ['localStorage'],
        lookupLocalStorage: 'language',
      },

      react: {
        useSuspense: false,
      },

      initImmediate: false,
    });
}

interface I18nProviderProps {
  children: ReactNode;
}

function I18nProvider({ children }: I18nProviderProps) {
  useEffect(() => {
    // Update document direction when language changes
    const handleLanguageChange = (lng: string) => {
      const language = I18N_LANGUAGES.find((lang) => lang.code === lng);
      if (language?.direction) {
        document.documentElement.setAttribute('dir', language.direction);
      }
    };

    // Set initial direction
    if (i18n.language) {
      handleLanguageChange(i18n.language);
    }

    // Listen for language changes
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  // Get current language for direction
  const currentLanguage = I18N_LANGUAGES.find((lang) => lang.code === (i18n.language || 'fa')) || I18N_LANGUAGES[0];

  return (
    <I18nextProvider i18n={i18n}>
      <RadixDirectionProvider dir={currentLanguage.direction}>
        {children}
      </RadixDirectionProvider>
    </I18nextProvider>
  );
}

const useLanguage = () => {
  const currentLanguage = I18N_LANGUAGES.find((lang) => lang.code === i18n.language) || I18N_LANGUAGES[0];

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  return {
    languageCode: i18n.language,
    language: currentLanguage,
    changeLanguage,
  };
};

export { I18nProvider, useLanguage };
