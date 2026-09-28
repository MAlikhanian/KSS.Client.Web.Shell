'use client';

import Link from 'next/link';
import { Copy, SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

const GeneralInfo = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{t('accountCompanyProfile.generalInfo.title')}</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="auto-update" className="text-sm">
            {t('accountCompanyProfile.generalInfo.publicProfile')}
          </Label>
          <Switch defaultChecked size="sm" />
        </div>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table
          className="align-middle text-sm text-muted-foreground"
          id="general_info_table"
        >
          <TableBody>
            <TableRow>
              <TableCell className="min-w-56 text-secondary-foreground font-normal">
                {t('accountCompanyProfile.generalInfo.companyName')}
              </TableCell>
              <TableCell className="min-w-48 w-full text-foreground font-normal">
                Hexlab
              </TableCell>
              <TableCell className="min-w-16 text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.generalInfo.phoneNumber')}
              </TableCell>
              <TableCell className="text-foreground font-normal">
                +1 555-1234
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.generalInfo.vatNumber')}
              </TableCell>
              <TableCell className="text-foreground font-normal">
                <Badge size="md" variant="destructive" appearance="light">
                  {t('accountCompanyProfile.generalInfo.missingDetails')}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <Button mode="link" underlined="dashed" asChild>
                  <Link href="#">{t('accountCompanyProfile.generalInfo.add')}</Link>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.generalInfo.registrationNumber')}
              </TableCell>
              <TableCell className="text-foreground font-normal">
                IYS2023A56789
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-secondary-foreground font-normal">
                {t('accountCompanyProfile.generalInfo.remoteCompanyId')}
              </TableCell>
              <TableCell className="text-foreground text-sm font-normal">
                <div className="flex items-center gap-0.5">
                  CID78901BXT2023
                  <Button variant="ghost" mode="icon">
                    <Copy size={16} />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { GeneralInfo };
