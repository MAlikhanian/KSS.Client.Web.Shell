'use client';

import { SquarePen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IDetailsItem {
  status: string;
  info: string;
}
type IDetailsItems = Array<IDetailsItem>;

const Details = () => {
  const { t } = useTranslation('account-billing');
  
  const tables: IDetailsItems = [
    { status: t('accountBillingBasic.details.companyName'), info: 'KeenThemes' },
    {
      status: t('accountBillingBasic.details.address'),
      info: 'Keizersgracht 136, 1015 CW Amsterdam, Netherlands',
    },
    { status: t('accountBillingBasic.details.contact'), info: 'Jason Tatum' },
    { status: t('accountBillingBasic.details.vatId'), info: 'NL123456789B01' },
  ];

  const renderItem = (table: IDetailsItem, index: number) => {
    return (
      <TableRow key={index} className="border-0">
        <TableCell className="text-sm text-secondary-foreground min-w-36 pb-5 pe-6 py-2">
          {table.status}
        </TableCell>
        <TableCell className="text-sm text-foreground pb-5 py-2">
          {table.info}
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountBillingBasic.details.title')}</CardTitle>
        <Button variant="outline">
          <SquarePen size={16} />
          {t('accountBillingBasic.details.editBilling')}
        </Button>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        <Table>
          <TableBody>
            {tables.map((table, index) => {
              return renderItem(table, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export { Details, type IDetailsItem, type IDetailsItems };
