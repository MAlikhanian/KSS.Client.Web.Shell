'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { LoaderCircleIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { UserPermission } from '@/app/models/user';
import {
  PermissionSchema,
  PermissionSchemaType,
} from '../forms/permission-schema';
import { useTranslation } from '@/hooks/useTranslation';

export interface PermissionEditDialogProps {
  open: boolean;
  closeDialog: () => void;
  permission: UserPermission | null;
}

const PermissionEditDialog = ({
  open,
  closeDialog,
  permission,
}: PermissionEditDialogProps) => {
  const { t } = useTranslation('user-management');
  const queryClient = useQueryClient();

  // Form initialization
  const form = useForm<PermissionSchemaType>({
    resolver: zodResolver(PermissionSchema),
    defaultValues: { name: '', slug: '', description: '' },
    mode: 'onSubmit',
  });

  // Reset form values when dialog is opened
  useEffect(() => {
    if (open) {
      form.reset({
        name: permission?.name || '',
        slug: permission?.slug || '',
        description: permission?.description ?? '',
      });
    }
  }, [form, open, permission]);

  // Mutation for creating/updating permission
  const mutation = useMutation({
    mutationFn: async (values: PermissionSchemaType) => {
      const isEdit = !!permission?.id;
      const url = isEdit
        ? `/api/user-management/permissions/${permission.id}`
        : '/api/user-management/permissions';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await apiFetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      const isEdit = !!permission?.id;
      const message = isEdit
        ? t('permissions.dialogs.edit.messages.permissionUpdated')
        : t('permissions.dialogs.edit.messages.permissionAdded');

      toast.custom(
        () => (
          <Alert variant="mono" icon="success">
            <AlertIcon>
              <RiCheckboxCircleFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );

      queryClient.invalidateQueries({ queryKey: ['user-permissions'] });
      closeDialog();
    },
    onError: (error: Error) => {
      const message = error.message;
      toast.custom(
        () => (
          <Alert variant="mono" icon="destructive">
            <AlertIcon>
              <RiErrorWarningFill />
            </AlertIcon>
            <AlertTitle>{message}</AlertTitle>
          </Alert>
        ),
        {
          position: 'top-center',
        },
      );
    },
  });

  // Derive the loading state from the mutation status
  const isLoading = mutation.status === 'pending';

  // Handle form submission
  const handleSubmit = (values: PermissionSchemaType) => {
    mutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {permission
              ? t('permissions.dialogs.edit.title.edit')
              : t('permissions.dialogs.edit.title.add')}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('permissions.dialogs.edit.fields.name')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('permissions.dialogs.edit.fields.namePlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('permissions.dialogs.edit.fields.slug')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('permissions.dialogs.edit.fields.slugPlaceholder')}
                      {...field}
                      disabled={!!permission}
                    />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    {t('permissions.dialogs.edit.fields.slugDescription')}
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('permissions.dialogs.edit.fields.description')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('permissions.dialogs.edit.fields.descriptionPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                {t('common.buttons.cancel')}
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !form.formState.isDirty}
              >
                {isLoading && <LoaderCircleIcon className="animate-spin" />}
                {t('permissions.dialogs.edit.buttons.submit')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionEditDialog;
