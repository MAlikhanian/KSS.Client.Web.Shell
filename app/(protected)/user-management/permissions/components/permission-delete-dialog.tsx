'use client';

import { RiCheckboxCircleFill, RiErrorWarningFill } from '@remixicon/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoaderCircleIcon } from 'lucide-react';
import { UserPermission } from '@/app/models/user';
import { useTranslation } from '@/hooks/useTranslation';

export interface PermissionDeleteDialogProps {
  open: boolean;
  closeDialog: () => void;
  permission: UserPermission;
}

const PermissionDeleteDialog = ({
  open,
  closeDialog,
  permission,
}: PermissionDeleteDialogProps) => {
  const { t } = useTranslation('user-management');
  const queryClient = useQueryClient();

  // Define the mutation for deleting the permission
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await apiFetch(
        `/api/user-management/permissions/${permission.id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      const message = t('permissions.dialogs.delete.messages.permissionDeleted');

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

      queryClient.invalidateQueries({ queryKey: ['user-permissions'] }); // Refetch permissions list
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

  return (
    <Dialog open={open} onOpenChange={closeDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t('permissions.dialogs.delete.title')}</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t('permissions.dialogs.delete.description')}
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            {t('common.buttons.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate()}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <LoaderCircleIcon className="animate-spin" />
            )}
            {t('permissions.dialogs.delete.buttons.delete')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionDeleteDialog;
