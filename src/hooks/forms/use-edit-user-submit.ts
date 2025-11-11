import { useCallback } from 'react';
import type { UserWithStatus } from '@/types/types';

interface UseEditUserSubmitProps {
  user: UserWithStatus;
  updateUser: (userId: number, updates: Partial<UserWithStatus>) => void;
  setShowSuccess: (show: boolean) => void;
  startTimer: () => void;
}

export function useEditUserSubmit({
  user,
  updateUser,
  setShowSuccess,
  startTimer,
}: UseEditUserSubmitProps) {
  return useCallback(
    async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      updateUser(user.id, {
        name: data.name,
        username: data.username,
        email: data.email,
        phone: data.phone,
        address: { ...user.address, city: data.city },
        company: { ...user.company, name: data.companyName },
      });

      setShowSuccess(true);
      startTimer();
    },
    [updateUser, user, setShowSuccess, startTimer],
  );
}
