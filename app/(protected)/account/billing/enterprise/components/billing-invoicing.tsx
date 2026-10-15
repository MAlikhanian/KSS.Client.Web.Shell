'use client';

import Link from 'next/link';
import { DropdownMenu2 } from '@/partials/dropdown-menu/dropdown-menu-2';
import { Download, EllipsisVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IBillingInvoicingItem {
  number: string;
  date: string;
  ammount: string;
  label: string;
  color: 'warning' | 'success' | 'destructive';
}
type IBillingInvoicingItems = Array<IBillingInvoicingItem>;

const BillingInvoicing = () => {
  const { t } = useTranslation('account-billing');
  
  const tables: IBillingInvoicingItems = [
    {
      number: 'Invoice-2024-xd912c',
      date: '6 Aug, 2024',
      ammount: '24.00',
      label: t('accountBillingEnterprise.billingInvoicing.status.upcoming'),
      color: 'warning',
    },
    {
      number: 'Invoice-2024-rq857m',
      date: '17 Jun, 2024',
      ammount: '29.99',
      label: t('accountBillingEnterprise.billingInvoicing.status.paid'),
      color: 'success',
    },
    {
      number: 'Invoice-2024-hg234x',
      date: '21 Apr, 2024',
      ammount: '6.59',
      label: t('accountBillingEnterprise.billingInvoicing.status.declined'),
      color: 'destructive',
    },
    {
      number: 'Invoice-2024-lp098y',
      date: '14 mar, 2024',
      ammount: '24.00',
      label: t('accountBillingEnterprise.billingInvoicing.status.paid'),
      color: 'success',
    },
  ];

  const renderItem = (table: IBillingInvoicingItem, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell className="text-sm text-foreground">
          {table.number}
        </TableCell>
        <TableCell className="lg:text-end">
          <Badge variant={table.color} appearance="light">
            {table.label}
          </Badge>
        </TableCell>
        <TableCell className="text-sm text-foreground lg:text-end">
          {table.date}
        </TableCell>
        <TableCell className="text-sm text-foreground lg:text-end">
          ${table.ammount}
        </TableCell>
        <TableCell>
          <DropdownMenu2
            trigger={
              <Button variant="ghost" mode="icon">
                <EllipsisVertical />
              </Button>
            }
          />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountBillingEnterprise.billingInvoicing.title')}</CardTitle>
        <Button variant="outline">
          <Download size={20} />
          {t('accountBillingEnterprise.billingInvoicing.downloadAll')}
        </Button>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="min-w-50 h-10">{t('accountBillingEnterprise.billingInvoicing.tableHeaders.invoice')}</TableHead>
              <TableHead className="min-w-16 text-end h-10">{t('accountBillingEnterprise.billingInvoicing.tableHeaders.status')}</TableHead>
              <TableHead className="min-w-30 text-end h-10">{t('accountBillingEnterprise.billingInvoicing.tableHeaders.date')}</TableHead>
              <TableHead className="min-w-16 text-end h-10">{t('accountBillingEnterprise.billingInvoicing.tableHeaders.amount')}</TableHead>
              <TableHead className="w-8 h-10"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tables.map((table, index) => {
              return renderItem(table, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center">
        <Button mode="link" underlined="dashed" asChild>
          <Link href="#">{t('accountBillingEnterprise.billingInvoicing.viewAllPayments')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export {
  BillingInvoicing,
  type IBillingInvoicingItem,
  type IBillingInvoicingItems,
};
