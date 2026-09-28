'use client';

import { SquarePen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { useTranslation } from '@/hooks/useTranslation';

const Work = () => {
  const { t } = useTranslation('account-home');
  
  return (
    <Card className="min-w-full">
      <CardHeader>
        <CardTitle>{t('accountUserProfile.work.title')}</CardTitle>
        <div className="flex items-center gap-2">
          <Label htmlFor="auto-update" className="text-sm">
            {t('accountUserProfile.work.availableNow')}
          </Label>
          <Switch defaultChecked size="sm" />
        </div>
      </CardHeader>
      <CardContent className="kt-scrollable-x-auto pb-3 p-0">
        <Table className="align-middle text-sm text-muted-foreground">
          <TableBody>
            <TableRow>
              <TableCell className="py-2 min-w-36text-secondary-foreground font-normal">
                {t('accountUserProfile.work.language')}
              </TableCell>
              <TableCell className="py-2 min-w-72 w-full text-foreground font-normal">
                English{' '}
                <span className="text-secondary-foreground font-normal">
                  -{t('accountUserProfile.work.fluent')}
                </span>
              </TableCell>
              <TableCell className="py-2 text-end min-w-24">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 text-secondary-foreground font-normal">
                {t('accountUserProfile.work.hourlyRate')}
              </TableCell>
              <TableCell className="py-2 text-foreground font-normal">
                $28 / hour
              </TableCell>
              <TableCell className="py-2 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2text-secondary-foreground font-normal">
                {t('accountUserProfile.work.availability')}
              </TableCell>
              <TableCell className="py-2 text-foreground font-normal">
                {t('accountUserProfile.work.hoursPerWeek')}
              </TableCell>
              <TableCell className="py-2 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-3 text-secondary-foreground font-normal">
                {t('accountUserProfile.work.skills')}
              </TableCell>
              <TableCell className="py-3 text-secondary-foreground">
                <div className="flex flex-wrap gap-2.5">
                  <Badge variant="secondary">Web Design</Badge>
                  <Badge variant="secondary">Code Review</Badge>
                  <Badge variant="secondary">noCode</Badge>
                  <Badge variant="secondary">UX</Badge>
                  <Badge variant="secondary">Figma</Badge>
                  <Badge variant="secondary">Webflow</Badge>
                  <Badge variant="secondary">AI</Badge>
                  <Badge variant="secondary">Management</Badge>
                </div>
              </TableCell>
              <TableCell className="py-3 text-end">
                <Button variant="ghost" mode="icon">
                  <SquarePen size={16} className="text-blue-500" />
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-4 text-secondary-foreground font-normal">
                {t('accountUserProfile.work.about')}
              </TableCell>
              <TableCell className="py-4 text-foreground font-normal">
                {t('accountUserProfile.work.aboutDescription')}
              </TableCell>
              <TableCell className="py-4 text-end">
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

export { Work };
