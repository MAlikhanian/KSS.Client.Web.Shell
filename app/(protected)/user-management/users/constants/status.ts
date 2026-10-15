import { UserStatus } from '@/app/models/user';

// Default status mapping (for backward compatibility)
export const UserStatusProps = {
  [UserStatus.ACTIVE]: {
    label: 'Active',
    variant: 'success',
  },
  [UserStatus.INACTIVE]: {
    label: 'Inactive',
    variant: 'warning',
  },
  [UserStatus.BLOCKED]: {
    label: 'Blocked',
    variant: 'destructive',
  },
};

// Function to get status properties with translation support
export const getUserStatusProps = (status: UserStatus, t?: (key: string) => string) => {
  const baseProps = UserStatusProps[status] || { label: 'Unknown', variant: 'success' };
  
  if (t) {
    const statusKey = status.toLowerCase();
    const translationKey = `userManagement.users.table.status.${statusKey}`;
    return {
      ...baseProps,
      label: t(translationKey) || baseProps.label,
    };
  }
  
  return baseProps;
};
