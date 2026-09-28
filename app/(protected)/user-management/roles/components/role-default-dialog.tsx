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
import { UserRole } from '@/app/models/user';
import { useTranslation } from '@/hooks/useTranslation';

const RoleDefaultDialog = ({
  open,
  closeDialog,
  role,
}: {
  open: boolean;
  closeDialog: () => void;
  role: UserRole;
}) => {
  const { t } = useTranslation('user-management');
  const queryClient = useQueryClient();

  // Define the mutation for deleting the role
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await apiFetch(
        `/api/user-management/roles/${id}/default`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      return response.json();
    },
    onSuccess: () => {
      const message = t('roles.dialogs.default.messages.defaultRoleSet');
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

      queryClient.invalidateQueries({ queryKey: ['user-roles'] }); // Refetch roles list
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t('roles.dialogs.default.title', { name: role.name })}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {t('roles.dialogs.default.description', { name: role.name })}
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={closeDialog}>
            {t('common.buttons.cancel')}
          </Button>
          <Button
            variant="destructive"
            onClick={() => mutation.mutate(role.id)}
            disabled={mutation.status === 'pending'}
          >
            {mutation.status === 'pending' && (
              <LoaderCircleIcon className="animate-spin" />
            )}
            {t('roles.dialogs.default.buttons.updateDefaultRole')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RoleDefaultDialog;
