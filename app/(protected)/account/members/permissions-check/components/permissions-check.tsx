'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

interface IPermissionsCheckItem {
  module: string;
  view: boolean;
  modify: boolean;
  publish: boolean;
  configure: boolean;
}
type IPermissionsCheckItems = Array<IPermissionsCheckItem>;

const PermissionsCheck = () => {
  const { t } = useTranslation('account-members');
  const data: IPermissionsCheckItems = [
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.workspaceSettings'),
      view: true,
      modify: true,
      publish: true,
      configure: true,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.billingManagement'),
      view: true,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.integrationSetup'),
      view: true,
      modify: true,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.mapCreation'),
      view: true,
      modify: true,
      publish: true,
      configure: true,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.dataExport'),
      view: true,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.userRoles'),
      view: true,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.securitySettings'),
      view: true,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.insightsAccess'),
      view: false,
      modify: false,
      publish: false,
      configure: false,
    },
    {
      module: t('accountMembersPermissionsCheck.permissionsCheck.modules.merchantList'),
      view: true,
      modify: true,
      publish: false,
      configure: false,
    },
  ];

  const renderItem = (each: IPermissionsCheckItem, index: number) => {
    return (
      <TableRow key={index}>
        <TableCell className="py-5.5!">{each.module}</TableCell>
        <TableCell className="py-5.5! text-center">
          <Checkbox defaultChecked={each.view} />
        </TableCell>
        <TableCell className="py-5.5! text-center">
          <Checkbox defaultChecked={each.modify} />
        </TableCell>
        <TableCell className="py-5.5! text-center">
          <Checkbox defaultChecked={each.publish} />
        </TableCell>
        <TableCell className="py-5.5! text-center">
          <Checkbox defaultChecked={each.configure} />
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card>
      <CardHeader className="gap-2">
        <CardTitle>
          <Button mode="link" asChild className="text-xl">
            <Link href="#">{t('accountMembersPermissionsCheck.permissionsCheck.projectManager')}</Link>
          </Button>{' '}
          {t('accountMembersPermissionsCheck.permissionsCheck.rolePermissions')}
        </CardTitle>
        <div className="flex gap-5">
          <Button variant="outline">
            <Link href="#">{t('accountMembersPermissionsCheck.permissionsCheck.newPermission')}</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-accent/60">
              <TableHead className="text-start text-secondary-foreground font-normal min-w-[300px] h-10">
                {t('accountMembersPermissionsCheck.permissionsCheck.tableHeaders.module')}
              </TableHead>
              <TableHead className="min-w-24 text-secondary-foreground font-normal text-center h-10">
                {t('accountMembersPermissionsCheck.permissionsCheck.tableHeaders.view')}
              </TableHead>
              <TableHead className="min-w-24 text-secondary-foreground font-normal text-center h-10">
                {t('accountMembersPermissionsCheck.permissionsCheck.tableHeaders.modify')}
              </TableHead>
              <TableHead className="min-w-24 text-secondary-foreground font-normal text-center h-10">
                {t('accountMembersPermissionsCheck.permissionsCheck.tableHeaders.publish')}
              </TableHead>
              <TableHead className="min-w-24 text-secondary-foreground font-normal text-center h-10">
                {t('accountMembersPermissionsCheck.permissionsCheck.tableHeaders.configure')}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-mono font-medium">
            {data.map((each, index) => {
              return renderItem(each, index);
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end py-7.5 gap-2.5">
        <Button variant="outline">
          <Link href="#">{t('accountMembersPermissionsCheck.permissionsCheck.restoreDefaults')}</Link>
        </Button>
        <Button>
          <Link href="#">{t('accountMembersPermissionsCheck.permissionsCheck.saveChanges')}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export {
  PermissionsCheck,
  type IPermissionsCheckItem,
  type IPermissionsCheckItems,
};
