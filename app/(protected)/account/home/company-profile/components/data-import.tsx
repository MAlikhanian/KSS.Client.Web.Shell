'use client';

import { Info } from 'lucide-react';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';

const DataImport = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card>
      <CardHeader className="gap-2" id="auth_social_sign_in">
        <CardTitle>{t('accountCompanyProfile.dataImport.title')}</CardTitle>
        <Button variant="dim" mode="icon">
          <Info size={16} />
        </Button>
      </CardHeader>
      <CardContent className="lg:py-7.5 py-5">
        <div className="text-sm text-foreground mb-4">
          {t('accountCompanyProfile.dataImport.description')}
        </div>
        <Button variant="outline">
          <img
            src={toAbsoluteUrl('/media/brand-logos/google.svg')}
            className="size-4 shrink-0"
            alt="image"
          />
          {t('accountCompanyProfile.dataImport.continueWithGoogle')}
        </Button>
      </CardContent>
    </Card>
  );
};

export { DataImport };
